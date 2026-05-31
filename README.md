# html-ppt-skill

生成横向翻页网页 PPT（单文件 HTML），支持 7 种视觉风格 + 内联编辑功能。

## 30 秒开始

```bash
npx skills add https://github.com/moweiwei/html-ppt-skill --skill html-ppt-skill
npx skills add https://github.com/greensock/gsap-skills
```

安装后直接对 Agent 说：

```
帮我做一份关于 [主题] 的网页 PPT，用极简主义风格
```

## 7 种风格

| 风格 | 特征 | 适合 |
|------|------|------|
| 极简主义 | 留白、中性色、无装饰 | 官网、B端 |
| 液态玻璃 | 半透明、blur、渐变 | 科技/AI |
| 动态网格 | 圆角卡片、微交互 | 作品集、SaaS |
| 扁平化 | 高对比色块、无阴影 | 电商、企业 |
| 复古未来 | 霓虹、像素、噪点 | 潮牌、文创 |
| 手绘插画 | 手绘边框、纸纹 | 教育、公益 |
| 暗黑模式 | 深灰、低饱和色调 | 阅读、健康 |

## 编辑模式

生成的 PPT 支持内联编辑：点击右下角铅笔按钮，文字可直接编辑，600ms 自动保存到磁盘。

使用前需启动服务器：

```bash
node server.js path/to/your-deck.html
```

然后在浏览器中打开 `http://localhost:3456`。

## 项目结构

```
html-ppt-skill/
├── SKILL.md              # 技能入口
├── assets/
│   ├── base.html         # 基础模板
│   └── edit-mode.js      # 编辑模式脚本
├── server.js             # 编辑服务器
├── references/
│   ├── styles/           # 7 套 CSS 主题
│   ├── layouts.md        # 布局组件库
│   └── ...               # 其他参考文件
└── scripts/
    └── validate-deck.mjs # 验证脚本
```

## License

MIT
