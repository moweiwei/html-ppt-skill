# Unified Layout Library

All layouts use the same CSS class names. Visual appearance is determined by the active CSS theme (Minimalism, Liquid Glass, Dark Mode, etc.). Copy any snippet directly into `<!-- SLIDES_HERE -->`.

---

## 1. Hero Layouts

### 1.1 Centered Hero

Full-screen centered title with subtitle. The classic opening slide.

```html
<section class="slide slide-hero">
  <h1>Your Title Here</h1>
  <p>Subtitle or brief description of the talk</p>
</section>
```

Best with: All styles

---

### 1.2 Hero with Background Image

Full-screen hero with a background image and overlaid text.

```html
<section class="slide slide-hero" style="background-image: url('images/01-hero.jpg'); background-size: cover; background-position: center;">
  <h1 style="color: white; text-shadow: 0 2px 20px rgba(0,0,0,0.5);">Your Title Here</h1>
  <p style="color: rgba(255,255,255,0.8);">Subtitle or brief description</p>
</section>
```

Best with: Minimalism, Liquid Glass, Dark Mode

---

### 1.3 Split Hero

Left text, right image. Great for introducing a product or concept with a visual.

```html
<section class="slide slide-split">
  <div>
    <h1>Your Title Here</h1>
    <p>A short description that explains the core idea in one or two sentences.</p>
  </div>
  <div>
    <img src="images/hero-right.jpg" alt="Hero visual">
  </div>
</section>
```

Best with: All styles

---

### 1.4 Hero with Meta Row

Centered hero with author/date metadata below the subtitle.

```html
<section class="slide slide-hero">
  <h1>Your Title Here</h1>
  <p>Subtitle or brief description</p>
  <div style="margin-top: 2rem; opacity: 0.6; font-size: 0.875rem;">
    <span>Author Name</span> <span>&middot;</span> <span>2026.06</span>
  </div>
</section>
```

Best with: All styles

---

## 2. Content Layouts

### 2.1 Text-Only

Title with multiple paragraphs. The workhorse for explaining ideas.

```html
<section class="slide">
  <h2>Section Title</h2>
  <p>First paragraph introducing the topic. Keep it concise and focused on one idea.</p>
  <p>Second paragraph expanding on the point. Add supporting details or examples here.</p>
  <p>Third paragraph with a conclusion or transition to the next slide.</p>
</section>
```

Best with: All styles

---

### 2.2 Left Text, Right Image

Split layout with text on the left and an image on the right. Ideal for illustrating a point.

```html
<section class="slide slide-split">
  <div>
    <h2>Section Title</h2>
    <p>Explain the concept here. This side holds the narrative and supporting text.</p>
    <p>Add a second paragraph if needed, or use a short list of key points.</p>
  </div>
  <div>
    <figure>
      <img src="images/content-right.jpg" alt="Supporting visual">
      <figcaption>Image caption or credit</figcaption>
    </figure>
  </div>
</section>
```

Best with: All styles

---

### 2.3 Two-Column Text

Side-by-side text columns for comparing ideas or presenting parallel information.

```html
<section class="slide slide-split">
  <div>
    <h3>Left Column Title</h3>
    <p>Content for the left column. Present one perspective, approach, or set of ideas here.</p>
  </div>
  <div>
    <h3>Right Column Title</h3>
    <p>Content for the right column. Present the contrasting or complementary perspective here.</p>
  </div>
</section>
```

Best with: All styles

---

### 2.4 Quote / Blockquote

A single powerful quote with attribution. Use for emphasis or transitions.

```html
<section class="slide slide-hero">
  <blockquote style="font-size: 2rem; max-width: 70%; line-height: 1.4;">
    "The best way to predict the future is to invent it."
  </blockquote>
  <p style="margin-top: 1.5rem; opacity: 0.6;">&mdash; Alan Kay</p>
</section>
```

Best with: All styles. Liquid Glass adds a frosted backdrop; Dark Mode adds dramatic contrast.

---

## 3. Data Layouts

### 3.1 KPI Hero

