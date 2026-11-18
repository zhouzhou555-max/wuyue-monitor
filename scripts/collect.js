#!/usr/bin/env node
/* ============================================================
   闽浙吾悦商圈监控 · 每日采集脚本（GitHub Actions 定时运行）
   搜索：DeepSeek Search API（POST /v1/tools/search，自研搜索引擎）
   提炼：DeepSeek Chat API（deepseek-chat）
   环境变量（GitHub Secrets）：
     LLM_API_KEY   必填，DeepSeek key（搜索 + 提炼共用同一个 key）
     LLM_BASE_URL  选填，默认 https://api.deepseek.com
     LLM_MODEL     选填，默认 deepseek-chat
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(REPO, 'config.js');
const DATA_PATH = path.join(REPO, 'data.js');

const LLM_API_KEY = process.env.LLM_API_KEY || '';
const LLM_BASE_URL = (process.env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
const LLM_MODEL = process.env.LLM_MODEL || 'deepseek-chat';

const DAYS_KEEP = 7;

/* ---------- 工具 ---------- */
function loadWindow(file) {
  const code = fs.readFileSync(file, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: path.basename(file) });
  return ctx.window;
}

function beijingDate(offsetDays = 0) {
  const now = new Date(Date.now() + offsetDays * 86400000);
  const bj = new Date(now.getTime() + 8 * 3600 * 1000); // UTC+8
  return bj.toISOString().slice(0, 10);
}
function beijingStamp() {
  const now = new Date(Date.now() + 8 * 3600 * 1000);
  return now.toISOString().slice(0, 10) + ' ' + now.toISOString().slice(11, 16);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- 读取配置 ---------- */
const config = loadWindow(CONFIG_PATH);
const oldData = loadWindow(DATA_PATH);
const MALLS = config.MALLS || [];
const COMPETITORS = config.COMPETITORS || {};
const OLD_DATA = oldData.DATA || {};

/* ---------- 搜索：DeepSeek Search API ---------- */
async function dsSearch(query) {
  const r = await fetch('https://api.deepseek.com/v1/tools/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + LLM_API_KEY },
    body: JSON.stringify({ query, count: 8, need_content: false })
  });
  if (r.status === 429) { await sleep(2000); return dsSearch(query); }
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    console.log(`  搜索失败 [${query.slice(0, 30)}]: HTTP ${r.status} ${t.slice(0, 120)}`);
    return [];
  }
  const j = await r.json().catch(() => ({}));
  return (j.results || []).map((it) => ({
    title: it.title || '',
    link: it.url || '',
    desc: (it.summary || it.snippet || '').slice(0, 160),
    pub: it.date || ''
  }));
}

function buildQueries() {
  const fromDate = beijingDate(-14); // 最近14天
  const tail = ` lang:zh after:${fromDate}`;
  const qs = [];
  for (const m of MALLS) {
    qs.push({ mall: m.id, q: `${m.name} 新店 开业 闭店${tail}` });
    qs.push({ mall: m.id, q: `${m.name} 活动 促销${tail}` });
  }
  const seen = new Set();
  for (const m of MALLS) {
    for (const c of COMPETITORS[m.id] || []) {
      if (seen.has(c.name)) continue;
      seen.add(c.name);
      qs.push({ mall: m.id, q: `${c.name} 开业 新店 闭店${tail}` });
    }
  }
  return qs;
}

/* ---------- LLM 提炼 ---------- */
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

/* ---------- 校验 / 合并 / 写回 ---------- */
const ALLOW_TYPE = ['open', 'close', 'change', 'activity', 'comp'];
const ALLOW_SUBTYPE = ['open', 'close', 'change', 'event', 'risk', 'promo', 'sport', ''];

// 兜底：按竞品名反查所属吾悦广场
function guessMallFromCompetitor(text) {
  for (const [mid, comps] of Object.entries(COMPETITORS)) {
    for (const c of comps) {
      if (text.includes(c.name)) return mid;
    }
  }
  return null;
}

function normalize(ev, mallIds) {
  let mall = String(ev.mall || '').trim();
  if (!mallIds.includes(mall)) {
    const g = guessMallFromCompetitor((ev.brand || '') + ' ' + (ev.title || ''));
    if (!g) return null; // 无法确定归属广场，丢弃
    mall = g;
  }
  let type = String(ev.type || '');
  if (!ALLOW_TYPE.includes(type)) type = 'comp';
  const brand = String(ev.brand || '').trim();
  const title = String(ev.title || '').trim();
  const source = String(ev.source || '').trim();
  if (!title || !source) return null;
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
  const keepFrom = beijingDate(-(DAYS_KEEP - 1));
  for (const d of Object.keys(data).sort()) {
    if (d >= keepFrom) out[d] = data[d];
  }
  return out;
}

