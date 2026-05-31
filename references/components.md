# Components Reference

All components use unified CSS class names. Visual appearance is determined by the active CSS theme (Minimalism, Liquid Glass, Dark Mode, etc.).

---

## Slide Layouts

Every page is a `<section class="slide ...">`. The layout class determines the structure.

```html
<section class="slide slide-hero">       <!-- Centered hero -->
<section class="slide slide-split">      <!-- Left/right split -->
<section class="slide slide-grid">       <!-- Auto-fit grid -->
<section class="slide slide-cards">      <!-- Flex card row -->
<section class="slide">                  <!-- Default column -->
```

**slide-hero**: Full-screen centered title with subtitle. Best for opening, closing, and quote slides.

**slide-split**: Left text, right image (or two text columns). Best for content slides with visuals.

**slide-grid**: Auto-fit responsive grid. Best for stat grids, image galleries, feature overviews.

**slide-cards**: Horizontal flex row of cards. Best for feature highlights with icons.

---

## Cards

Cards are content containers styled by the active theme. Use them inside grid or card layouts.

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card description text.</p>
</div>
```

### Theme-Specific Card Variants

Some themes provide additional card styles:

**Liquid Glass** - `glass-panel`:
```html
<div class="glass-panel">
  <h3>Frosted Panel</h3>
  <p>Semi-transparent with backdrop blur.</p>
</div>
```

**Bento Grid** - `bento-card`, `bento-wide`, `bento-tall`:
```html
<div class="bento-card">Standard card</div>
<div class="bento-card bento-wide">Spans 2 columns</div>
<div class="bento-card bento-tall">Spans 2 rows</div>
```

**Retro Futurism** - `neon-text`, `neon-border`:
```html
<div class="neon-text">Glowing text</div>
<div class="neon-border">Bordered container</div>
```

**Hand Drawn** - `sketch-box`, `sketch-underline`:
```html
<div class="sketch-box">Hand-drawn border box</div>
<span class="sketch-underline">Underlined text</span>
```

**Flat** - `color-block`, `color-block-inverse`:
```html
<div class="color-block">Accent background block</div>
<div class="color-block-inverse">Inverted color block</div>
```

---

## Typography

All themes share the same HTML structure. The CSS theme controls fonts, sizes, and weights.

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<p>Body text paragraph.</p>
<blockquote>"A powerful quote."</blockquote>
```

### Emphasis

```html
<strong>Bold text</strong>
<em>Italic text</em>
<code>Inline code</code>
```

---

## Icons

Use Lucide icons via CDN (already included in base.html).

```html
<i data-lucide="zap" style="width: 32px; height: 32px;"></i>
<i data-lucide="shield" style="width: 24px; height: 24px;"></i>
<i data-lucide="layers" style="width: 20px; height: 20px;"></i>
```

**Common icon names**:
- Actions: `zap`, `play`, `send`, `download`, `upload`
- UI: `shield`, `lock`, `eye`, `settings`, `menu`
- Data: `bar-chart-3`, `trending-up`, `activity`, `pie-chart`
- Content: `file-text`, `image`, `video`, `music`, `camera`
- Navigation: `arrow-right`, `arrow-left`, `chevron-down`, `external-link`
- Status: `check-circle`, `x-circle`, `alert-triangle`, `info`

---

## Images

```html
<figure>
  <img src="images/photo.jpg" alt="Description">
  <figcaption>Caption text</figcaption>
</figure>
```

### Full-Bleed Image

```html
<section class="slide" style="padding: 0;">
  <img src="images/full-bleed.jpg" alt="Visual" style="width: 100%; height: 100%; object-fit: cover;">
</section>
```

### Image Grid

```html
<div class="slide-grid">
  <img src="images/01.jpg" alt="Image 1">
  <img src="images/02.jpg" alt="Image 2">
  <img src="images/03.jpg" alt="Image 3">
  <img src="images/04.jpg" alt="Image 4">
</div>
```

---

## Tables

```html
<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="text-align: left; padding: 0.75rem 1rem; border-bottom: 2px solid currentColor;">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Cell</td>
    </tr>
  </tbody>
</table>
```

---

## Navigation

The base template includes built-in navigation:

- **Arrow keys** (Left/Right): Previous/Next slide
- **Space / Arrow Down**: Next slide
- **Escape**: Toggle index overlay
- **Home / End**: First / Last slide
- **Mouse wheel**: Scroll through slides
- **Touch swipe**: Mobile navigation

### Index Overlay

Press Escape to see a grid overview of all slides. Click any thumbnail to jump to that slide.

### Slide Number

The current slide number is displayed in the bottom-right corner (e.g., "3 / 12").

---

## Edit Mode

When running with the edit server (`node server.js`), a pencil button appears in the bottom-right corner. Click it to enable inline editing:

- Text elements become directly editable
- Changes auto-save to disk after 600ms of inactivity
- Works with headings, paragraphs, blockquotes, and captions