One big number with a label. Maximum impact for a single metric.

```html
<section class="slide slide-hero">
  <div style="font-size: 8rem; font-weight: 700; line-height: 1;">110K+</div>
  <p style="font-size: 1.5rem; margin-top: 1rem;">Lines of Code Written in 64 Days</p>
  <p style="opacity: 0.6; margin-top: 0.5rem;">From zero to open-source launch</p>
</section>
```

Best with: All styles

---

### 3.2 Stat Grid

3-4 metrics in a row. Great for dashboards or project summaries.

```html
<section class="slide">
  <h2>Project Metrics</h2>
  <div class="slide-grid" style="margin-top: 2rem;">
    <div style="text-align: center;">
      <div style="font-size: 3rem; font-weight: 700;">64</div>
      <div>Days</div>
      <div style="opacity: 0.6; font-size: 0.875rem;">From zero to launch</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 3rem; font-weight: 700;">110K+</div>
      <div>Lines of Code</div>
      <div style="opacity: 0.6; font-size: 0.875rem;">Written solo</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 3rem; font-weight: 700;">5,166</div>
      <div>GitHub Stars</div>
      <div style="opacity: 0.6; font-size: 0.875rem;">Open-source community</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 3rem; font-weight: 700;">41K+</div>
      <div>Downloads</div>
      <div style="opacity: 0.6; font-size: 0.875rem;">Active installations</div>
    </div>
  </div>
</section>
```

Best with: All styles

---

### 3.3 Table Slide

Structured data in a clean table format.

```html
<section class="slide">
  <h2>Comparison Overview</h2>
  <table style="width: 100%; margin-top: 2rem; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 0.75rem 1rem; border-bottom: 2px solid currentColor;">Feature</th>
        <th style="text-align: left; padding: 0.75rem 1rem; border-bottom: 2px solid currentColor;">Plan A</th>
        <th style="text-align: left; padding: 0.75rem 1rem; border-bottom: 2px solid currentColor;">Plan B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Feature One</td>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Included</td>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Included</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Feature Two</td>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Limited</td>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Full</td>
      </tr>
      <tr>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Feature Three</td>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">&mdash;</td>
        <td style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(128,128,128,0.2);">Full</td>
      </tr>
    </tbody>
  </table>
</section>
```

Best with: Minimalism, Flat, Dark Mode

---

### 3.4 Progress / Bar Stats

Horizontal bars showing relative values. Good for rankings or comparisons.

```html
<section class="slide">
  <h2>Platform Growth</h2>
  <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1.25rem;">
    <div>
      <div style="display: flex; justify-content: space-between;"><span>Weibo</span><span>289K</span></div>
      <div style="height: 8px; background: rgba(128,128,128,0.15); margin-top: 0.25rem;">
        <div style="height: 100%; width: 100%; background: currentColor; opacity: 0.7;"></div>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: space-between;"><span>Twitter</span><span>137K</span></div>
      <div style="height: 8px; background: rgba(128,128,128,0.15); margin-top: 0.25rem;">
        <div style="height: 100%; width: 47%; background: currentColor; opacity: 0.7;"></div>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: space-between;"><span>WeChat</span><span>96K</span></div>
      <div style="height: 8px; background: rgba(128,128,128,0.15); margin-top: 0.25rem;">
        <div style="height: 100%; width: 33%; background: currentColor; opacity: 0.7;"></div>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: space-between;"><span>Others</span><span>55K</span></div>
      <div style="height: 8px; background: rgba(128,128,128,0.15); margin-top: 0.25rem;">
        <div style="height: 100%; width: 19%; background: currentColor; opacity: 0.7;"></div>
      </div>
    </div>
  </div>
</section>
```

Best with: All styles

---

## 4. Grid Layouts

### 4.1 Two-by-Two Grid

Four equal items in a 2x2 grid. Perfect for feature overviews or quadrant comparisons.

