# 電商上架快手 — Landing Page

靜態 HTML 還原 1280×715 設計稿的行銷 Landing Page，同時把畫面中央那張「上架工作台 - 新增商品」APP 主畫面也一比一做出來，作為 hero 區的視覺主體。

## 啟動方式

直接用瀏覽器打開 `index.html` 即可，**無需安裝任何依賴**。

```bash
# macOS
open index.html
# Windows
start "" index.html
# Linux
xdg-open index.html
```

若需要本機伺服器（推薦，避免某些瀏覽器的 CORS 限制）：

```bash
cd ecommerce-listing-tool

# 任選其一：
python3 -m http.server 8080
# 或
npx serve .
# 或
php -S localhost:8080
```

然後開啟 http://localhost:8080

## 檔案結構

```
ecommerce-listing-tool/
├── index.html              # 主要頁面（854 行，含完整 APP mockup + Hero 行銷區）
├── assets/
│   ├── tailwind.min.css    # 預編譯 Tailwind CSS（28 KB，含品牌色系 + 全部 utility）
│   ├── lucide.min.js       # Lucide Icons（348 KB，本機化）
│   └── brand-mark.svg      # 品牌標誌 placeholder
├── src/input.css           # Tailwind 編譯入口（@tailwind base/components/utilities）
├── tailwind.config.js      # Tailwind 設定（品牌色、字體、陰影）
├── package.json            # 僅供未來重建 CSS 使用
└── README.md               # 本檔
```

## 重建 CSS（如修改了 index.html 並新增 Tailwind class）

```bash
cd ecommerce-listing-tool
./node_modules/.bin/tailwindcss \
  -c ./tailwind.config.js \
  -i ./src/input.css \
  -o ./assets/tailwind.min.css --minify
```

或重新安裝後：

```bash
HOME=/tmp/fakehome npm ci   # 若全域 npm cache 有權限問題
./node_modules/.bin/tailwindcss -c ./tailwind.config.js -i ./src/input.css -o ./assets/tailwind.min.css --minify
```

## 技術棧

- **Tailwind CSS** — 預編譯 v3.4.17，本機化（無 CDN 依賴）
- **Google Fonts** — Noto Sans TC（300/400/500/700/800/900）
- **Lucide Icons** — 本機化（assets/lucide.min.js）
- **Vanilla JavaScript** — 互動：toggle、重新生成文案淡入淡出、卡片 fade-up 進場

## 設計還原重點

- **主色**：`#2F8F6E` 森林綠（hover `#27785B`、active tint `#E8F4EE`）
- **背景**：`#F4EFE6` 米白，右側多層模糊綠色光暈
- **卡片**：白底、`rounded-2xl / rounded-[20px]`、`shadow-[0_8px_30px_rgba(0,0,0,0.08)]`
- **字體**：Noto Sans TC；Hero `text-5xl md:text-6xl font-extrabold`、section title `text-lg font-bold`
- **APP 主畫面**：220px 側邊欄、4 步驟指示器、3 張內容卡（商品照片 / AI 文案 / 平台同步）、商品資訊、上架流程時間軸
- **瓶身插畫**：以 inline SVG 繪製（白色 / 米色壓頭瓶身、品牌綠葉背景、地面陰影、品牌標籤）

## 互動

1. **切換開關**：點任一 toggle，圓球 200ms 平滑滑動
2. **重新生成文案**：點「重新生成文案」→ 200ms 淡出 → 600ms 後淡入新文案（3 組備選文案循環）
3. **進場動畫**：所有 `.fade-up` 元素依序（每張 +80ms）淡入上移
4. **時間軸脈衝**：第 3 節點（平台同步中）持續 `ringPulse` 動畫

## 瀏覽器需求

- 任何近三年的瀏覽器（Chrome / Edge / Firefox / Safari）
- 唯一外部 CDN 依賴：`fonts.googleapis.com` / `fonts.gstatic.com`（Noto Sans TC）
- Tailwind 與 Lucide 已本機化，無其他外部請求