#!/usr/bin/env node
/**
 * validate-deck.mjs
 *
 * Validates an HTML PPT deck file for common issues.
 * Usage: node scripts/validate-deck.mjs path/to/file.html
 *
 * Checks:
 * 1. No placeholder text [必填]
 * 2. CSS theme injected (style#theme-style or :root variables)
 * 3. GSAP present (CDN script or inline)
 * 4. Local images exist on disk (skip data: URIs and http(s) URLs)
 * 5. Slide count between 3 and 50
 * 6. Each slide has meaningful content
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";

// ANSI color codes
const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

const PASS = `${COLORS.green}PASS${COLORS.reset}`;
const FAIL = `${COLORS.red}FAIL${COLORS.reset}`;
const WARN = `${COLORS.yellow}WARN${COLORS.reset}`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function print(label, status, detail = "") {
  const detailStr = detail ? ` ${COLORS.dim}(${detail})${COLORS.reset}` : "";
  console.log(`  [${status}] ${label}${detailStr}`);
}

function printHeader(title) {
  console.log(`\n${COLORS.bold}${COLORS.cyan}── ${title} ──${COLORS.reset}`);
}

// ─── Argument parsing ────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    `${COLORS.red}Error: No HTML file specified.${COLORS.reset}\n` +
      `Usage: node scripts/validate-deck.mjs <path/to/file.html>`
  );
  process.exit(1);
}

const filePath = resolve(args[0]);

if (!existsSync(filePath)) {
  console.error(
    `${COLORS.red}Error: File not found:${COLORS.reset} ${filePath}`
  );
  process.exit(1);
}

if (!filePath.endsWith(".html")) {
  console.error(
    `${COLORS.yellow}Warning: File does not have .html extension:${COLORS.reset} ${filePath}`
  );
}

// ─── Read file ───────────────────────────────────────────────────────────────

let html;
try {
  html = readFileSync(filePath, "utf-8");
} catch (err) {
  console.error(
    `${COLORS.red}Error: Could not read file:${COLORS.reset} ${err.message}`
  );
  process.exit(1);
}

const fileDir = dirname(filePath);
let allPassed = true;

console.log(
  `\n${COLORS.bold}Validating:${COLORS.reset} ${filePath}\n`
);

// ─── Check 1: No placeholder text ───────────────────────────────────────────

printHeader("Placeholder Text");

const PLACEHOLDER_PATTERNS = [
  "[必填]",
  "[待填]",
  "[TODO]",
  "[TBD]",
  "{{",
  "}}",
  "[请填写",
  "[placeholder",
];

const foundPlaceholders = [];
for (const pattern of PLACEHOLDER_PATTERNS) {
  const idx = html.indexOf(pattern);
  if (idx !== -1) {
    // Extract surrounding context (up to 40 chars around the match)
    const start = Math.max(0, idx - 20);
    const end = Math.min(html.length, idx + pattern.length + 20);
    const context = html
      .slice(start, end)
      .replace(/\n/g, " ")
      .trim();
    foundPlaceholders.push(`"${pattern}" near ...${context}...`);
  }
}

if (foundPlaceholders.length === 0) {
  print("No placeholder text found", PASS);
} else {
  allPassed = false;
  for (const p of foundPlaceholders) {
    print("Placeholder text detected", FAIL, p);
  }
}

// ─── Check 2: CSS theme injected ────────────────────────────────────────────

printHeader("CSS Theme");

const hasThemeStyleTag = /<style[^>]*id=["']theme-style["'][^>]*>/i.test(html);
const hasRootVariables = /:root\s*\{[^}]*--[a-zA-Z]/.test(html);
const hasInlineTheme =
  /<style[^>]*>[\s\S]*?--[a-zA-Z][\w-]*\s*:/.test(html);

if (hasThemeStyleTag) {
  print("Theme <style id='theme-style'> found", PASS);
} else if (hasRootVariables || hasInlineTheme) {
  print("CSS custom properties (--vars) found in <style>", PASS);
} else {
  allPassed = false;
  print(
    "No CSS theme detected",
    FAIL,
    "Expected <style id='theme-style'> or :root with CSS variables"
  );
}

// ─── Check 3: GSAP present ──────────────────────────────────────────────────

printHeader("GSAP Animation Library");

const hasGsapCdn =
  /<script[^>]*src=["'][^"']*gsap[^"']*["'][^>]*>/i.test(html);
const hasGsapInline = /(?:gsap|ScrollTrigger)\s*\./m.test(html);
const hasGsapModule =
  /import\s+.*from\s+["'][^"']*gsap[^"']*["']/i.test(html);

if (hasGsapCdn) {
  print("GSAP CDN script found", PASS);
} else if (hasGsapModule) {
  print("GSAP ES module import found", PASS);
} else if (hasGsapInline) {
  print("GSAP inline usage detected", PASS, WARN);
} else {
  allPassed = false;
  print(
    "GSAP not found",
    FAIL,
    "Expected <script src='...gsap...'> or gsap.*() calls"
  );
}

// ─── Check 4: Local images exist on disk ─────────────────────────────────────

printHeader("Image References");

const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
const bgImageRegex =
  /background(?:-image)?\s*:\s*url\(["']?([^"')]+)["']?\)/gi;

const imageRefs = [];
let match;

while ((match = imgSrcRegex.exec(html)) !== null) {
  imageRefs.push(match[1]);
}
while ((match = bgImageRegex.exec(html)) !== null) {
  imageRefs.push(match[1]);
}

const localImages = imageRefs.filter(
  (src) =>
    !src.startsWith("data:") &&
    !src.startsWith("http://") &&
    !src.startsWith("https://") &&
    !src.startsWith("//") &&
    !src.startsWith("${") &&
    !src.startsWith("{{")
);

if (localImages.length === 0) {
  print(
    "No local image references found",
    PASS,
    imageRefs.length > 0
      ? `${imageRefs.length} remote/data-URI image(s) skipped`
      : "no images in file"
  );
} else {
  let missingCount = 0;
  for (const imgSrc of localImages) {
    const absPath = resolve(fileDir, imgSrc);
    if (!existsSync(absPath)) {
      missingCount++;
      print(`Image not found: ${imgSrc}`, FAIL);
    }
  }
  if (missingCount === 0) {
    print(`All ${localImages.length} local image(s) exist on disk`, PASS);
  } else {
    allPassed = false;
    print(
      `${missingCount} of ${localImages.length} local image(s) missing`,
      FAIL
    );
  }
}

// ─── Check 5: Slide count ───────────────────────────────────────────────────

printHeader("Slide Count");

// Match sections with class="slide" or data-slide attribute
const slideRegex =
  /<section[^>]*class=["'][^"']*slide[^"']*["'][^>]*>/gi;
const slides = html.match(slideRegex) || [];

const slideCount = slides.length;
const MIN_SLIDES = 3;
const MAX_SLIDES = 50;

if (slideCount >= MIN_SLIDES && slideCount <= MAX_SLIDES) {
  print(`Slide count: ${slideCount}`, PASS, `${MIN_SLIDES}-${MAX_SLIDES} required`);
} else if (slideCount === 0) {
  allPassed = false;
  print(
    "No slides found",
    FAIL,
    "Expected <section class='slide ...'> elements"
  );
} else {
  allPassed = false;
  print(
    `Slide count: ${slideCount}`,
    FAIL,
    `Must be between ${MIN_SLIDES} and ${MAX_SLIDES}`
  );
}

// ─── Check 6: Each slide has content ────────────────────────────────────────

printHeader("Slide Content");

// Split by slide section tags to check content
const slideSplitRegex =
  /(<section[^>]*class=["'][^"']*slide[^"']*["'][^>]*>)([\s\S]*?)(<\/section>)/gi;

let emptySlides = [];
let slideIndex = 0;

while ((match = slideSplitRegex.exec(html)) !== null) {
  slideIndex++;
  const innerHtml = match[2];

  // Strip HTML tags and check for meaningful text
  const textContent = innerHtml
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-zA-Z]+;/g, "")
    .replace(/&#\d+;/g, "")
    .trim();

  // Check for at least some text or an image
  const hasImage = /<img[\s\S]+?src=/i.test(innerHtml);
  const hasChart =
    /canvas|chart|d3|echart|highchart/i.test(innerHtml);
  const hasText = textContent.length >= 5;

  if (!hasText && !hasImage && !hasChart) {
    emptySlides.push(slideIndex);
  }
}

if (emptySlides.length === 0 && slideIndex > 0) {
  print(`All ${slideIndex} slide(s) have content`, PASS);
} else if (slideIndex === 0) {
  // Already reported in slide count check
  print("Skipped (no slides detected)", WARN);
} else {
  allPassed = false;
  print(
    `${emptySlides.length} empty slide(s)`,
    FAIL,
    `Slide #${emptySlides.join(", #")} missing text/images`
  );
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log("\n" + "─".repeat(50));
if (allPassed) {
  console.log(
    `${COLORS.bold}${COLORS.green}All checks passed.${COLORS.reset}\n`
  );
  process.exit(0);
} else {
  console.log(
    `${COLORS.bold}${COLORS.red}Validation failed.${COLORS.reset}\n`
  );
  process.exit(1);
}