```html
<section class="slide">
  <h2>Core Capabilities</h2>
  <div class="slide-grid" style="margin-top: 2rem;">
    <div>
      <h3>Capability One</h3>
      <p>Description of the first capability and why it matters.</p>
    </div>
    <div>
      <h3>Capability Two</h3>
      <p>Description of the second capability and its benefits.</p>
    </div>
    <div>
      <h3>Capability Three</h3>
      <p>Description of the third capability with supporting details.</p>
    </div>
    <div>
      <h3>Capability Four</h3>
      <p>Description of the fourth capability and its impact.</p>
    </div>
  </div>
</section>
```

Best with: All styles

---

### 4.2 Three-Column Grid

Three equal columns for triads of content.

```html
<section class="slide">
  <h2>Three Pillars</h2>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 2rem;">
    <div>
      <h3>Design</h3>
      <p>Craft interfaces that are beautiful, functional, and accessible.</p>
    </div>
    <div>
      <h3>Engineering</h3>
      <p>Build robust systems that scale gracefully under pressure.</p>
    </div>
    <div>
      <h3>Strategy</h3>
      <p>Align product decisions with long-term business goals.</p>
    </div>
  </div>
</section>
```

Best with: All styles

---

### 4.3 Feature Cards

Cards with icons for feature highlights. Uses Lucide icons.

```html
<section class="slide">
  <h2>Features</h2>
  <div class="slide-cards" style="margin-top: 2rem;">
    <div style="flex: 1; min-width: 200px; padding: 1.5rem; border: 1px solid rgba(128,128,128,0.2);">
      <i data-lucide="zap" style="width: 32px; height: 32px;"></i>
      <h3 style="margin-top: 0.75rem;">Fast</h3>
      <p>Optimized for speed at every layer of the stack.</p>
    </div>
    <div style="flex: 1; min-width: 200px; padding: 1.5rem; border: 1px solid rgba(128,128,128,0.2);">
      <i data-lucide="shield" style="width: 32px; height: 32px;"></i>
      <h3 style="margin-top: 0.75rem;">Secure</h3>
      <p>Enterprise-grade security built into every feature.</p>
    </div>
    <div style="flex: 1; min-width: 200px; padding: 1.5rem; border: 1px solid rgba(128,128,128,0.2);">
      <i data-lucide="layers" style="width: 32px; height: 32px;"></i>
      <h3 style="margin-top: 0.75rem;">Scalable</h3>
      <p>Grows with your needs from prototype to production.</p>
    </div>
  </div>
</section>
```

Best with: All styles

---

### 4.4 Numbered Steps

Sequential steps or process flow in a grid.

```html
<section class="slide">
  <h2>How It Works</h2>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 2rem;">
    <div>
      <div style="font-size: 3rem; font-weight: 700; opacity: 0.3;">01</div>
      <h3>Input</h3>
      <p>Provide your content, data, or creative brief.</p>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: 700; opacity: 0.3;">02</div>
      <h3>Process</h3>
      <p>Our system analyzes, structures, and refines.</p>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: 700; opacity: 0.3;">03</div>
      <h3>Output</h3>
      <p>Receive polished, ready-to-use results.</p>
    </div>
  </div>
</section>
```

Best with: All styles

---

## 5. Image Layouts

### 5.1 Full-Bleed Image

An image that fills the entire slide. Use for dramatic visual impact.

```html
<section class="slide" style="padding: 0;">
  <img src="images/full-bleed.jpg" alt="Full-bleed visual" style="width: 100%; height: 100%; object-fit: cover;">
</section>
```

Best with: All styles. Minimalism and Dark Mode handle this especially well.

---

### 5.2 Image Grid (2x2)

Four images in a grid. Great for showcasing multiple products, screenshots, or examples.

```html
<section class="slide">
  <h2>Gallery</h2>
  <div class="slide-grid" style="margin-top: 2rem;">
    <img src="images/grid-01.jpg" alt="Image 1">
    <img src="images/grid-02.jpg" alt="Image 2">
    <img src="images/grid-03.jpg" alt="Image 3">
    <img src="images/grid-04.jpg" alt="Image 4">
  </div>
</section>
```

Best with: All styles

---

### 5.3 Image Grid (3-Up)

