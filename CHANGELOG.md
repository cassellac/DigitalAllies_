# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- Retire floating SVG shapes and per-page `floating-shapes.js` parallax.
- Add CSS-driven decorative shapes and `initBackgroundShapes()` as a lightweight fallback.
- Implement canvas-based particle background (`assets/js/particles.js`) with:
  - Lazy-loading from `assets/js/global.js` when a `data-bg-shapes` container exists.
  - Per-page controls via `data-particles`, `data-particle-color`, `data-particle-influence`, and `data-particle-burst`.
  - Pointer interactions: hover scaling and click/tap burst (respects `prefers-reduced-motion`).
  - Tuned defaults for subtle purple particles on light backgrounds (`--purple: #7C3AED`).

## 0.1.0 - Initial release
- Initial site content and templates (static HTML pages, global CSS, and content scripts).
