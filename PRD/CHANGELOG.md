# shop-quick-list · 變更日誌

> 自動生成：2026-09-06（fleet-upgrade）
> 對齊 SPEC v3.0 契約

---

## v3.0.2 — 2026-09-06（fleet-upgrade）

**升級者**：Sean 10-repo-fleet worker

### Added

- **PRD/SPEC.md** — 新增 v3.0.2 完整 9 節規格書（從既有 AGENTS.md v1.0 升級至 fleet SPEC v3.0 契約）
- **PRD/CHANGELOG.md** — 本文件（v3.0.2 + v1.0 條目）
- **.github/workflows/ci.yml** — 新增 4-job GHA CI：lint-skipped / test-skipped / build / deploy-to-pages

### Changed

- **部署目標**：Vercel → **GitHub Pages**（fleet 統一規格，取代原 Vercel 設定）
- **AGENTS.md**：保留不動（既有開發者契約完整記錄所有「不要做」規則）

### Notes

- 升級前：純靜態 HTML + AGENTS.md、無 GHA CI、Vercel 部署
- 升級後：完整 PRD v3.0.2 + CHANGELOG + 4-job GHA CI + Pages 部署 ready
- 純靜態跳過 npm install / build（無 framework、無 test script）
- 既有 FR-001~013 全部維持 `✅ shipped`（無 production code 變更）

### Risk

- GHA Pages 部署結構需把 `index.html` + `dashboard.html` + `assets/` + `AGENTS.md` + `README.md` 複製到 `dist/`，因為是純靜態不是 Vite build 產物。CI workflow 已處理。
- 既有 Vercel 設定（`.vercel/`）仍在 working tree，未來若要清掉可手動 commit `.vercel/` 移除

---

## v1.0.0 — 2026-08（初始版本）

**作者**：Sean 開發

### Added

- **靜態 HTML landing page** — 1280×715 設計稿還原（含 Hero 行銷區 + 完整 inline APP mockup）
- **`dashboard.html`** — 307 行主要頁面（hero + features + timeline + FAQ + CTA）
- **`index.html`** — meta refresh redirect → `dashboard.html`（5 行）
- **預編譯 Tailwind CSS v3.4.17** — `assets/tailwind.min.css`（28 KB，含品牌色系 + 全部 utility）
- **本機化 Lucide Icons** — `assets/lucide.min.js`（348 KB）
- **品牌標誌** — `assets/brand-mark.svg`（placeholder）
- **Vanilla JS 互動**：
  - Toggle 圓球 200ms 平滑滑動
  - 「重新生成文案」按鈕（200ms 淡出 → 600ms 淡入）
  - `.fade-up` 進場動畫（每張 +80ms 依序）
  - 時間軸第 3 節點（平台同步中）`ringPulse` 持續動畫
- **Google Fonts** — Noto Sans TC（300/400/500/700/800/900，**唯一外部例外**）
- **Tailwind 設定** — `tailwind.config.js`（品牌色 `#2F8F6E`、背景 `#F4EFE6`、字體、陰影 `shadow-[0_8px_30px_rgba(0,0,0,0.08)]`）
- **Tailwind 編譯入口** — `src/input.css`（@tailwind base/components/utilities）
- **`package.json`** — devDep: tailwindcss@^3.4.17（僅供未來重建 CSS）
- **`.gitignore`** — node_modules / .vercel / .env / dist / build
- **`README.md`** — 啟動方式、檔案結構、rebuild CSS 指令
- **`AGENTS.md`** — 開發者契約（目標 / 避免 / 技術棧 / 指令 / 驗證清單）
- **Vercel 部署設定**（`.vercel/`）— 原部署目標
