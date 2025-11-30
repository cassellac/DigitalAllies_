# Release Notes

## v1.0.0 — Shapes retired & particle background

Summary:
- Retired the old decorative SVG shape assets and the `floating-shapes.js` parallax system.
- Added CSS-driven decorative shapes and a simple `initBackgroundShapes()` fallback for graceful degradation.
- Introduced a lightweight, canvas-based particle background (`assets/js/particles.js`) that is lazy-loaded from `assets/js/global.js` when a page includes a `data-bg-shapes` container.
- Particles support per-page controls via `data-particles`, `data-particle-color`, `data-particle-influence`, and `data-particle-burst`.
- Pointer interactions: hover scaling and click/tap bursts; animations respect `prefers-reduced-motion`.

How to preview locally:
1. Start a local static server from the repo root (Python example):

```bash
python3 -m http.server 5000
# open http://localhost:5000 in a browser
```

2. Open the main pages in a browser (JS required): `index.html`, `about.html`, `services.html`, `contact.html`.
   - Particles will be lazy-loaded automatically when a `data-bg-shapes` container is present.
   - Control density with `data-particles` (off|low|med|high or numeric scale) and color with `data-particle-color` (e.g. `var(--purple)`).

Maintenance notes:
- The retired SVG files were removed and relevant sitemap entries updated. If you want them restored for any reason, revert the commit that removed `assets/shapes/`.
- The particle module exposes a destroy function via the returned handle from `initParticleBackground` (also exposed on `window.__particleHandle`) for testing/cleanup.
