<!--
Guidance for AI coding agents working on the Digital Allies static site.
Keep this file short, specific, and actionable — prefer code pointers and exact filenames.
-->
# Copilot / Agent Instructions — DigitalAllies_

Summary
- Small static site with a lightweight Node-based content toolchain. Primary work is content generation and small UI changes. Prioritize accessibility and preserving generated content patterns.

Quick setup
- Install deps: `npm install` (Node.js 16+).
- Helpful commands:
  - `npm run generate-post -- --title="My Title"` — scaffold a markdown post (`scripts/generate-post.js`).
  - `npm run sync-cms` — convert `content/*.md` into generated HTML under `posts/` and update `content/blog-index.json` (`scripts/sync-pages-cms-content.js`).
  - Run a local server from the repo root: `python -m http.server 8000` or `npx serve .` and view `http://localhost:8000`.

Key files & patterns
- Content generation: `content/*.md` (YAML front-matter) → `scripts/sync-pages-cms-content.js` uses `gray-matter`, `marked`, `jsdom`, and `dompurify`.
- Post scaffolding: `scripts/generate-post.js` (calls `npm run generate-post`).
- Global UI: `assets/global.css` and `assets/js/global.js` contain shared styles and JS hooks. Prefer updating these for site-wide UI changes.
  - Floating shapes (being retired): `assets/js/floating-shapes.js` and `assets/shapes/*` were the parallax SVG system. Pages now use `data-bg-shapes` (replacement for `data-floating-shapes`) and a `.floating-shapes-container` with `data-shape` attributes on `.floating-shape` elements (see `index.html`, `about.html`, `services.html`, `contact.html`).

What to do when editing UI (shapes retirement example)
- Goal: retire `assets/shapes` + `assets/js/floating-shapes.js` and move background shapes to `assets/global.css` and `assets/js/global.js`.
- Steps an agent should follow:
  1. Search for `data-bg-shapes` (or legacy `data-floating-shapes`) to find all containers (usually `index.html`, `about.html`, `services.html`, `contact.html`).
  2. Remove `<img src="assets/shapes/...">` children from the `.floating-shapes-container`. Leave the container element to be styled or replace the `data-*` hook (example: `data-bg-shapes`).
  3. Remove the per-page `<script src="assets/js/floating-shapes.js"></script>` include and instead add necessary initialization calls to `assets/js/global.js` (keep progressive enhancement — if JS fails, page must be visually acceptable).
  4. Add CSS-only fallbacks in `assets/global.css` (pseudo-elements, CSS variables, and `background-image`/`mask` where appropriate). Keep contrast and accessibility in mind.
  5. Run `npx serve .` (or `python -m http.server`) and manually verify pages (mobile and keyboard navigation).
  6. If removing shape files, update `sitemaps/*` and any references in `docs/` or `CLEANUP-*` notes.

Conventions for agents
- Use `data-` attributes for JS hooks (do not rely on class names alone).
- Preserve accessibility: decorative visuals must be `aria-hidden`/`role="presentation"` and images without semantic meaning should remain non-focusable.
- When changing content generation code, update `content/blog-index.json` by running `npm run sync-cms` and verify `posts/` output.
- Keep changes small and targeted. If modifying generated HTML under `posts/`, prefer to change generator templates in `scripts/templates/` rather than editing generated files directly.

Debugging & tests
- No automated unit tests. Use local server previews and manual checks with Lighthouse/axe.
- Console debugging: open browser devtools and check for errors after `npm run sync-cms` and page reload.

Housekeeping notes
- Don't delete `scripts/*` or `assets/global.css` — they are central to workflow.
- If retiring `assets/shapes`, keep a commit that removes them and updates the sitemap; list removed filenames in the PR description.

Questions for reviewers
- If you intend me to perform the shapes retirement now, confirm whether you want the SVG files physically deleted from `assets/shapes/` and whether I should update `sitemaps/*` automatically.

---
Last-updated: automated by agent — review after major UI changes.
