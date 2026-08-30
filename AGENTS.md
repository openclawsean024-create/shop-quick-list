# 電商上架快手（ecommerce-listing-tool）

## 目標

這個專案是「電商上架快手」（一個把商品照片快速同步到多個電商平台的上架工具）的**行銷 Landing Page**，同時把畫面中央那張「上架工作台 — 新增商品」APP 主畫面 1:1 還原到 `index.html`，作為 hero 區的視覺主體。

最終交付是一份**完全靜態**的單檔 HTML（預編譯 Tailwind + 本機化 Lucide Icons），可直接用瀏覽器開啟或掛在任何靜態託管（如 Vercel）上；不依賴任何 build / framework runtime。

## 避免

- **不要引入框架**（React / Vue / Svelte / Next / Nuxt 等）。整個頁面是純 HTML + 預編譯 Tailwind + vanilla JS；引入 SSR / SPA 會破壞「無需建置直接開啟」的目標。
- **不要引入 Tailwind CDN**。`assets/tailwind.min.css` 必須是預編譯的本機檔案，避免生產依賴外部 CDN。
- **不要在執行期引入遠端 icon 套件**。Lucide 走 `assets/lucide.min.js`，如需新 icon 請下載並 commit 進 `assets/`，不要用 `<script src="https://unpkg.com/...">`。
- **不要把 `node_modules/`、`/dist/`、`/build/` 提交進版控**。`.gitignore` 已設定，但新增 ignore 規則時不要破壞已 commit 的 `assets/tailwind.min.css`（這是建置產物，但刻意 commit 以維持「零依賴運行」）。
- **不要破壞既有的視覺契約**：主色 `#2F8F6E`、背景 `#F4EFE6`、hero 字級 `text-5xl md:text-6xl font-extrabold`、陰影 `shadow-[0_8px_30px_rgba(0,0,0,0.08)]`，以及瓶身 SVG 插畫——這些是還原 1280×715 設計稿的硬條件，調整前請先確認是否會偏離原設計。
- **不要在 `index.html` 內新增會跑外部請求的 script / link**（除了 Google Fonts: `fonts.googleapis.com` / `fonts.gstatic.com`，這是唯一允許的例外）。
- **不要修改 `package.json` 的 `scripts` 加入真實測試**。本專案是純靜態 HTML，沒有自動化測試；如需驗證，靠手動 / 瀏覽器預覽，不要硬塞單元測試框架。
- **不要修改 `.gitignore` 移掉 `.vercel/`**——它已經在版控之外，是預期的。

待觀察：
- README 提到「唯一外部 CDN 依賴：Google Fonts」；若未來要全離線，需把 Noto Sans TC 字型本機化並 commit（目前尚未做）。
- `.vercel/` 目錄已存在於工作樹中，代表此專案曾部署到 Vercel；後續若改部署目標（例如換成純 GitHub Pages），Vercel 的 metadata 可保留或一併清掉，視需要決定。

## 技術棧與指令

### 技術棧

- **HTML / 靜態頁面**：`index.html`（854 行，內含完整 APP mockup + Hero 行銷區）
- **樣式**：Tailwind CSS v3.4.17，預編譯到 `assets/tailwind.min.css`
- **圖示**：Lucide Icons，本機化（`assets/lucide.min.js`）
- **字型**：Google Fonts — Noto Sans TC（300 / 400 / 500 / 700 / 800 / 900）
- **腳本**：Vanilla JS（toggle、淡入淡出、fade-up 進場、timeline ring pulse）
- **託管**：Vercel（由 `.vercel/` 推斷）

### 目錄結構

```
ecommerce-listing-tool/
├── index.html              # 主要頁面（含完整 APP mockup + Hero 行銷區）
├── assets/
│   ├── tailwind.min.css    # 預編譯 Tailwind CSS（28 KB，含品牌色系 + 全部 utility）
│   ├── lucide.min.js       # Lucide Icons（348 KB，本機化）
│   └── brand-mark.svg      # 品牌標誌 placeholder
├── src/input.css           # Tailwind 編譯入口（@tailwind base/components/utilities）
├── tailwind.config.js      # Tailwind 設定（品牌色、字體、陰影）
├── package.json            # 僅供未來重建 CSS 使用
├── .gitignore              # node_modules / .vercel / .env / dist / build
└── AGENTS.md               # 本檔
```

### 常用指令

執行 / 預覽（無需安裝依賴）：

```bash
# 直接打開
open index.html                      # macOS
xdg-open index.html                  # Linux
start "" index.html                  # Windows

# 本機靜態伺服器（推薦，避免部分瀏覽器的 CORS 限制）
python3 -m http.server 8080
# 或
npx serve .
```

修改了 `index.html` 並新增 Tailwind class 後**重建 CSS**：

```bash
cd ecommerce-listing-tool

# 若全域 npm cache 有權限問題
HOME=/tmp/fakehome npm ci

./node_modules/.bin/tailwindcss \
  -c ./tailwind.config.js \
  -i ./src/input.css \
  -o ./assets/tailwind.min.css --minify
```

### 驗證清單（手動，因為是純靜態 HTML）

- 在 1280px、1440px、1920px 寬下看 hero 區排版沒破。
- 點任一 toggle → 圓球 200ms 平滑滑動。
- 點「重新生成文案」→ 200ms 淡出 → 600ms 後淡入新文案。
- 進場時所有 `.fade-up` 元素依序（每張 +80ms）淡入上移。
- 時間軸第 3 節點（平台同步中）持續 `ringPulse` 動畫。
- 確認 DevTools Network 上**沒有**非 Google Fonts 的第三方請求。

### 交付前

- 本專案不適用自動化測試，請依上列「驗證清單」手動驗證並在 commit message 或 PR 描述註記結果。
- `git status` 乾淨、`git log --oneline` 改動軌跡清楚可回滾。
