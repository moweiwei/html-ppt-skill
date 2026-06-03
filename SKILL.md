---
name: html-ppt-skill
description: 生成横向翻页网页 PPT（单文件 HTML），支持 7 种视觉风格 + 内联编辑功能。当用户需要制作分享/演讲/发布会风格的网页 PPT 时使用。
---

# HTML PPT Skill

## 这个 Skill 做什么

生成一份**单文件 HTML**的横向翻页 PPT，支持 7 种视觉风格，可选内联编辑功能。

## 7 种风格

| 风格 | 视觉特征 | 适合场景 |
|------|----------|----------|
| **极简主义 (Minimalism)** | 大量留白、中性配色、无冗余装饰 | 官网、工具类、B端产品 |
| **液态玻璃 (Liquid Glass)** | 半透明层叠、blur 效果、渐变背景 | 科技/AI 平台 |
| **动态网格 (Bento Grid)** | 圆角卡片、错落布局、悬停微交互 | 作品集、SaaS 展示 |
| **扁平化 (Flat Design)** | 高对比色块、无渐变无阴影 | 电商、企业站 |
| **复古未来 (Retro-Futurism)** | 霓虹、像素字体、噪点纹理 | 潮牌、文创、音乐 |
| **手绘插画 (Hand-Drawn)** | 手绘边框、纸张纹理、宽松排版 | 教育、公益、生活方式 |
| **暗黑模式 (Dark Mode)** | 深灰/墨蓝、低饱和正念色调 | 健康、阅读类站点 |

## 何时使用

**合适的场景**：
- 线下分享 / 行业内部讲话 / 私享会
- AI 新产品发布 / demo day
- 带有强烈个人风格的演讲
- 需要"一次做完，不用翻页工具"的网页版 slides

**不合适的场景**：
- 大段表格数据、图表叠加（用常规 PPT）
- 培训课件（信息密度不够）
- 需要多人协作编辑（这是静态 HTML）

## 工作流

### Step 0 · 确认 GSAP Skills 已安装

本 skill 的所有入场动效依赖 **gsap-skills** 提供的 GSAP 动画库和使用指导。如果 gsap-skills 未安装，动画代码将无法正常工作。

检查是否已安装：

```bash
# 查看已安装的 skills 列表，确认包含 gsap-skills
npx skills list
```

如未安装，执行：

```bash
npx skills add https://github.com/greensock/gsap-skills
```

安装后，后续 Step 3 中的动画部分需参考 gsap-skills 文档来编写 GSAP 动画代码。

### Step 1 · 需求澄清（动手前必做）

**如果用户已经给了完整的大纲 + 图片/截图处理要求**,可以跳过直接进 Step 2。

**如果用户只给了主题或一个模糊想法**,用这 8 个问题逐个对齐后再动手：

| # | 问题 | 为什么要问 |
|---|------|-----------|
| 1 | **选哪种风格?**(7 选 1) | 决定用哪个 CSS 主题文件 |
| 2 | **受众是谁?分享场景?** | 决定语言风格和深度 |
| 3 | **分享时长?** | 15 分钟 ≈ 10 页,30 分钟 ≈ 20 页,45 分钟 ≈ 25-30 页 |
| 4 | **有没有原始素材?**(文档 / 数据 / 旧 PPT / 文章链接) | 有素材就基于素材,没有就帮他搭 |
| 5 | **有没有图片或截图?希望怎么处理?** | 决定图文版式、图片槽位 |
| 6 | **有没有硬约束?**(必须包含 XX 数据 / 不能出现 YY) | 避免返工 |
| 7 | **是否需要编辑模式?** | 是否注入 edit-mode.js + server.js |
| 8 | **想要哪套主题色?** | 每种风格有 2-3 套预设色(`data-preset`) |

#### 风格选择参考(问题 1)

| 如果用户说... | 推荐风格 |
|---|---|
| "极简" / "shadcn" / "干净" / 不指定 | **极简主义** |
| "玻璃" / "透明" / "未来感" / "AI" | **液态玻璃** |
| "网格" / "卡片" / "SaaS" / "作品集" | **动态网格** |
| "色块" / "企业" / "电商" / "快" | **扁平化** |
| "霓虹" / "复古" / "潮" / "像素" | **复古未来** |
| "手绘" / "温暖" / "插画" / "亲和" | **手绘插画** |
| "暗色" / "护眼" / "阅读" / "舒适" | **暗黑模式** |

