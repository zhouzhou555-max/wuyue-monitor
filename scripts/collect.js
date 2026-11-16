#!/usr/bin/env node
/* ============================================================
   闽浙吾悦商圈监控 · 每日采集脚本（GitHub Actions 定时运行）
   流程：读 config.js + data.js → Bing 新闻搜索 → LLM 提炼 → 写回 data.js
   环境变量（在 GitHub Secrets 配置）：
     LLM_API_KEY   必填，OpenAI 兼容的 LLM key（如 DeepSeek）
     LLM_BASE_URL  选填，默认 https://api.deepseek.com
     LLM_MODEL     选填，默认 deepseek-chat
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(REPO, 'config.js');
const DATA_PATH = path.join(REPO, 'data.js');

const LLM_BASE_URL = (process.env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
const LLM_MODEL = process.env.LLM_MODEL || 'deepseek-chat';
const LLM_API_KEY = process.env.LLM_API_KEY || '';

const DAYS_KEEP = 7; // data.js 保留最近 7 天

/* ---------- 工具 ---------- */
function loadWindow(file) {
  const code = fs.readFileSync(file, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: path.basename(file) });
  return ctx.window;
}

function beijingDate(offsetDays = 0) {
  const now = new Date(Date.now() + (offsetDays) * 86400000);
  const bj = new Date(now.getTime() + 8 * 3600 * 1000); // UTC+8
  return bj.toISOString().slice(0, 10);
}
function beijingStamp() {
  const now = new Date(Date.now() + 8 * 3600 * 1000);
  return now.toISOString().slice(0, 10) + ' ' + now.toISOString().slice(11, 16);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- 1. 读取配置 ---------- */
const config = loadWindow(CONFIG_PATH);
const oldData = loadWindow(DATA_PATH);
const MALLS = config.MALLS || [];
const COMPETITORS = config.COMPETITORS || {};
const OLD_DATA = oldData.DATA || {};

/* ---------- 2. 构造搜索关键词 ---------- */
function buildQueries() {
  const qs = [];
  for (const m of MALLS) {
    qs.push({ mall: m.id, q: `${m.name} 开业` });
    qs.push({ mall: m.id, q: `${m.name} 首店 OR 新店 OR 招聘` });
    qs.push({ mall: m.id, q: `${m.name} 闭店 OR 活动` });
  }
  const seen = new Set();
  for (const m of MALLS) {
    for (const c of COMPETITORS[m.id] || []) {
      if (seen.has(c.name)) continue;
      seen.add(c.name);
      qs.push({ mall: m.id, q: `${c.name} 开业 OR 首店` });
    }
  }
  return qs;
}

/* ---------- 3. 多源新闻搜索（Google News RSS 优先，Bing 降级） ---------- */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

async function fetchText(url, timeoutMs = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'zh-CN,zh;q=0.9' }, signal: ctrl.signal });
    if (!r.ok) return '';
    return await r.text();
  } finally {
    clearTimeout(t);
  }
}

function stripTags(s) { return String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '');
}

