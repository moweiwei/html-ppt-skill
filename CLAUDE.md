# HTML PPT Skill

## Project Type
Claude Code Skill - generates single-file HTML horizontal-scrolling PPT presentations.

## Key Files
- SKILL.md - Skill entry point and workflow
- assets/base.html - Base HTML template
- assets/edit-mode.js - Inline editing script
- references/styles/*.css - 7 CSS themes
- references/layouts.md - 22+ layout components
- references/components.md - Shared components
- references/checklist.md - Quality checklist
- scripts/server.js - Edit server
- scripts/validate-deck.mjs - Validation script

## Development
No build step - template-based skill. Test by generating PPT and opening in browser.
Validate: node scripts/validate-deck.mjs path/to/index.html

## Conventions
- Single-file HTML output (no external deps except CDN)
- CSS custom properties (--bg, --text, --accent)
- Semantic class names (slide-hero, slide-split, slide-grid)
- Images: images/{page}-{semantic}.{ext}

## Quality Gates
Before commit: all referenced files exist, CSS themes complete, validate-deck passes on demo.