#### 大纲协助(如果用户没有大纲)

用"叙事弧"模板搭骨架：

```
钩子(Hook)       → 1 页   : 抛一个反差 / 问题 / 硬数据让人停下来
定调(Context)    → 1-2 页 : 说明背景 / 你是谁 / 为什么讲这个
主体(Core)       → 3-5 页 : 核心内容,用不同版式穿插
转折(Shift)      → 1 页   : 打破预期 / 提出新观点
收束(Takeaway)   → 1-2 页 : 金句 / 悬念问题 / 行动建议
```

### Step 2 · 拷贝模板

拷贝 `assets/base.html` 到目标位置，同时建 `images/` 文件夹：

```bash
mkdir -p "项目/XXX/ppt/images"
cp "<SKILL_ROOT>/assets/base.html" "项目/XXX/ppt/index.html"
```

然后：

1. **改标题**: grep `必填` 替换为实际标题
2. **注入 CSS**: 读取 `references/styles/选中的风格.css`,整体粘贴进 `<style id="theme-style">` 块
3. **设置 data-preset**: 如用户选了特定预设,在 `<html>` 加 `data-preset="xxx"`

### Step 3 · 生成 Slide 内容

从 `references/layouts.md` 选择合适的布局，填充内容到 `<!-- SLIDES_HERE -->` 位置。

**图片约定**：
- 文件夹: `images/` (和 index.html 同级)
- 命名: `{页号}-{语义}.{ext}`,如 `01-cover.jpg`
- 单张 >= 1600px 宽,总大小控制在 10MB 内

**动画**: 所有入场动效使用 GSAP API，参考 gsap-skills 的指导。

### Step 4 · 编辑模式（可选）

如果用户需要编辑模式：

1. 读取 `assets/edit-mode.js` 的内容
2. 内联到 `</body>` 之前: `<script>/* edit-mode.js 内容 */</script>`
3. 告知用户: 先运行 `node <SKILL_ROOT>/server.js 项目/XXX/ppt/index.html`,再打开浏览器访问

### Step 5 · 生成后验证

对生成的 HTML 文件做以下检查，确保没有遗漏：

```bash
FILE="项目/XXX/ppt/index.html"

# 1. 检查是否还有未替换的占位符
grep -n '\[必填\]' "$FILE" && echo "WARNING: 发现未替换的 [必填] 占位符" || echo "OK: 无占位符残留"

# 2. 检查 theme-style 块是否为空
grep -A2 'id="theme-style"' "$FILE" | grep -q '<\/style>' && echo "WARNING: theme-style 块为空，未注入 CSS" || echo "OK: theme-style 已填充"

# 3. 检查 GSAP 脚本是否引入
grep -q 'gsap' "$FILE" && echo "OK: 已检测到 GSAP" || echo "WARNING: 未找到 GSAP 引用"

# 4. 统计 slide 数量
SLIDE_COUNT=$(grep -c 'class="slide' "$FILE" || echo 0)
echo "共 $SLIDE_COUNT 页 slide"
```

如果以上任何检查输出 WARNING，回到对应步骤修复后再继续。

### Step 6 · 预览与交付

在浏览器中打开生成的文件进行预览：

```bash
# macOS
open 项目/XXX/ppt/index.html

# Linux
xdg-open 项目/XXX/ppt/index.html

# Windows
start 项目/XXX/ppt/index.html
```

告知用户以下键盘/操作快捷方式：

| 操作 | 方式 |
|------|------|
| 下一页 | `→` 方向键 / 空格 / 点击右侧 |
| 上一页 | `←` 方向键 / 点击左侧 |
| 全屏 | `F11` (Windows/Linux) 或 `Ctrl+Cmd+F` (macOS) |

如果是编辑模式，提醒用户先启动编辑服务器再访问浏览器。

## 参考文件

| 文件 | 用途 |
|------|------|
| `references/styles/*.css` | 7 套风格主题 CSS |
| `references/layouts.md` | 布局组件库(22 种布局) |
| `references/components.md` | 共用组件 |
| `references/checklist.md` | 生成检查清单 |
| `references/image-prompts.md` | 配图提示词 |
| `references/screenshot-framing.md` | 截图适配指南 |
| `assets/edit-mode.js` | 编辑模式注入脚本 |
| `server.js` | 编辑服务器 |
| (无外部脚本) | 生成后验证通过 Step 5 内联 bash 命令完成 |
