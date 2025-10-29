# Archived Design Assets

This directory contains the legacy visual design system that was used before the brand style merge on 2025-10-29.

## Purpose

Preserve all legacy visual systems (e.g., animated gradient background, floating shapes, gradient shadow utilities, old color tokens) in a non-executing area of the repo so they're easy to restore or reference later.

## Contents

### CSS Assets (`/css/`)
- **animated-gradient.css** - Old gradient background with keyframes
- **gradient-shadows.css** - Gradient glow and "card--shadow-*" utilities
- **legacy-color-tokens.css** - Prior color variables to preserve history

### JavaScript Assets (`/js/`)
- **floating-shapes.js** - Parallax/shape motion tied to gradient aesthetic

### Documentation (`/docs/`)
- **README-archived-designs.md** - This file

### HTML Snippets (`/snippets/`)
- **html-hero-gradient.html** - The old hero markup if distinct

## Restoration Guide

To restore the animated gradient background system:

1. **CSS**: Re-link archived CSS files or copy rules back into `assets/global.css`
   ```html
   <link rel="stylesheet" href="/archived designs/css/animated-gradient.css">
   <link rel="stylesheet" href="/archived designs/css/gradient-shadows.css">
   ```

2. **Remove overrides**: Remove body/background overrides in the new tokens section of `assets/global.css`:
   ```css
   /* Remove these lines: */
   body, .site-wrap, .hero, .animated-gradient {
     background: var(--color-bg) !important;
   }
   ```

3. **JavaScript**: Re-add script tag or import to bundle
   ```html
   <script src="/archived designs/js/floating-shapes.js" defer></script>
   ```
   Or restore the original `assets/js/floating-shapes.js` content

4. **HTML**: Add `.floating-shapes-container` to target sections with the floating shape elements

5. **Verify**: Confirm `prefers-reduced-motion` guards remain intact

## Archived On

2025-10-29

## Reason

Brand merge — gradients removed for current pass to align with brand site flat background aesthetic
