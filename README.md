# 闽浙吾悦商圈动态监控平台（云端版）

监控闽浙区域 12 家吾悦广场及其竞品商场的开店/闭店/调改/大型活动/竞品动态，**每天早 9 点由 GitHub Actions 自动采集更新**，无需开电脑，手机也能访问。

## 架构

```
GitHub Actions (每天 09:00 UTC+8 定时)
   └─ scripts/collect.js
        1. 读 config.js（12 家吾悦 + 竞品映射）
        2. DeepSeek Search API 搜索各广场最新动态（lang:zh + 近14天过滤）
        3. 调 DeepSeek Chat 提炼为结构化事件
        4. 写回 data.js（保留最近 7 天）
   └─ 自动 commit + push
   └─ GitHub Pages 自动部署 → 在线看板
```

- `index.html` / `config.js` / `data.js` —— 静态看板（与本地版一致）
- `scripts/collect.js` —— 每日采集脚本
- `.github/workflows/daily.yml` —— 定时 + 部署工作流

## 首次部署步骤（约 5 分钟）

### 1. 创建 GitHub 仓库
- 登录 github.com → New repository，仓库名如 `wuyue-monitor`，设为 **Public**（免费账号 Pages 需公开仓库）。
- 把本目录推上去：
  ```bash
  git remote add origin https://github.com/<你的用户名>/wuyue-monitor.git
  git push -u origin main
  ```

### 2. 配置 Secrets（LLM 采集引擎）
仓库 → Settings → Secrets and variables → Actions → New repository secret：

| 名称 | 必填 | 说明 |
|---|---|---|
| `LLM_API_KEY` | ✅ | LLM 密钥。推荐 [DeepSeek](https://platform.deepseek.com)（便宜） |
| `LLM_BASE_URL` | ⬜ | 默认 `https://api.deepseek.com`，换模型时改 |
| `LLM_MODEL` | ⬜ | 默认 `deepseek-chat` |

> 换带联网能力的模型（采集更准）：把 `LLM_BASE_URL` / `LLM_MODEL` 换成智谱 GLM、Kimi 等即可。

### 3. 启用 Pages 并跑一次
- Settings → Pages → Source 选 **GitHub Actions**。
- Actions 标签页 → `daily-collect` → Run workflow 手动触发一次。
- 完成后访问 `https://<你的用户名>.github.io/wuyue-monitor/` 即可看到在线看板。

## 说明与限制

- **定时准确性**：GitHub 免费仓库的 `schedule` 可能延迟数分钟到数十分钟，属正常现象。
- **采集引擎**：搜索用 DeepSeek Search API（`/v1/tools/search`，与 Chat 共用同一个 key，约 5 元/千次），中文覆盖强（能搜到公众号文章、本地新闻、论坛、招聘）；再用 DeepSeek Chat 提炼成结构化事件，**宁缺毋滥、绝不编造**。
- **本地桌面入口**：把桌面 `.url` 快捷方式指向在线链接即可，电脑关着也能看最新数据。