// Google News RSS（Actions 海外节点稳定，新闻召回精准）
async function googleNews(query) {
  const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=zh-CN&gl=CN&ceid=CN:zh-Hans';
  const xml = await fetchText(url);
  if (!xml) return [];
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const b = m[1];
    const g = (tag) => { const mm = b.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`)); return mm ? decodeEntities(stripTags(mm[1])) : ''; };
    let title = g('title');
    title = title.replace(/\s*-\s*[^-]+$/, '').trim(); // 去掉尾部 "- 来源"
    const link = g('link');
    const desc = g('description');
    const pub = g('pubDate');
    if (title && link) items.push({ title, link, desc, pub });
  }
  return items.slice(0, 5);
}

// Bing Web 搜索（HTML 解析，兜底）
async function bingWeb(query) {
  const url = 'https://www.bing.com/search?q=' + encodeURIComponent(query) + '&setlang=zh-CN&count=10';
  const html = await fetchText(url);
  if (!html) return [];
  const items = [];
  const re = /<li class="b_algo"[\s\S]*?<h2[^>]*><a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const link = decodeEntities(m[1]);
    const title = decodeEntities(stripTags(m[2]));
    const desc = decodeEntities(stripTags(m[3]));
    if (title && link) items.push({ title, link, desc, pub: '' });
  }
  return items.slice(0, 5);
}

// 聚合降级
async function searchWeb(query) {
  const srcs = [['google', googleNews], ['bing', bingWeb]];
  for (const [name, fn] of srcs) {
    try {
      const items = await fn(query);
      if (items.length) { console.log(`  [${name}] ${query} -> ${items.length} 条`); return items; }
    } catch (e) { console.log(`  [${name}] 失败 ${query}: ${e.message}`); }
  }
  return [];
}

/* ---------- 4. LLM 提炼 ---------- */
async function callLLM(prompt) {
  const r = await fetch(`${LLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${LLM_API_KEY}` },
    body: JSON.stringify({
      model: LLM_MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: '你是严谨的商业地产招商调研助手，只根据给定材料输出，绝不编造。' },
        { role: 'user', content: prompt }
      ]
    })
  });
  if (!r.ok) {
    const body = await r.text();
    throw new Error(`LLM HTTP ${r.status}: ${body.slice(0, 300)}`);
  }
  const j = await r.json();
  return j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : '';
}
function extractJson(text) {
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) text = m[1];
  const s = text.indexOf('{');
  const e = text.lastIndexOf('}');
  if (s >= 0 && e > s) text = text.slice(s, e + 1);
  return JSON.parse(text);
}

/* ---------- 5. 校验/合并/写回 ---------- */
const ALLOW_TYPE = ['open', 'close', 'change', 'activity', 'comp'];
const ALLOW_SUBTYPE = ['open', 'close', 'change', 'event', 'risk', 'promo', 'sport', ''];

function normalize(ev, mallIds, today) {
  const mall = String(ev.mall || '');
  if (!mallIds.includes(mall)) return null;
  let type = String(ev.type || '');
  if (!ALLOW_TYPE.includes(type)) type = 'comp';
  const brand = String(ev.brand || '').trim();
  const title = String(ev.title || '').trim();
  const source = String(ev.source || '').trim();
  if (!title || !source) return null; // 无标题或无来源，丢弃（反幻觉）
  return {
    type,
    subtype: ALLOW_SUBTYPE.includes(ev.subtype) ? ev.subtype : (type === 'comp' ? 'open' : ''),
    brand,
    title,
    mall,
    floor: String(ev.floor || '—'),
    category: String(ev.category || ''),
    when: /^\d{4}-\d{2}-\d{2}$/.test(ev.when || '') ? ev.when : '',
    source,
    sourceUrl: String(ev.sourceUrl || ''),
    confidence: ev.confidence === 'ok' ? 'ok' : 'pending',
    note: String(ev.note || '')
  };
}

function writeData(data, stamp) {
  const header = `/* ============================================================
   闽浙吾悦商圈监控平台 · 每日数据（由 GitHub Actions 每日定时任务自动写入）
   window.DATA 以日期(YYYY-MM-DD)为键，每天为事件数组，保留最近${DAYS_KEEP}天。
   字段：id / type / subtype / brand / title / mall(吾悦广场id) / floor / category
         when(事件日期 YYYY-MM-DD，留空=进行中/近期) / source / sourceUrl / confidence / note
   type：open开店 / close闭店 / change调整 / activity活动 / comp竞品商场动态
   ============================================================ */
`;
  const body = `window.UPDATED_AT = ${JSON.stringify(stamp)};\n\nwindow.DATA = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(DATA_PATH, header + body, 'utf8');
}

function pruneByDays(data) {
  const out = {};
  const dates = Object.keys(data).sort();
  const keepFrom = beijingDate(-(DAYS_KEEP - 1));
  for (const d of dates) {
    if (d >= keepFrom) out[d] = data[d];
  }
  return out;
}

/* ---------- 主流程 ---------- */
async function main() {
  const today = beijingDate();
  console.log(`[collect] 开始，今天=${today}，LLM=${LLM_MODEL}`);

  if (!LLM_API_KEY) {
    console.log('[collect] 未配置 LLM_API_KEY，跳过采集（不修改 data.js）');
    return;
  }

  const queries = buildQueries();
  console.log(`[collect] 共 ${queries.length} 个搜索词`);

  // 搜索（每批 5 个并发）
  const searchResults = [];
  for (let i = 0; i < queries.length; i += 5) {
    const batch = queries.slice(i, i + 5);
    const res = await Promise.all(batch.map(async (q) => {
      const items = await searchWeb(q.q);
      return { query: q.q, mall: q.mall, items };
    }));
    searchResults.push(...res);
    await sleep(300);
  }
  const totalHits = searchResults.reduce((a, r) => a + r.items.length, 0);
  console.log(`[collect] 搜索命中 ${totalHits} 条`);
  const sample = searchResults.flatMap((r) => r.items).slice(0, 6);
  sample.forEach((s) => console.log('  样本:', s.pub, '|', s.title.slice(0, 50), '|', s.link.slice(0, 60)));

  // 已有事件标题（去重）
  const seenTitles = new Set();
  for (const d of Object.keys(OLD_DATA)) {
    for (const e of OLD_DATA[d] || []) if (e.title) seenTitles.add(e.title);
  }

  // 构造 prompt
  const mallList = MALLS.map((m) => `${m.id}(${m.name})`).join('、');
  const hitsText = searchResults
    .filter((r) => r.items.length)
    .map((r) => r.items.map((it) => `[查询:${r.query}] ${it.title} | ${it.desc.slice(0, 120)} | ${it.link} | ${it.pub}`).join('\n'))
    .join('\n') || '（本次无搜索结果）';

  const prompt = `今天是 ${today}。请从下面的搜索结果中，找出「闽浙 12 家吾悦广场及其竞品商场」最近 7 天内发生的招商/运营动态（含已开业、即将开业、围挡筹备、招聘信号、闭店撤场、调改、大型活动）。
吾悦广场名单（mall 字段取值）：${mallList}

【提取规则】
1. 提取所有搜索结果里真实出现的动态：新店开业(open)、闭店撤场(close)、品牌调整/升级(change)、大型活动(activity)、竞品商场动态(comp，subtype=open/close/change/event/risk)。
2. 每条必须来自搜索结果、给出真实 source（媒体名）和 sourceUrl（结果里的真实链接）。严禁编造不存在的品牌或事件。
3. 日期不明确、或只是"筹备/招聘/围挡"未正式开业的，when 留空、confidence 用 pending——这类线索也要输出，不要因日期不确定就丢弃。
4. 与下面「已有事件」标题完全相同或明显同一件事的，不要重复输出。
5. confidence：来源权威且日期明确=ok，其余=pending。
6. 只输出 JSON：{"events":[{...}]}，事件字段：type,subtype,brand,title,mall,floor,category,when(YYYY-MM-DD 或空),source,sourceUrl,confidence,note。events 可为空数组（确实没有才空）。

【已有事件标题】
${[...seenTitles].slice(0, 300).join('\n') || '（无）'}

【搜索结果】
${hitsText}`;

  console.log('[collect] 调用 LLM ...');
  let events;
  try {
    const content = await callLLM(prompt);
    console.log('[collect] LLM 返回长度:', content.length, '| 前800字:', content.slice(0, 800));
    events = extractJson(content).events || [];
  } catch (e) {
    console.log(`[collect] LLM 失败，跳过本次：${e.message}`);
    return;
  }

  const mallIds = MALLS.map((m) => m.id);
  const fresh = [];
  let nextId = 1000;
  for (const e of events) {
    const n = normalize(e, mallIds, today);
    if (!n) continue;
    if (seenTitles.has(n.title)) continue;
    n.id = nextId++;
    fresh.push(n);
  }
  console.log(`[collect] LLM 返回 ${events.length} 条，有效 ${fresh.length} 条`);

  if (!fresh.length) {
    console.log('[collect] 无新增事件，不修改 data.js');
    return;
  }

  // 合并
  const merged = JSON.parse(JSON.stringify(OLD_DATA));
  if (!merged[today]) merged[today] = [];
  merged[today] = merged[today].concat(fresh);
  const pruned = pruneByDays(merged);
  writeData(pruned, beijingStamp());
  console.log(`[collect] 完成，写入 ${fresh.length} 条，data.js 现保留 ${Object.keys(pruned).length} 天`);
}

main().catch((e) => {
  console.error('[collect] 异常：', e);
  process.exit(0); // 不让 workflow 因网络抖动而红灯
});