/* ---------- 主流程 ---------- */
async function main() {
  const today = beijingDate();
  console.log(`[collect] 开始，今天=${today}，LLM=${LLM_MODEL}`);

  if (!LLM_API_KEY) {
    console.log('[collect] 未配置 LLM_API_KEY，跳过');
    return;
  }

  const queries = buildQueries();
  console.log(`[collect] 共 ${queries.length} 个搜索词`);

  // 搜索（每批 5 个并发）
  const searchResults = [];
  for (let i = 0; i < queries.length; i += 5) {
    const batch = queries.slice(i, i + 5);
    const res = await Promise.all(batch.map(async (q) => ({ query: q.q, mall: q.mall, items: await dsSearch(q.q) })));
    searchResults.push(...res);
    await sleep(200);
  }
  const totalHits = searchResults.reduce((a, r) => a + r.items.length, 0);
  console.log(`[collect] 搜索命中 ${totalHits} 条`);
  const sample = searchResults.flatMap((r) => r.items).slice(0, 6);
  sample.forEach((s) => console.log('  样本:', (s.pub || '').slice(0, 10), '|', s.title.slice(0, 50), '|', s.link.slice(0, 55)));

  // 已有事件标题（去重）
  const seenTitles = new Set();
  for (const d of Object.keys(OLD_DATA)) for (const e of OLD_DATA[d] || []) if (e.title) seenTitles.add(e.title);

  const mallList = MALLS.map((m) => `${m.id}(${m.name})`).join('、');
  const compMap = MALLS.map((m) => {
    const comps = (COMPETITORS[m.id] || []).map((c) => c.name).join('、');
    return `- ${m.id}(${m.name}) 的竞品：${comps}`;
  }).join('\n');

  const hitsText = searchResults
    .filter((r) => r.items.length)
    .map((r) => r.items.map((it) => `[查询:${r.query}] ${it.title} | ${it.desc} | ${it.link} | ${it.pub}`).join('\n'))
    .join('\n') || '（本次无搜索结果）';

  const prompt = `今天是 ${today}。请从下面的搜索结果中，找出「闽浙 12 家吾悦广场及其竞品商场」最近 14 天内发生的招商/运营动态（含已开业、即将开业、围挡筹备、招聘信号、闭店撤场、调改、大型活动）。
吾悦广场名单（mall 字段取值）：${mallList}

【mall 字段填写规则——最重要，绝不能留空】
- 吾悦广场自身的动态：mall 填该吾悦的 id（如温州吾悦的新店 → mall 填 wz）。
- 竞品商场/超市的动态：mall 填该竞品所对应的吾悦 id，按下面的映射表填：
${compMap}
- 示例：温州万象城的新店动态 → mall 填 wz；达美乐在衢州银泰城围挡 → mall 填 qz；山姆台州店开业 → mall 填 tzw。
- mall 留空的事件会被系统直接丢弃，务必每条都填。

【提取规则】
1. 提取所有搜索结果里真实出现的动态：新店开业(open)、闭店撤场(close)、品牌调整/升级(change)、大型活动(activity)、竞品商场动态(comp，subtype=open/close/change/event/risk)。
2. 每条必须来自搜索结果、给出真实 source（媒体名）和 sourceUrl（结果里的真实链接）。严禁编造不存在的品牌或事件。
3. 【准确性红线——招聘/围挡信号判读】
   - 招聘信息 ≠ 新店筹备！开业后的门店也会长期招聘（收银/理货/导购）。只有当招聘信息明确写「筹备/新店/即将开业/围挡装修中」等字样时，才可作为筹备信号，且 title 必须写明「招聘中（非新开业）」，confidence 一律 pending。
   - 判断一家店是「新开业」必须以报道/公告中的开业日期为准；搜索结果只给招聘页时，禁止推断开业时间，更禁止把已营业门店写成筹备中。
   - 大型连锁（盒马、山姆、万达影城等）是否为新店，优先看标题/正文是否含「首店/新店/即将开业/X月X日开业」；若只有招聘页，一律不作为新店事件输出。
4. 日期不明确、或只是"筹备/招聘/围挡"未正式开业的，when 留空、confidence 用 pending——这类线索也要输出，但 title 必须如实写「招聘中/筹备中」，不得写成「开业」。
5. 与下面「已有事件」标题完全相同或明显同一件事的，不要重复输出。
6. confidence：来源权威且日期明确=ok，其余=pending。
7. 只输出 JSON：{"events":[{...}]}，事件字段：type,subtype,brand,title,mall,floor,category,when(YYYY-MM-DD 或空),source,sourceUrl,confidence,note。events 可为空数组（确实没有才空）。

【已有事件标题】
${[...seenTitles].slice(0, 300).join('\n') || '（无）'}

【搜索结果】
${hitsText}`;

  console.log('[collect] 调用 LLM ...');
  let events;
  try {
    const content = await callLLM(prompt);
    console.log('[collect] LLM 返回长度:', content.length, '| 前600字:', content.slice(0, 600));
    events = extractJson(content).events || [];
  } catch (e) {
    console.log(`[collect] LLM 失败，跳过本次：${e.message}`);
    return;
  }

  const mallIds = MALLS.map((m) => m.id);
  const fresh = [];
  let nextId = 1000;
  for (const e of events) {
    const n = normalize(e, mallIds);
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

  const merged = JSON.parse(JSON.stringify(OLD_DATA));
  if (!merged[today]) merged[today] = [];
  merged[today] = merged[today].concat(fresh);
  const pruned = pruneByDays(merged);
  writeData(pruned, beijingStamp());
  console.log(`[collect] 完成，写入 ${fresh.length} 条，data.js 现保留 ${Object.keys(pruned).length} 天`);
}

main().catch((e) => {
  console.error('[collect] 异常：', e);
  process.exit(0);
});
