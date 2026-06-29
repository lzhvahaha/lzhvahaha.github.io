# 李子豪 · 个人学术主页

一个基于 **React + Vite** 构建的单页应用（SPA），为中国科学技术大学凝聚态物理博士研究生李子豪打造的个人学术主页，包含个人简介、教育经历、项目经历、研究方向、论文与专利列表，以及文章与标签两个博客子页面。

设计上采用固定 1440px 画布、米白底色 + 深蓝强调色的学术风格，正文使用 Source Serif 4 衬线字体，UI 元素使用 Inter 无衬线字体。

---

## 目录

- [技术架构](#技术架构)
- [目录结构](#目录结构)
- [页面与路由](#页面与路由)
- [设计系统](#设计系统)
- [环境准备](#环境准备)
- [常用命令](#常用命令)
- [组件详解](#组件详解)
- [修改内容](#修改内容)
- [常见问题](#常见问题)

---

## 技术架构

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | React 18.3 | 函数组件 + Hooks，SPA 单页应用 |
| 构建工具 | Vite 6 | dev server 与 build 均使用，`appType: 'spa'` |
| 路由 | react-router-dom 6 | `BrowserRouter`，四条路由 |
| UI 组件库 | Antd 5.22 | 已安装，当前页面以原生元素 + Tailwind 为主 |
| 样式 | Tailwind CSS 3.4 + PostCSS / Autoprefixer | 设计 token 集中在 `tailwind.config.js` |
| Markdown 渲染 | react-markdown + remark-gfm + remark-math + rehype-katex | 文章详情页渲染 Markdown，支持 GFM 表格、LaTeX 数学公式 |
| 字体 | Google Fonts CDN | Source Serif 4（标题/正文）+ Inter（UI/元信息） |

**核心数据流**：

```
index.html  →  src/main.jsx (BrowserRouter 包裹)
                    ↓
              src/App.jsx (Routes 定义四条路由)
                    ↓
   pages/*.jsx  ←  components/*.jsx  ←  assets/*
        ↓
   content/postsMeta.js (文章元数据)  ←  content/posts/*.md (文章正文)
                    ↓
              Vite 构建  →  dist/ (静态 HTML + JS + CSS)
```

> 首页的个人信息、履历、研究方向、论文等数据以常量数组内联在各自组件中；博客文章的元数据集中在 `src/content/postsMeta.js`，正文以 Markdown 文件存放在 `src/content/posts/`。

---

## 目录结构

```
.
├── index.html                  # HTML 入口（lang=zh-CN, viewport=1440, 字体+KaTeX CSS 预连接）
├── package.json                # 依赖与脚本（name: suyan-blog）
├── vite.config.js              # ★ Vite 配置（端口 3000, host:true, SPA 模式）
├── tailwind.config.js          # ★ 设计系统（颜色 / 字体 / 宽度 token）
├── postcss.config.js           # PostCSS（tailwind + autoprefixer）
├── README.md                   # 本文件
├── assets/                     # 静态资源（通过 import 引入，经 Vite 处理）
│   ├── images/
│   │   └── 3_13.png            # 头像（AboutSection 使用）
│   └── svg/
│       ├── 3_62.svg            # Research 图标 1（扫描探针显微镜研制）
│       ├── 3_70.svg            # Research 图标 2（低温强磁场 STM）
│       ├── 3_81.svg            # Research 图标 3（太赫兹近场成像）
│       └── 3_87.svg            # Research 图标 4（强磁场技术）
├── dist/                       # 构建产物（npm run build 生成，git 忽略建议）
└── src/
    ├── main.jsx                # 入口：ReactDOM.createRoot + BrowserRouter
    ├── App.jsx                 # ★ 路由表（/ /articles /articles/:slug /tags）
    ├── index.css               # ★ 全局样式（Tailwind 指令 + reset + .page-container + .article-body）
    ├── pages/
    │   ├── HomePage.jsx        # 首页 / （学术主页）
    │   ├── ArticlesPage.jsx    # 文章列表 /articles（最新文章从 postsMeta 读取，可点击跳转）
    │   ├── ArticleDetailPage.jsx # ★ 文章详情 /articles/:slug（用 react-markdown 渲染）
    │   └── TagsPage.jsx        # 标签归档 /tags（标签从 postsMeta 自动聚合）
    ├── components/
    │   ├── Navbar.jsx              # ★ 导航栏（首页 / 文章页两种形态）
    │   ├── Footer.jsx              # 页脚（版权 + 更新时间）
    │   ├── AboutSection.jsx        # 首页-About：头像 + 姓名 + 简介
    │   ├── CVSection.jsx           # 首页-CV：教育与经历时间线
    │   ├── ResearchSection.jsx     # 首页-Research：4 张方向卡片（2×2）
    │   └── PublicationsSection.jsx # 首页-Publications：期刊论文 + 授权专利
    └── content/
        ├── postsMeta.js            # ★ 文章元数据（slug/title/date/tags/excerpt + 排序函数）
        └── posts/                  # 文章 Markdown 正文
            ├── from-functions-to-neural-networks.md
            ├── transformer-translation-walkthrough.md
            ├── text-to-vectors-embeddings.md
            └── transformer-architecture-explained.md
```

> 带 ★ 的是日常维护最常修改的文件。

---

## 页面与路由

应用共四条路由，定义在 `src/App.jsx`：

| 路径 | 组件 | 说明 |
|---|---|---|
| `/` | `HomePage` | 学术主页：About / CV / Research / Publications 四个区块 |
| `/articles` | `ArticlesPage` | 文章列表：最新文章（真实数据，可点击）+ 生活随笔 |
| `/articles/:slug` | `ArticleDetailPage` | 文章详情：用 react-markdown 渲染 Markdown 正文 |
| `/tags` | `TagsPage` | 标签归档：标签云 + 按标签过滤的分页列表 |

### 首页 `/`（HomePage）

自上而下结构：

1. **Navbar**（首页形态）：左侧 Logo "Zihao Li" ｜ 右侧 `About · CV · Research · Publications · 文章`
   - `About / CV / Research / Publications` 为锚点链接，平滑滚动到对应 section
   - `文章` 跳转 `/articles`
2. **AboutSection**（`#about`）：200×200 圆形头像 + 姓名/职称 + Email/Google Scholar/GitHub/ORCID 联系链接 + 中文简介
3. **CVSection**（`#cv`）：标题 "Education & Experience"，分 教育经历（3 项）与 项目经历（5 项）两组时间线，每行 `标签 | 标题 | 描述`
4. **ResearchSection**（`#research`）：标题 "Research Directions"，2×2 网格共 4 张卡片（560px 宽），每张含图标 + 标题 + 描述
5. **PublicationsSection**（`#publications`）：标题 "Publications & Patents"，按 期刊论文（9 篇）/ 授权专利（6 项）两组展示
6. **Footer**：左侧版权 `© 2026 李子豪. All rights reserved.` ｜ 右侧 `Hosted on GitHub Pages · Last updated June 2026`

### 文章列表页 `/articles`（ArticlesPage）

1. **Navbar**（文章页形态）：Logo "Zihao Li" ｜ `文章(高亮) · 标签 · 首页`
2. **Hero**：大标题 "关于学习和生活的记忆。" + 简介
3. **最新文章**：从 `src/content/postsMeta.js` 读取真实文章数据，按日期降序排列（最新在上），每篇卡片可点击跳转到 `/articles/:slug` 详情页
4. **生活随笔**：4 篇静态 `PostCard` 堆叠（暂无详情页）
5. **Footer**

> 卡片之间无间距，靠共享的 `border-top: 1px solid #E5E2D7` 形成分隔线。

### 文章详情页 `/articles/:slug`（ArticleDetailPage）

1. **Navbar**（文章页形态）
2. **文章头部**：返回链接 + 标题 + 日期·标签
3. **分隔线**
4. **正文**：用 `react-markdown` 渲染 `src/content/posts/:slug.md`，支持 GFM 表格、列表、代码块、LaTeX 数学公式（KaTeX）
5. **Footer**

> Markdown 文件通过 Vite 的 `import.meta.glob('../content/posts/*.md', { query: '?raw' })` 动态加载。

### 标签页 `/tags`（TagsPage）

1. **Navbar**（标签页形态）：Logo "Zihao Li" ｜ `文章 · 标签(高亮) · 首页`
2. **Hero**：标题 "按标签归档" + 简介
3. **标签云**："全部标签" 标题 + 所有标签 pill，每个 pill 显示标签名 + 文章数。标签从 `postsMeta.js` 自动聚合，按数量降序排列
4. **归档区**：选中标签的标题（如 `#入门 · 4 篇文章`）+ 过滤后的文章列表（标题可点击跳转详情页）+ 分页控件
5. **Footer**

**交互逻辑**：
- 默认选中数量最多的标签（当前为 `#入门`）
- 点击任意标签 pill → 切换过滤 + 重置到第 1 页
- 选中态 pill 为实心深蓝（`#003A5C`），未选为描边态
- 每页最多 8 篇，支持 上一页 / 下一页 / 页码按钮

---

## 设计系统

设计 token 集中在 `tailwind.config.js`，全局基础样式在 `src/index.css`。

### 画布与布局

| token | 值 | 用途 |
|---|---|---|
| 页面宽度 | `1440px` | 所有页面固定宽度（`<meta viewport width=1440>`） |
| 内容左右内边距 | `120px` | `.content-padding` / 各 section 直接写死 |
| 内容最大宽度 | `1200px` | `maxWidth.content` |
| 页面最大宽度 | `1440px` | `maxWidth.page` |

### 色彩

| token | 值 | 用途 |
|---|---|---|
| `page-bg` | `#FAF8F7` | 页面背景（米白） |
| `border-light` | `#E5E2D7` | 所有分隔线 / 卡片描边 |
| `text-primary` | `#1A1A1A` | 标题、正文主色 |
| `text-secondary` | `#444444` | 次级正文、描述 |
| `text-tertiary` | `#7D7D7D` | 三级文字、标签计数 |
| `accent-blue` | `#003A5C` | 强调色（链接、激活态、论文年份） |
| `meta-brown` | `#7D5A2F` | 元信息色（日期、标签、分组小标题） |

### 字体

| token | 字体栈 | 用途 |
|---|---|---|
| `font-serif` | `"Source Serif 4", Georgia, serif` | 标题、正文、文章摘要 |
| `font-sans` | `Inter, -apple-system, BlinkMacSystemFont, sans-serif` | 导航、元信息、UI 按钮 |

字体通过 `index.html` 中的 Google Fonts `<link>` 加载（`Source Serif 4` 400/600 + `Inter` 400/500/600）。

### 通用样式类

在 `src/index.css` 中定义：

- `.page-container` — 1440px 居中容器，背景 `page-bg`
- `.content-padding` — 左右 120px 内边距
- `.article-body` — 文章详情页正文排版（标题/段落/引用/代码/表格/公式）
- `html { scroll-behavior: smooth }` — 锚点平滑滚动
- `a:hover { opacity: 0.75 }` — 全局链接 hover 半透明

---

## 环境准备

- **Node.js** ≥ 18（推荐 20+）
- **包管理器**：npm（随 Node 安装）

首次使用：

```bash
npm install
```

---

## 常用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动开发服务器（http://localhost:3000），支持 HMR 热更新 |
| `npm run build` | 构建生产版本到 `dist/` 目录 |
| `npm run preview` | 本地预览构建产物（同样占用 3000 端口） |

### 启动本地开发

```bash
npm run dev
```

浏览器访问 `http://localhost:3000/`。修改任意文件会自动热更新。

### 停止开发服务器

在运行 `npm run dev` 的终端窗口按 `Ctrl + C`。

如果终端已关闭但服务器仍在后台运行：

```bash
lsof -i :3000          # 查找占用 3000 端口的进程
kill <PID>             # 终止进程（替换 <PID>）
```

### 构建生产版本

```bash
npm run build          # 输出到 dist/
npm run preview        # 本地预览构建结果
```

`dist/` 目录可直接部署到任意静态托管服务（Vercel / Netlify / GitHub Pages / Cloudflare Pages 等）。注意：作为 SPA，部署时需配置所有路由 fallback 到 `index.html`。

---

## 组件详解

### `Navbar.jsx` — 导航栏

根据当前路由自动切换两种形态：

- **首页形态**（`/`）：Logo "Zihao Li" ｜ `About · CV · Research · Publications` 为锚点链接，`文章` 跳转 `/articles`
- **文章/标签页形态**（`/articles`、`/articles/:slug`、`/tags`）：Logo "Zihao Li" 可点击回首页，`文章 / 标签 / 首页` 均为 `<Link>`，当前页对应项高亮

### `AboutSection.jsx` — 个人简介

头像通过 `import avatarUrl from '../../assets/images/3_13.png'` 引入（Vite 会处理资源路径）。联系链接目前均为 `href="#"` 占位，需替换为真实地址。简介为李子豪的中文介绍（USTC 凝聚态物理博士、扫描探针显微镜研究方向）。

### `CVSection.jsx` — 教育与项目经历

两组数据 `educationData`（3 项：USTC 博士、USTB 本科、高中）与 `experienceData`（5 项：国家重点研发计划、中科院专项、国家重大仪器、十四五设施、科协青拔）定义在文件顶部，每项含 `period / title / desc`。修改履历只需编辑这两个数组。

### `ResearchSection.jsx` — 研究方向

`researchCards` 数组（4 项：扫描探针显微镜研制、低温强磁场STM、太赫兹近场成像、强磁场技术），每项含 `icon / title / desc`。图标从 `assets/svg/` 引入。卡片宽度固定 560px，2×2 排列，gap 24px。

### `PublicationsSection.jsx` — 论文与专利

`publicationsByYear` 数组，分两组：期刊论文（9 篇）+ 授权专利（6 项），每篇含 `title / authors / venue`（venue 字段对论文显示期刊名，对专利显示状态如"已授权"/"实质审查"）。分组标题用 `accent-blue` 色。

### `ArticlesPage.jsx` — 文章列表页

"最新文章"区从 `src/content/postsMeta.js` 的 `getPostsSorted()` 读取（按日期降序），每篇用 `ClickablePostCard` 渲染，点击跳转 `/articles/:slug`。"生活随笔"区的 `lifeEssays` 数组仍内联在本文件中（暂无详情页）。

### `ArticleDetailPage.jsx` — 文章详情页

通过 `useParams()` 获取 `slug`，从 `postsMeta.js` 查找元数据，用 Vite 的 `import.meta.glob` 加载对应 Markdown 原文，再用 `react-markdown` + `remark-gfm` + `remark-math` + `rehype-katex` 渲染。文章排版样式定义在 `src/index.css` 的 `.article-body` 类中。

### `TagsPage.jsx` — 标签归档页

从 `src/content/postsMeta.js` 导入 `posts`，自动聚合标签及计数。标签云按数量降序排列，默认选中第一个标签。归档列表中的文章标题可点击跳转详情页。分页每页 8 篇。

### `postsMeta.js` — 文章元数据（★ 核心数据源）

所有文章的元数据集中在此文件，每篇含 `slug / title / date / dateISO / tags / excerpt / category`。提供两个辅助函数：`getPostBySlug(slug)` 按 slug 查找、`getPostsSorted()` 按日期降序排列。文章列表页和标签页共用此数据源。

### `content/posts/*.md` — 文章正文

Markdown 文件，文件名（不含 `.md`）即 slug，需与 `postsMeta.js` 中的 slug 对应。支持 GFM 语法和 LaTeX 数学公式。新增文章只需在此目录放入 `.md` 文件并在 `postsMeta.js` 添加元数据。

### `Footer.jsx` — 页脚

固定内容：左侧版权，右侧托管信息。修改文字直接编辑 JSX。

---

## 修改内容

### 改个人信息

编辑 `src/components/AboutSection.jsx`：姓名（李子豪）、职称（博士研究生 · 中国科学技术大学 · 凝聚态物理）、联系链接、中文简介均在 JSX 中直接写死。

### 改履历

编辑 `src/components/CVSection.jsx` 顶部的 `educationData` 与 `experienceData` 数组。

### 改研究方向

编辑 `src/components/ResearchSection.jsx` 顶部的 `researchCards` 数组。如需更换图标，替换 `assets/svg/` 下的对应 SVG 文件或修改 import 路径。

### 改论文与专利列表

编辑 `src/components/PublicationsSection.jsx` 顶部的 `publicationsByYear` 数组，分为"期刊论文"（9 篇）与"授权专利"（6 项）两组。每篇含 `title / authors / venue`（论文的 venue 为期刊名，专利的 venue 为状态）。

### 改文章列表

"最新文章"的数据源是 `src/content/postsMeta.js` 中的 `posts` 数组，每篇含 `slug / title / date / dateISO / tags / excerpt`。文章正文存放在 `src/content/posts/:slug.md`。修改已有文章只需编辑对应的 `.md` 文件和元数据。

"生活随笔"的数据仍内联在 `src/pages/ArticlesPage.jsx` 的 `lifeEssays` 数组中（4 篇，含 `title / date / tags / desc`）。

### 新增一篇文章

1. 在 `src/content/posts/` 下新建 Markdown 文件（如 `my-new-post.md`）
2. 在 `src/content/postsMeta.js` 的 `posts` 数组中添加一条元数据，`slug` 与文件名（不含 `.md`）一致，填好 `title / date / dateISO / tags / excerpt`
3. 文章列表页和标签页会自动更新（无需改其他文件）

### 改标签页数据

标签页从 `src/content/postsMeta.js` 自动聚合标签，无需手动维护。修改文章的 `tags` 字段即可，标签云和计数会自动更新。

### 改导航栏菜单项

- 首页锚点项：编辑 `src/components/Navbar.jsx` 中首页形态的 `<a>` 标签
- 文章页菜单项：编辑文章/标签页形态的 `<Link>` 标签
- 注意：首页 section 的 `id`（`about / cv / research / publications`）需与导航锚点保持一致

### 改配色 / 字体

编辑 `tailwind.config.js` 的 `theme.extend.colors` 与 `fontFamily`。改完后所有使用对应 Tailwind 类（如 `text-accent-blue`、`font-serif`）的组件会自动跟随。

如需更换字体，还需同步修改 `index.html` 中的 Google Fonts `<link>`。

### 改页面宽度 / 内边距

页面宽度 1440px 出现在多处（`index.html` viewport、`vite.config.js`、各组件内联 `style={{ width: 1440 }}`）。左右内边距 120px 同样分散在各组件中。调整时需全局搜索 `1440` 与 `120` 同步修改。

---

## 常见问题

### Q: 修改后页面没变化？

- 确认 `npm run dev` 正在运行
- 浏览器强制刷新（`Cmd+Shift+R` / `Ctrl+Shift+R`）
- 检查终端是否有编译报错

### Q: 访问 `/articles` 或 `/tags` 直接 404？

本地 dev 模式下 Vite 会自动 fallback 到 `index.html`，不会出现此问题。若发生在部署后，是因为服务器未配置 SPA fallback。需在托管服务上设置所有非静态资源请求重写到 `index.html`：

- Nginx：`try_files $uri $uri/ /index.html;`
- Vercel / Netlify：自动处理
- GitHub Pages：需用 `404.html` → `index.html` 的 trick 或 HashRouter

### Q: 如何新增一个页面？

1. 在 `src/pages/` 下新建组件文件（如 `ContactPage.jsx`）
2. 在 `src/App.jsx` 的 `<Routes>` 中添加 `<Route path="/contact" element={<ContactPage />} />`
3. 如需在导航栏入口，编辑 `src/components/Navbar.jsx`

### Q: 如何新增一篇文章？

1. 在 `src/content/posts/` 下新建 `.md` 文件（文件名即 slug）
2. 在 `src/content/postsMeta.js` 的 `posts` 数组中添加元数据（slug 需与文件名一致）
3. 文章列表页和标签页会自动更新

### Q: 如何替换头像 / 图标？

- 头像：替换 `assets/images/3_13.png`（保持文件名，或修改 `AboutSection.jsx` 中的 import 路径）
- 研究方向图标：替换 `assets/svg/` 下对应 SVG，或修改 `ResearchSection.jsx` 中的 import

### Q: 如何部署到线上？

```bash
npm run build    # 生成 dist/
```

将 `dist/` 部署到任意静态托管服务，并确保配置 SPA fallback（见上文）。

---

## 技术栈版本

- React: 18.3.1
- React DOM: 18.3.1
- React Router DOM: 6.28.0
- Antd: 5.22.0
- react-markdown: 10.1.0
- remark-gfm: 4.0.1
- remark-math: 6.0.0
- rehype-katex: 7.0.1
- katex: 0.17.0
- Vite: 6.0.0
- Tailwind CSS: 3.4.17
- PostCSS: 8.4.49
- Autoprefixer: 10.4.20

---

## 许可

本站代码可自由使用与修改。页面中的人名、履历、论文等内容版权归作者所有；博客文章版权归作者所有。
