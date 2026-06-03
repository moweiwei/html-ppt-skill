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

## 特性

- **单文件输出** — 所有 CSS、JS、图片内联到一个 HTML 文件，离线可用，分享即用
- **键盘 + 触控导航** — 左右方向键、空格、触屏滑动均可翻页
- **GSAP 动画** — 每页自动播放入场动画，支持自定义过渡效果
- **响应式布局** — 适配 16:9 投屏与移动端竖屏浏览
- **内联编辑** — 无需外部编辑器，点击即可修改文字，自动持久化
- **验证脚本** — 内置 `validate-deck.mjs` 检查生成结果的结构完整性

## 编辑模式

生成的 PPT 支持内联编辑：点击右下角铅笔按钮，文字可直接编辑，600ms 自动保存到磁盘。

使用前需启动服务器：

```bash
node scripts/server.js path/to/your-deck.html
```

然后在浏览器中打开 `http://localhost:3456`。

## 项目结构

```
html-ppt-skill/
├── SKILL.md              # 技能入口
├── assets/
│   ├── base.html         # 基础模板
│   └── edit-mode.js      # 编辑模式脚本
├── references/
│   ├── styles/           # 7 套 CSS 主题
│   ├── layouts.md        # 布局组件库
│   └── ...               # 其他参考文件
└── scripts/
    ├── server.js         # 编辑服务器
    └── validate-deck.mjs # 验证脚本
```

## 常见问题

**Q: 生成的 HTML 文件太大怎么办？**
A: 图片会以 base64 内联，如果内容包含大量高清图片，文件可能超过 5MB。建议压缩图片或使用 SVG 图形替代。

**Q: 如何修改已生成 PPT 的风格？**
A: 重新对 Agent 说出你的需求即可，例如「把这份 PPT 换成液态玻璃风格」。Agent 会基于现有内容重新生成。

**Q: 编辑模式保存后文件在哪里？**
A: 保存直接覆盖原 HTML 文件，600ms 防抖后自动写入磁盘。建议在编辑前备份原文件。

**Q: 支持导出为 PDF 或图片吗？**
A: 目前仅输出单文件 HTML。可通过浏览器打印功能（Ctrl/Cmd + P）导出 PDF，或使用截图工具逐页保存。

## License

MIT