Three images side by side. Good for comparisons or a trio of examples.

```html
<section class="slide">
  <h2>Screenshots</h2>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem;">
    <figure>
      <img src="images/screen-01.jpg" alt="Screenshot 1">
      <figcaption>Desktop view</figcaption>
    </figure>
    <figure>
      <img src="images/screen-02.jpg" alt="Screenshot 2">
      <figcaption>Mobile view</figcaption>
    </figure>
    <figure>
      <img src="images/screen-03.jpg" alt="Screenshot 3">
      <figcaption>Tablet view</figcaption>
    </figure>
  </div>
</section>
```

Best with: All styles

---

### 5.4 Left Image, Right Text

Image on the left with explanatory text on the right.

```html
<section class="slide slide-split">
  <div>
    <img src="images/left-photo.jpg" alt="Visual evidence">
  </div>
  <div>
    <h2>What You See</h2>
    <p>Explain the image and its significance. Connect the visual to your narrative.</p>
    <p>Add context, data, or a call to action on this side.</p>
  </div>
</section>
```

Best with: All styles

---

## 6. Chapter Layouts

### 6.1 Section Divider

Chapter number and title. A clean break between major sections.

```html
<section class="slide slide-hero">
  <div style="font-size: 1rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.5;">Chapter 02</div>
  <h1 style="margin-top: 1rem;">The Method</h1>
</section>
```

Best with: All styles. Use `hero light` or `hero dark` variants in Magazine style for WebGL backgrounds.

---

### 6.2 Chapter Intro

Chapter title with a brief description of what the section covers.

```html
<section class="slide slide-hero">
  <div style="font-size: 1rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.5;">Chapter 02</div>
  <h1 style="margin-top: 1rem;">The Method</h1>
  <p style="max-width: 60%; margin-top: 1.5rem; opacity: 0.7;">A brief overview of what this section covers and why it matters to the overall narrative.</p>
</section>
```

Best with: All styles

---

## 7. Closing Layouts

### 7.1 Thank You / Q&A

A simple closing slide to end the presentation.

```html
<section class="slide slide-hero">
  <h1>Thank You</h1>
  <p style="margin-top: 1rem;">Questions &amp; Discussion</p>
</section>
```

Best with: All styles

---

### 7.2 Contact Info

Closing slide with contact details and links.

```html
<section class="slide slide-hero">
  <h1>Let's Connect</h1>
  <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
    <span>name@example.com</span>
    <span>github.com/username</span>
    <span>@handle</span>
  </div>
</section>
```

Best with: All styles

---

### 7.3 Closing Statement

A final thought or manifesto to leave the audience with.

```html
<section class="slide slide-hero">
  <blockquote style="font-size: 2.5rem; max-width: 70%; line-height: 1.3; font-weight: 700;">
    Build it once.<br>Run it forever.
  </blockquote>
  <p style="margin-top: 2rem; opacity: 0.5;">&mdash; The takeaway</p>
</section>
```

Best with: All styles. Liquid Glass and Dark Mode add visual drama.

---

## Quick Reference

| Category | Layouts | Best For |
|---|---|---|
| Hero | 1.1 Centered, 1.2 BG Image, 1.3 Split, 1.4 Meta Row | Opening slides, chapter covers |
| Content | 2.1 Text, 2.2 Split, 2.3 Two-Column, 2.4 Quote | Explaining ideas, narratives |
| Data | 3.1 KPI Hero, 3.2 Stat Grid, 3.3 Table, 3.4 Bar Stats | Metrics, comparisons, dashboards |
| Grid | 4.1 2x2, 4.2 Three-Column, 4.3 Feature Cards, 4.4 Steps | Feature lists, process flows |
| Image | 5.1 Full-Bleed, 5.2 2x2 Grid, 5.3 3-Up, 5.4 Left Image | Visual showcases, evidence |
| Chapter | 6.1 Divider, 6.2 Intro | Section transitions |
| Closing | 7.1 Thank You, 7.2 Contact, 7.3 Statement | Ending the deck |
