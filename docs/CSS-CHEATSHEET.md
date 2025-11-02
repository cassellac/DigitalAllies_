# Digital Allies CSS Cheat Sheet

Quick reference guide for CSS classes, variables, and styling rules used in the Digital Allies website.

---

## 📋 Table of Contents
- [CSS Variables (Custom Properties)](#css-variables-custom-properties)
- [Color Classes](#color-classes)
- [Typography](#typography)
- [Buttons](#buttons)
- [Cards](#cards)
- [Layout Components](#layout-components)
- [Utility Classes](#utility-classes)
- [Animations](#animations)
- [Form Elements](#form-elements)
- [Icons](#icons)

---

## CSS Variables (Custom Properties)

> **Note:** The site uses both `global.css` and `tokens.css`. Variables from both files are listed below.

### Brand Colors (from tokens.css)
```css
--blue: #2563EB              /* Primary Blue */
--blue-light: #60A5FA
--green: #059669             /* Ally Green */
--green-light: #34D399
--purple: #7C3AED            /* Accent Purple */
--purple-light: #C4B5FD
```

### Brand Colors (from global.css)
```css
--da-blue-50: #E0F2FE
--da-blue-100: #DBEAFE
--da-blue-500: #2563EB (Primary Blue)
--da-blue-600: #1D4ED8
--da-blue-light: #60A5FA
--da-green-100: #D1FAE5
--da-green-500: #059669
--da-green-light: #34D399
--da-purple-500: #7C3AED
--da-purple-light: #C4B5FD
--da-red-500: #EF4444
--da-gray-500: #6B7280
--da-gray-700: #414243
--da-black: #000000
--da-white: #ffffff
```

### Neutral Palette (from tokens.css)
```css
--neutral-900: #111827
--neutral-800: #1F2937
--neutral-700: #374151
--neutral-600: #4B5563
--neutral-500: #6B7280
--neutral-300: #D1D5DB
--neutral-100: #F3F4F6
--white: #FFFFFF
```

### Utility Colors (from tokens.css)
```css
--error: #DC2626
--warning: #F59E0B
--success: #10B981
```

### Semantic Colors (from global.css)
```css
--color-bg: var(--da-white)
--color-text: #111827
--color-text-muted: #4B5563
--color-link: var(--da-blue-500)
--color-link-hover: var(--da-blue-600)
--color-link-visited: #1C3FAA
--color-border: #E5E7EB
```

### Typography Variables
```css
/* From global.css */
--font-primary: 'Segoe UI', system-ui, sans-serif
--font-secondary: 'Source Sans Pro', system-ui, sans-serif

/* From tokens.css */
--font-body: "Source Sans Pro", "Segoe UI", system-ui, sans-serif
--font-heading: "Segoe UI", "Source Sans Pro", sans-serif
--text-color: var(--neutral-900)
--text-light: var(--neutral-700)
```

### Layout Variables
```css
--header-height: 4.5rem
```

### Border Radius Variables
```css
--border-radius-sm: 0.375rem  /* 6px */
--border-radius-md: 0.5rem    /* 8px */
--border-radius-lg: 0.75rem   /* 12px */
--border-radius-xl: 1rem      /* 16px */
```

### Shadow Variables
```css
--shadow-soft: 0 2px 6px rgba(0, 0, 0, 0.05)
--shadow-button: 0 3px 8px rgba(0, 0, 0, 0.08)
--shadow-hover: 0 6px 12px rgba(0, 0, 0, 0.12)
--focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.35)
```

---

## Color Classes

### Text Gradient
```html
<span class="text-gradient">Gradient Text</span>
```
**Effect:** Blue to green gradient text

### Gradient Background
```html
<div class="gradient-bg">Content</div>
```
**Effect:** Light blue background (static)

---

## Typography

### Prose Classes (for article/knowledge base content)
```html
<article class="prose">
  <h1>Main Title</h1>      <!-- 2.25rem, bold -->
  <h2>Section Title</h2>   <!-- 1.5rem, bold -->
  <h3>Subsection</h3>      <!-- 1.25rem, bold -->
  <p>Paragraph text</p>    <!-- Regular, muted color -->
</article>
```

**Font Sizes:**
- `h1`: 2.25rem (36px)
- `h2`: 1.5rem (24px)
- `h3`: 1.25rem (20px)

---

## Buttons

### Button Base Class
```html
<button class="btn">Button</button>
```
**Note:** There are two button systems - `.btn` classes and `.btn-primary`/`.btn-secondary` classes.

### Button Variants (Modern System)

#### Primary Button (tokens.css)
```html
<button class="btn-primary">Primary Action</button>
```
**Style:** Blue background, white text, rounded, shadow, hover lift

#### Secondary Button (tokens.css)
```html
<button class="btn-secondary">Secondary Action</button>
```
**Style:** White background, blue border, blue text, hover transforms

### Button Variants (Global System)

#### Primary Button (global.css)
```html
<button class="btn btn--primary">Primary Action</button>
```
**Style:** Blue background, white text, shadow, hover lift

#### Secondary Button (global.css)
```html
<button class="btn btn--secondary">Secondary Action</button>
```
**Style:** White background, blue border, blue text

#### Success Button
```html
<button class="btn btn--success">Success</button>
```
**Style:** Green background, white text

#### Danger Button
```html
<button class="btn btn--danger">Delete</button>
```
**Style:** Red background, white text

#### Outline Button
```html
<button class="btn btn--outline">Outline</button>
```
**Style:** Transparent background, blue border and text

#### Quiet Button
```html
<button class="btn btn--quiet">Text Link</button>
```
**Style:** Transparent, blue text, no border, underlines on hover

---

## Cards

### Base Card
```html
<div class="card">
  Card content
</div>
```
**Style:** White background, border, rounded corners, soft shadow

### Card Border Variants (Outline)
```html
<div class="card card--outline-blue">Blue border</div>
<div class="card card--outline-green">Green border</div>
<div class="card card--outline-red">Red border</div>
<div class="card card--outline-purple">Purple border</div>
```

### Featured Card
```html
<div class="card card--featured">
  Featured content
</div>
```
**Style:** Light blue gradient background, blue border

### Rotational Card Borders
Cards automatically rotate through 3 colors when used in sets:
- **1st, 4th, 7th...** → Blue border
- **2nd, 5th, 8th...** → Green border
- **3rd, 6th, 9th...** → Purple border

---

## Layout Components

### Header
```html
<header class="site-header" role="banner">
  <div class="header-content">
    <!-- Header content -->
  </div>
</header>
```
**Style:** Gradient background with dot pattern

### Logo
```html
<a href="/" class="logo">
  <div class="logo-icon"></div>
  <span>Digital Allies</span>
</a>
```
**Style:** Animated brand pulse effect on icon

### Footer
```html
<footer>
  Footer content
</footer>
```
**Style:** Dark gradient background

### Skip Link (Accessibility)
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
**Style:** Hidden until focused, appears at top when tabbed

---

## Utility Classes

### Hover Effects

#### Gradient Shadow
```html
<div class="gradient-shadow">Content</div>
```
**Effect:** Subtle blue shadow

#### Hover Lift
```html
<div class="hover-lift">Content</div>
```
**Effect:** Lifts up 2px on hover with shadow

### Fade In Animations
```html
<div class="fade-in">Fades in from bottom</div>
<div class="fade-in fade-in-delay-1">Delayed 0.2s</div>
<div class="fade-in fade-in-delay-2">Delayed 0.4s</div>
<div class="fade-in fade-in-delay-3">Delayed 0.6s</div>
```

### Floating Animation
```html
<div class="floating">Gently floats up and down</div>
```
**Effect:** 6-second gentle vertical movement

---

## Animations

### Available Keyframe Animations

#### Brand Pulse
```css
@keyframes brand-pulse
```
**Duration:** 3s infinite
**Effect:** Scales between 1 and 1.15, opacity pulses

#### Fade In Up
```css
@keyframes fadeInUp
```
**Duration:** 0.8s
**Effect:** Fades in while moving up 20px

#### Float
```css
@keyframes float
```
**Duration:** 6s infinite
**Effect:** Gentle vertical floating motion

---

## Form Elements

### Form Error Messages
```html
<span class="form-error">Error message</span>
<span class="form-error active">Visible error</span>
```
**Behavior:** Hidden by default, shown when `.active` class is added
**Style:** Red text

### Form Validation Attributes
Use these data attributes for JavaScript validation:
```html
<form data-validate="contact">
  <input 
    data-validate-field
    data-error-required="This field is required"
    data-error-invalid="Invalid format"
  >
  <span id="fieldname-error" class="form-error"></span>
</form>
```

---

## Icons

### Icon Size
```html
<svg class="icon">...</svg>
```
**Size:** 28x28px

### Icon Colors
```html
<svg class="icon icon--blue">...</svg>
<svg class="icon icon--green">...</svg>
<svg class="icon icon--purple">...</svg>
<svg class="icon icon--red">...</svg>
```

### Icon Backgrounds (Rotational)
```html
<div class="icon-bg">
  <svg class="icon">...</svg>
</div>
```
**Effect:** Icons automatically rotate through 3 background colors in sets:
- **1st, 4th, 7th...** → Light blue background
- **2nd, 5th, 8th...** → Light green background
- **3rd, 6th, 9th...** → Light purple background

**Size:** 4rem x 4rem (64x64px)

---

## JavaScript-Driven Features

### Language Toggle
**IDs Used:**
- `lang-en` - English button
- `lang-es` - Spanish button

**Function:**
```javascript
toggleLanguage('en') // or 'es'
```

**HTML Attributes:**
```html
<span data-en="English text" data-es="Spanish text">English text</span>
```

### Mobile Menu
**IDs Used:**
- `mobile-menu` - The mobile navigation container

**Function:**
```javascript
toggleMobileMenu(buttonElement)
```

**Attributes:**
- `aria-expanded` - Set automatically
- `aria-controls="mobile-menu"` - Required on toggle button

### Form Validation
**Attributes:**
```html
<form data-validate="contact">
  <input 
    data-validate-field
    data-error-required="Custom required message"
    data-error-invalid="Custom invalid message"
    id="field-name"
    required
  >
  <span id="field-name-error" class="form-error"></span>
</form>
```

**Validation runs on:**
- Blur (when field loses focus)
- Input (after first error shown)
- Submit (validates all fields)

### Blog Dynamic Loading
**IDs Used:**
- `blog-posts-grid` - Container for blog posts
- `blog-search` - Search container (auto-created)
- `blog-search-input` - Search input field
- `blog-filters` - Category filter container (auto-created)
- `blog-stats` - Stats display element
- `load-more-btn` - Load more button (auto-created)

**Classes Used:**
- `.category-filter` - Category filter buttons
- `.gradient-shadow` - Card shadow effect
- `.line-clamp-2` - Truncate to 2 lines
- `.line-clamp-3` - Truncate to 3 lines

**Data Attributes:**
- `data-post-slug` - Track post clicks
- `data-category` - Filter by category

### Knowledge Base
**IDs Used:**
- `category-pills` - Category filter container
- `articles-grid` - Articles display grid
- `no-results` - Empty state message
- `search-input` - Search input field
- `breadcrumb` - Breadcrumb navigation
- `breadcrumb-category` - Category in breadcrumb
- `breadcrumb-separator` - Separator in breadcrumb
- `breadcrumb-article` - Article name in breadcrumb
- `main-view` - Main articles view
- `article-view` - Single article view
- `article-content` - Article content container
- `chatbot-toggle` - Chatbot toggle button
- `chatbot-window` - Chatbot window
- `chatbot-icon-open` - Open icon
- `chatbot-icon-close` - Close icon
- `chat-messages` - Messages container
- `chat-input` - Chat input field
- `chat-send` - Send button
- `typing-indicator` - Typing indicator (auto-created)

**Functions:**
```javascript
filterByCategory(category)  // Filter articles
showArticle(articleId)      // Show single article
resetView()                 // Return to main view
```

### Floating Shapes
**Container Attribute:**
```html
<div id="unique-id" data-floating-shapes>
  <div class="floating-shape" data-speed="0.5" data-rotation="1">
    <svg>...</svg>
  </div>
</div>
```

**Data Attributes:**
- `data-floating-shapes` - Marks container for initialization
- `data-speed` - Parallax speed (default: 0.5)
- `data-rotation` - Rotation multiplier (default: 0, set to enable rotation)

**Auto-initializes on DOMContentLoaded**

---

## Special Components

### Sticky CTA Button
```html
<a href="/contact.html" class="sticky-cta">
  Get Started
</a>
```
**Position:** Fixed to bottom-right corner
**Style:** Blue gradient, rounded pill, floating shadow

### Floating Shapes Container
```html
<div class="floating-shapes-container">
  <div class="floating-shape" style="width: 80px; height: 80px; top: 10%; left: 5%;">
    <svg>...</svg>
  </div>
</div>
```
**Usage:** Background decorative shapes with parallax effect

---

## Quick Reference: Common Patterns

### Hero Section Pattern
```html
<section class="gradient-bg relative">
  <div class="floating-shapes-container">
    <!-- Decorative shapes -->
  </div>
  <div class="container mx-auto px-4 py-20">
    <h1 class="text-gradient fade-in">Title</h1>
    <p class="fade-in fade-in-delay-1">Description</p>
    <a href="#" class="btn btn--primary fade-in fade-in-delay-2">CTA</a>
  </div>
</section>
```

### Card Grid Pattern
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="card hover-lift">Card 1 - Blue border</div>
  <div class="card hover-lift">Card 2 - Green border</div>
  <div class="card hover-lift">Card 3 - Purple border</div>
</div>
```

### Two-Column CTA Pattern
```html
<div class="flex gap-4">
  <a href="#" class="btn btn--primary">Primary Action</a>
  <a href="#" class="btn btn--secondary">Secondary Action</a>
</div>
```

---

## Accessibility Features

### Focus States
All interactive elements have custom focus rings:
```css
:focus-visible {
  box-shadow: var(--focus-ring);
}
```

### Reduced Motion
The stylesheet respects user motion preferences:
```css
@media (prefers-reduced-motion: reduce)
```
All animations are disabled for users who prefer reduced motion.

### Screen Reader Classes
```html
<span class="sr-only">Screen reader only text</span>
```

---

## Important IDs Reference

### Global Navigation
- `lang-en` - English language button
- `lang-es` - Spanish language button
- `mobile-menu` - Mobile navigation menu

### Blog System
- `blog-posts-grid` - Main blog grid container
- `blog-search` - Search container
- `blog-search-input` - Search input
- `blog-filters` - Category filters
- `blog-stats` - Statistics display
- `load-more-btn` - Pagination button

### Knowledge Base
- `category-pills` - KB category filters
- `articles-grid` - KB articles grid
- `search-input` - KB search field
- `main-view` - KB main view
- `article-view` - KB article detail view
- `chatbot-toggle` - Chatbot button
- `chatbot-window` - Chatbot interface

### Form Elements
- Use pattern: `{field-name}-error` for error messages
- Example: `email-error`, `name-error`, `phone-error`

---

## Data Attributes Reference

### Form Validation
- `data-validate="contact"` - Enable validation on form
- `data-validate-field` - Mark field for validation
- `data-error-required` - Custom required message
- `data-error-invalid` - Custom invalid message

### Language Toggle
- `data-en="English text"` - English translation
- `data-es="Spanish text"` - Spanish translation

### Floating Shapes
- `data-floating-shapes` - Enable floating shapes on container
- `data-speed="0.5"` - Parallax speed multiplier
- `data-rotation="1"` - Rotation effect multiplier

### Blog System
- `data-post-slug` - Track post clicks
- `data-category` - Filter by category

---

## Tips for Dreamweaver Live View

1. **Two CSS Files:** 
   - `global.css` - Main styles and components
   - `tokens.css` - Design tokens and simplified button classes
   
2. **Use Tailwind Classes:** This site uses Tailwind CSS (configured in `global.js`)

3. **Combine Classes:** Mix custom classes with Tailwind utilities
   ```html
   <div class="card p-6 mb-8 md:mb-12">...</div>
   ```

4. **Check Rotation:** Remember card borders and icon backgrounds rotate in sets of 3

5. **Test Hover States:** Hover effects are important for UX

6. **Validate Forms:** Use `data-validate="contact"` for form validation

7. **Language Support:** Add `data-en` and `data-es` attributes for bilingual content

8. **JavaScript Features:** Many features auto-initialize on page load:
   - Form validation
   - Floating shapes
   - Blog dynamic loading
   - Knowledge base search
   - Language toggle

9. **Responsive Design:** Most components are mobile-first

10. **Error Messages:** Create error spans with ID pattern `{fieldname}-error`

---

## Color Palette Quick Reference

| Color Name | Hex Code | Variable |
|------------|----------|----------|
| Primary Blue | `#2563EB` | `--da-blue-500` |
| Light Blue | `#E0F2FE` | `--da-blue-50` |
| Pale Blue | `#DBEAFE` | `--da-blue-100` |
| Success Green | `#059669` | `--da-green-500` |
| Light Green | `#D1FAE5` | `--da-green-100` |
| Purple | `#7C3AED` | `--da-purple-500` |
| Danger Red | `#EF4444` | `--da-red-500` |
| Dark Gray | `#414243` | `--da-gray-700` |

---

## Key Files Overview

### CSS Files
- `/assets/global.css` - Main stylesheet with all components
- `/assets/tokens.css` - Design tokens and utility classes

### JavaScript Files
- `/assets/js/global.js` - Core functionality (language toggle, mobile menu, form validation)
- `/assets/js/floating-shapes.js` - Parallax background shapes
- `/assets/js/blog-dynamic-load.js` - Dynamic blog post loading
- `/assets/js/knowledge-base.js` - Knowledge base and chatbot

### Configuration
- Tailwind CSS is configured inline in each HTML file or via `global.js`
- All JS features auto-initialize on `DOMContentLoaded`

---

## Common Pitfalls to Avoid

1. ❌ **Don't forget error message elements**
   ```html
   <input id="email" data-validate-field required>
   <span id="email-error" class="form-error"></span> <!-- Required! -->
   ```

2. ❌ **Don't use `btn` and `btn--primary` with `btn-primary`**
   - Use either `.btn.btn--primary` OR `.btn-primary`, not both

3. ❌ **Don't forget mobile menu toggle button attributes**
   ```html
   <button onclick="toggleMobileMenu(this)" aria-expanded="false" aria-controls="mobile-menu">
   ```

4. ❌ **Don't forget floating shapes container ID**
   ```html
   <div id="hero-shapes" data-floating-shapes> <!-- ID required! -->
   ```

5. ✅ **Do include both language attributes**
   ```html
   <span data-en="Home" data-es="Inicio">Home</span>
   ```

---

**Last Updated:** November 2, 2025  
**Version:** 2.0  
**For:** Adobe Dreamweaver Live View Editing

**Files Documented:**
- `assets/global.css`
- `assets/tokens.css`
- `assets/js/global.js`
- `assets/js/floating-shapes.js`
- `assets/js/blog-dynamic-load.js`
- `assets/js/knowledge-base.js`
