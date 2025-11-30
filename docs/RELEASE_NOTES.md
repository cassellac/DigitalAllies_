# Release Notes — v1.0.0

Release: v1.0.0
Date: 2025-11-30

Summary
- Retired the legacy floating SVG shapes and parallax script.
- Added CSS-driven decorative shapes and a lightweight canvas particle background.
- Particles are implemented in `assets/js/particles.js`, lazy-loaded by `assets/js/global.js` when a page contains a `data-bg-shapes` container.
- Per-page controls: `data-particles`, `data-particle-color`, `data-particle-influence`, `data-particle-burst`.
- Accessibility: respects `prefers-reduced-motion`; pointer interactions are non-essential and non-blocking.

How to preview locally
1. From the repo root run a static server (examples):
   - `python3 -m http.server 5000`
   - or `npx serve .`
2. Open `http://localhost:5000` and navigate to `index`, `about`, `services`, `contact` pages.

Notes for maintainers
- To change default particle color use the CSS variable `--particle-color` or set `data-particle-color` on the page container.
- To disable particles on a page set `data-particles="off"` on the `data-bg-shapes` container.
- The module exposes `window.initParticleBackground(options)` and returns a `{ destroy }` handle; global helper sets `window.__particleHandle`.
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
