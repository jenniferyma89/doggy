# DogTi —— 测测你是什么小狗

DogTi 是一个原创的中文小狗性格测试网站，用户答 24 道生活题后，会根据 8 个性格维度生成对应的小狗人格结果，并展示结果卡、分享链接和图鉴解锁体验。

## 功能列表
- 24 道题、4 个选项，每题按 8 个维度计分
- 12 种小狗人格结果，结合加权欧氏距离计算匹配类型
- 支持上一题、刷新恢复进度、重新测试
- 结果页支持复制链接、复制文案、下载 SVG 结果卡
- 狗狗图鉴与本地 unlock 记录
- 使用 localStorage 保存进度和图鉴解锁状态
- 适配 GitHub Pages 子路径部署，资源使用相对路径
- 纯 HTML、CSS、原生 JavaScript，无需后端

## 本地预览
1. 进入项目目录。
2. 使用任意静态文件服务器预览，例如：
   - Python: `python -m http.server 8000`
   - 直接用浏览器打开 `index.html`
3. 浏览器访问 `http://localhost:8000/`。

## 文件结构
- `index.html`：页面结构
- `css/style.css`：页面样式与响应式布局
- `js/data.js`：题目、选项、维度与结果数据
- `js/storage.js`：localStorage 处理
- `js/scoring.js`：计分与结果判定
- `js/quiz.js`：题目渲染和答题逻辑
- `js/share.js`：复制、分享、下载结果卡
- `js/app.js`：页面初始化与交互编排
- `assets/icons/`：图标与分享预览图
- `.nojekyll`：关闭 GitHub Pages 的 Jekyll 处理
- `LICENSE`：保留原有许可证

## 修改题目和结果类型
- 题目、维度和结果定义均放在 `js/data.js`。
- 修改 `QUESTION_SET` 可更新题目和每个选项对应分数。
- 修改 `RESULT_SET` 可更新人格结果标题、分析文案、关键词和目标向量。
- 维度命名位于 `DIMENSIONS` 数组，若新增维度，需同时更新 `js/scoring.js` 的标签映射。

## GitHub Pages 部署
1. 打开 GitHub 仓库。
2. 进入 `Settings` → `Pages`。
3. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
4. 保存后等待 GitHub Pages 构建完成。
5. 网站地址通常为：
   - `https://用户名.github.io/仓库名/`

## 自定义网站名称、颜色和分享信息
- 标题、描述、主题色、Open Graph 信息：修改 `index.html` 里的 `<meta>` 标签。
- 主题颜色：修改 `css/style.css` 中的 `:root` 变量。
- favicon：替换 `assets/icons/favicon.svg`。
- 社交预览图：替换 `assets/icons/dogti-social.svg`。

## 结果说明
DogTi 是一款轻松娱乐性质的性格测试，仅用于娱乐和社交传播，不属于专业心理测评，也不应被当作临床诊断工具。

## 许可证
本项目保留原有 `LICENSE` 文件，采用 MIT License。

## 额外说明
- 所有资源均使用相对路径，适配 GitHub Pages 子路径部署。
- 结果分享链接使用 `?result=xxx` 参数，并在打开时恢复对应结果。
- localStorage 本地保存测试进度和图鉴解锁状态，浏览器禁用本地存储时会降级处理。
