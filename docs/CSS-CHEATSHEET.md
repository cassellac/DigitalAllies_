# Digital Allies CSS Cheat Sheet# Digital Allies CSS Cheat Sheet



**ONE unified token-based design system** from brand.digitalallies.netQuick reference for the **unified token-based design system** from brand.digitalallies.net



All styles use design tokens defined in `/assets/css/global.css`> **🎯 ONE SYSTEM:** All styles use design tokens from `/assets/css/global.css` based on brand.digitalallies.net



------



## 🎨 Design Tokens Reference## 📋 Table of Contents

- [Design Tokens (CSS Variables)](#design-tokens-css-variables)

### Brand Colors- [Buttons](#buttons)

- [Cards](#cards)

```css- [Typography](#typography)

/* Primary Palette */- [Layout Components](#layout-components)

--blue: #2563EB          /* Primary Blue */- [Utility Classes](#utility-classes)

--blue-light: #60A5FA    /* Light Blue */- [Form Elements](#form-elements)

--blue-dark: #1D4ED8     /* Dark Blue */- [JavaScript Features](#javascript-features)

--green: #059669         /* Ally Green */

--green-light: #34D399   /* Light Green */---

--purple: #7C3AED        /* Accent Purple */

--purple-light: #C4B5FD  /* Light Purple */## Design Tokens (CSS Variables)



/* Neutrals */All design tokens are defined in `/assets/css/global.css` and sourced from brand.digitalallies.net

--neutral-900: #111827   /* Darkest - headings */

--neutral-800: #1F2937### Brand Colors (from tokens.css)

--neutral-700: #374151   /* Secondary text */```css

--neutral-600: #4B5563   /* Muted text */--blue: #2563EB              /* Primary Blue */

--neutral-500: #6B7280--blue-light: #60A5FA

--neutral-300: #D1D5DB   /* Light borders */--green: #059669             /* Ally Green */

--neutral-100: #F3F4F6   /* Subtle backgrounds */--green-light: #34D399

--neutral-50: #F9FAFB    /* Lightest */--purple: #7C3AED            /* Accent Purple */

--purple-light: #C4B5FD

/* Utility Colors */```

--error: #DC2626         /* Red for errors */

--warning: #F59E0B       /* Orange for warnings */### Brand Colors (from global.css)

--success: #10B981       /* Green for success */```css

--da-blue-50: #E0F2FE

/* Semantic Tokens */--da-blue-100: #DBEAFE

--text-primary: var(--neutral-900)--da-blue-500: #2563EB (Primary Blue)

--text-secondary: var(--neutral-700)--da-blue-600: #1D4ED8

--text-muted: var(--neutral-600)--da-blue-light: #60A5FA

--link-color: var(--blue)--da-green-100: #D1FAE5

--link-hover: var(--blue-dark)--da-green-500: #059669

--bg-primary: var(--white)--da-green-light: #34D399

--border-color: #E5E7EB--da-purple-500: #7C3AED

```--da-purple-light: #C4B5FD

--da-red-500: #EF4444

### Typography--da-gray-500: #6B7280

--da-gray-700: #414243

```css--da-black: #000000

--font-body: "Source Sans Pro", "Segoe UI", system-ui, sans-serif--da-white: #ffffff

--font-heading: "Segoe UI", "Source Sans Pro", sans-serif```

```

### Neutral Palette (from tokens.css)

### Border Radius```css

--neutral-900: #111827

```css--neutral-800: #1F2937

--border-radius-sm: 0.375rem   /* 6px */--neutral-700: #374151

--border-radius-md: 0.5rem     /* 8px */--neutral-600: #4B5563

--border-radius-lg: 0.75rem    /* 12px */--neutral-500: #6B7280

--border-radius-xl: 1rem       /* 16px */--neutral-300: #D1D5DB

--border-radius-full: 9999px   /* Pills/circles */--neutral-100: #F3F4F6

```--white: #FFFFFF

```

### Shadows

### Utility Colors (from tokens.css)

```css```css

--shadow-soft: 0 2px 6px rgba(0, 0, 0, 0.05)--error: #DC2626

--shadow-button: 0 3px 8px rgba(0, 0, 0, 0.08)--warning: #F59E0B

--shadow-hover: 0 6px 12px rgba(0, 0, 0, 0.12)--success: #10B981

--shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.35)```

```

### Semantic Colors (from global.css)

---```css

--color-bg: var(--da-white)

## 🔘 Buttons--color-text: #111827

--color-text-muted: #4B5563

All buttons use the **`.btn` base class** + a **modifier class**--color-link: var(--da-blue-500)

--color-link-hover: var(--da-blue-600)

### Primary Button (Blue)--color-link-visited: #1C3FAA

--color-border: #E5E7EB

```html```

<a href="#" class="btn btn--primary">Primary Action</a>

```### Typography Variables

```css

**Tokens used:**/* From global.css */

--font-primary: 'Segoe UI', system-ui, sans-serif

- Background: `--btn-primary-bg` (blue)--font-secondary: 'Source Sans Pro', system-ui, sans-serif

- Text: `--btn-primary-text` (white)

- Hover: `--btn-primary-hover` (light blue)/* From tokens.css */

--font-body: "Source Sans Pro", "Segoe UI", system-ui, sans-serif

### Secondary Button (Outline)--font-heading: "Segoe UI", "Source Sans Pro", sans-serif

--text-color: var(--neutral-900)

```html--text-light: var(--neutral-700)

<a href="#" class="btn btn--secondary">Secondary Action</a>```

```

### Layout Variables

**Tokens used:**```css

--header-height: 4.5rem

- Background: `--btn-secondary-bg` (white)```

- Text: `--btn-secondary-text` (blue)

- Border: `--btn-secondary-border` (blue)### Border Radius Variables

- Hover bg: `--btn-secondary-hover-bg` (light blue)```css

- Hover text: `--btn-secondary-hover-text` (white)--border-radius-sm: 0.375rem  /* 6px */

--border-radius-md: 0.5rem    /* 8px */

### Success Button (Green)--border-radius-lg: 0.75rem   /* 12px */

--border-radius-xl: 1rem      /* 16px */

```html```

<button class="btn btn--success">Save</button>

```### Shadow Variables

```css

**Tokens:** `--btn-success-bg`, `--btn-success-text`--shadow-soft: 0 2px 6px rgba(0, 0, 0, 0.05)

--shadow-button: 0 3px 8px rgba(0, 0, 0, 0.08)

### Danger Button (Red)--shadow-hover: 0 6px 12px rgba(0, 0, 0, 0.12)

--focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.35)

```html```

<button class="btn btn--danger">Delete</button>

```---



**Tokens:** `--btn-danger-bg`, `--btn-danger-text`## Color Classes



### Outline Button (Transparent)### Text Gradient

```html

```html<span class="text-gradient">Gradient Text</span>

<button class="btn btn--outline">Cancel</button>```

```**Effect:** Blue to green gradient text



**Tokens:** `--btn-outline-bg`, `--btn-outline-text`, `--btn-outline-border`, `--btn-outline-hover-bg`### Gradient Background

```html

### Quiet Button (Text-only)<div class="gradient-bg">Content</div>

```

```html**Effect:** Light blue background (static)

<button class="btn btn--quiet">Learn More</button>

```---



**Tokens:** `--btn-quiet-bg`, `--btn-quiet-text`## Typography



---### Prose Classes (for article/knowledge base content)

```html

## 🎴 Cards<article class="prose">

  <h1>Main Title</h1>      <!-- 2.25rem, bold -->

### Basic Card  <h2>Section Title</h2>   <!-- 1.5rem, bold -->

  <h3>Subsection</h3>      <!-- 1.25rem, bold -->

```html  <p>Paragraph text</p>    <!-- Regular, muted color -->

<div class="card"></article>

  Card content```

</div>

```**Font Sizes:**

- `h1`: 2.25rem (36px)

**Styling:**- `h2`: 1.5rem (24px)

- `h3`: 1.25rem (20px)

- Background: `--white`

- Border: `2px solid --border-color`---

- Border radius: `--border-radius-md`

- Shadow: `--shadow-soft`## Buttons

- Hover shadow: `--shadow-hover`

### Button Base Class

### Automatic Border Rotation```html

<button class="btn">Button</button>

Cards automatically rotate through 3 colors when used in sets:```

**Note:** There are two button systems - `.btn` classes and `.btn-primary`/`.btn-secondary` classes.

```html

<div class="card">Card 1 - Blue border</div>### Button Variants (Modern System)

<div class="card">Card 2 - Green border</div>

<div class="card">Card 3 - Purple border</div>#### Primary Button (tokens.css)

<div class="card">Card 4 - Blue border</div>```html

```<button class="btn-primary">Primary Action</button>

```

**Tokens:** `--card-border-1`, `--card-border-2`, `--card-border-3`**Style:** Blue background, white text, rounded, shadow, hover lift



### Card Variants#### Secondary Button (tokens.css)

```html

```html<button class="btn-secondary">Secondary Action</button>

<!-- Blue border -->```

<div class="card card--outline-blue">Blue</div>**Style:** White background, blue border, blue text, hover transforms



<!-- Green border -->### Button Variants (Global System)

<div class="card card--outline-green">Green</div>

#### Primary Button (global.css)

<!-- Red border -->```html

<div class="card card--outline-red">Red</div><button class="btn btn--primary">Primary Action</button>

```

<!-- Purple border -->**Style:** Blue background, white text, shadow, hover lift

<div class="card card--outline-purple">Purple</div>

#### Secondary Button (global.css)

<!-- Featured (gradient background) -->```html

<div class="card card--featured">Featured</div><button class="btn btn--secondary">Secondary Action</button>

``````

**Style:** White background, blue border, blue text

---

#### Success Button

## 📝 Typography```html

<button class="btn btn--success">Success</button>

### Prose Container (for articles/KB)```

**Style:** Green background, white text

```html

<article class="prose">#### Danger Button

  <h1>Article Title</h1>```html

  <h2>Section Title</h2><button class="btn btn--danger">Delete</button>

  <h3>Subsection</h3>```

  <p>Paragraph text</p>**Style:** Red background, white text

</article>

```#### Outline Button

```html

**Sizes:**<button class="btn btn--outline">Outline</button>

```

- `h1`: 2.25rem (36px), bold**Style:** Transparent background, blue border and text

- `h2`: 1.5rem (24px), bold

- `h3`: 1.25rem (20px), bold#### Quiet Button

```html

**Colors:**<button class="btn btn--quiet">Text Link</button>

```

- Headings: `--text-primary`**Style:** Transparent, blue text, no border, underlines on hover

- Body text: `--text-muted`

---

### Text Gradient

## Cards

```html

<h1 class="text-gradient">Gradient Text</h1>### Base Card

``````html

<div class="card">

Gradient from `--blue` to `--green`  Card content

</div>

---```

**Style:** White background, border, rounded corners, soft shadow

## 🎯 Layout Components

### Card Border Variants (Outline)

### Header```html

<div class="card card--outline-blue">Blue border</div>

```html<div class="card card--outline-green">Green border</div>

<header class="site-header" role="banner"><div class="card card--outline-red">Red border</div>

  <div class="header-content"><div class="card card--outline-purple">Purple border</div>

    <!-- Content -->```

  </div>

</header>### Featured Card

``````html

<div class="card card--featured">

Height: `--header-height` (4.5rem)  Featured content

</div>

### Logo```

**Style:** Light blue gradient background, blue border

```html

<a href="/" class="logo">### Rotational Card Borders

  <div class="logo-icon"></div>Cards automatically rotate through 3 colors when used in sets:

  <span>Digital Allies</span>- **1st, 4th, 7th...** → Blue border

</a>- **2nd, 5th, 8th...** → Green border

```- **3rd, 6th, 9th...** → Purple border



Animated pulse effect on icon---



### Footer## Layout Components



```html### Header

<footer>```html

  Footer content<header class="site-header" role="banner">

</footer>  <div class="header-content">

```    <!-- Header content -->

  </div>

Gradient background with `--gray`</header>

```

### Skip Link (Accessibility)**Style:** Gradient background with dot pattern



```html### Logo

<a href="#main-content" class="skip-link">Skip to main content</a>```html

```<a href="/" class="logo">

  <div class="logo-icon"></div>

Hidden until keyboard focus  <span>Digital Allies</span>

</a>

---```

**Style:** Animated brand pulse effect on icon

## 🛠️ Utility Classes

### Footer

### Hover Effects```html

<footer>

```html  Footer content

<!-- Subtle shadow --></footer>

<div class="gradient-shadow">Content</div>```

**Style:** Dark gradient background

<!-- Lift on hover -->

<div class="hover-lift">Content</div>### Skip Link (Accessibility)

``````html

<a href="#main-content" class="skip-link">Skip to main content</a>

### Animations```

**Style:** Hidden until focused, appears at top when tabbed

```html

<!-- Fade in from bottom -->---

<div class="fade-in">Fades in</div>

<div class="fade-in fade-in-delay-1">Delayed 0.2s</div>## Utility Classes

<div class="fade-in fade-in-delay-2">Delayed 0.4s</div>

<div class="fade-in fade-in-delay-3">Delayed 0.6s</div>### Hover Effects



<!-- Gentle float -->#### Gradient Shadow

<div class="floating">Floats up and down</div>```html

```<div class="gradient-shadow">Content</div>

```

### Gradient Background**Effect:** Subtle blue shadow



```html#### Hover Lift

<section class="gradient-bg">```html

  Light blue background<div class="hover-lift">Content</div>

</section>```

```**Effect:** Lifts up 2px on hover with shadow



Uses `--blue-50`### Fade In Animations

```html

---<div class="fade-in">Fades in from bottom</div>

<div class="fade-in fade-in-delay-1">Delayed 0.2s</div>

## 📋 Form Elements<div class="fade-in fade-in-delay-2">Delayed 0.4s</div>

<div class="fade-in fade-in-delay-3">Delayed 0.6s</div>

### Error Messages```



```html### Floating Animation

<input id="email" data-validate-field required>```html

<span id="email-error" class="form-error"></span><div class="floating">Gently floats up and down</div>

``````

**Effect:** 6-second gentle vertical movement

**Shows when:**

---

```html

<span id="email-error" class="form-error active">Error message</span>## Animations

```

### Available Keyframe Animations

Color: `--error`

#### Brand Pulse

### Validation Attributes```css

@keyframes brand-pulse

```html```

<form data-validate="contact">**Duration:** 3s infinite

  <input **Effect:** Scales between 1 and 1.15, opacity pulses

    id="name"

    data-validate-field#### Fade In Up

    data-error-required="Name is required"```css

    data-error-invalid="Invalid format"@keyframes fadeInUp

    required```

  >**Duration:** 0.8s

  <span id="name-error" class="form-error"></span>**Effect:** Fades in while moving up 20px

</form>

```#### Float

```css

---@keyframes float

```

## 🎨 Icons**Duration:** 6s infinite

**Effect:** Gentle vertical floating motion

### Icon Sizes

---

```html

<svg class="icon">...</svg>## Form Elements

```

### Form Error Messages

Size: 28x28px```html

<span class="form-error">Error message</span>

### Icon Colors<span class="form-error active">Visible error</span>

```

```html**Behavior:** Hidden by default, shown when `.active` class is added

<svg class="icon icon--blue">...</svg>**Style:** Red text

<svg class="icon icon--green">...</svg>

<svg class="icon icon--purple">...</svg>### Form Validation Attributes

<svg class="icon icon--red">...</svg>Use these data attributes for JavaScript validation:

``````html

<form data-validate="contact">

### Icon Backgrounds (Automatic Rotation)  <input 

    data-validate-field

```html    data-error-required="This field is required"

<div class="icon-bg">    data-error-invalid="Invalid format"

  <svg class="icon">...</svg>  >

</div>  <span id="fieldname-error" class="form-error"></span>

```</form>

```

Automatically rotates through 3 backgrounds:

---

1. Blue light

2. Green light## Icons

3. Purple light

### Icon Size

**Tokens:** `--icon-bg-1`, `--icon-bg-2`, `--icon-bg-3````html

<svg class="icon">...</svg>

Size: 4rem x 4rem (64x64px)```

**Size:** 28x28px

---

### Icon Colors

## ⚡ JavaScript Features```html

<svg class="icon icon--blue">...</svg>

### Language Toggle<svg class="icon icon--green">...</svg>

<svg class="icon icon--purple">...</svg>

**IDs:**<svg class="icon icon--red">...</svg>

```

- `lang-en` - English button

- `lang-es` - Spanish button### Icon Backgrounds (Rotational)

```html

**HTML:**<div class="icon-bg">

  <svg class="icon">...</svg>

```html</div>

<span data-en="Hello" data-es="Hola">Hello</span>```

```**Effect:** Icons automatically rotate through 3 background colors in sets:

- **1st, 4th, 7th...** → Light blue background

### Mobile Menu- **2nd, 5th, 8th...** → Light green background

- **3rd, 6th, 9th...** → Light purple background

**IDs:**

**Size:** 4rem x 4rem (64x64px)

- `mobile-menu`

---

**Toggle button:**

## JavaScript-Driven Features

```html

<button ### Language Toggle

  onclick="toggleMobileMenu(this)" **IDs Used:**

  aria-expanded="false" - `lang-en` - English button

  aria-controls="mobile-menu"- `lang-es` - Spanish button

>

  Menu**Function:**

</button>```javascript

```toggleLanguage('en') // or 'es'

```

### Form Validation

**HTML Attributes:**

Auto-validates on:```html

<span data-en="English text" data-es="Spanish text">English text</span>

- Blur (when field loses focus)```

- Input (after first error shown)

- Submit (validates all fields)### Mobile Menu

**IDs Used:**

### Blog System- `mobile-menu` - The mobile navigation container



**IDs:****Function:**

```javascript

- `blog-posts-grid` - Main gridtoggleMobileMenu(buttonElement)

- `blog-search` - Search container```

- `blog-search-input` - Search input

- `blog-filters` - Category filters**Attributes:**

- `load-more-btn` - Load more button- `aria-expanded` - Set automatically

- `aria-controls="mobile-menu"` - Required on toggle button

### Knowledge Base

### Form Validation

**IDs:****Attributes:**

```html

- `category-pills` - Category filters<form data-validate="contact">

- `articles-grid` - Articles display  <input 

- `search-input` - Search field    data-validate-field

- `main-view` - Main view    data-error-required="Custom required message"

- `article-view` - Article detail    data-error-invalid="Custom invalid message"

- `chatbot-toggle` - Chatbot button    id="field-name"

- `chatbot-window` - Chatbot window    required

  >

### Floating Shapes (Parallax)  <span id="field-name-error" class="form-error"></span>

</form>

```html```

<div id="hero-shapes" data-floating-shapes>

  <div class="floating-shape" data-speed="0.5" data-rotation="1">**Validation runs on:**

    <svg>...</svg>- Blur (when field loses focus)

  </div>- Input (after first error shown)

</div>- Submit (validates all fields)

```

### Blog Dynamic Loading

**Attributes:****IDs Used:**

- `blog-posts-grid` - Container for blog posts

- `data-floating-shapes` - Enable on container- `blog-search` - Search container (auto-created)

- `data-speed` - Parallax speed (default: 0.5)- `blog-search-input` - Search input field

- `data-rotation` - Rotation multiplier (default: 0)- `blog-filters` - Category filter container (auto-created)

- `blog-stats` - Stats display element

---- `load-more-btn` - Load more button (auto-created)



## 🎯 Common Patterns**Classes Used:**

- `.category-filter` - Category filter buttons

### Hero Section- `.gradient-shadow` - Card shadow effect

- `.line-clamp-2` - Truncate to 2 lines

```html- `.line-clamp-3` - Truncate to 3 lines

<section class="gradient-bg relative">

  <div class="floating-shapes-container">**Data Attributes:**

    <!-- Decorative shapes -->- `data-post-slug` - Track post clicks

  </div>- `data-category` - Filter by category

  <div class="container mx-auto px-4 py-20">

    <h1 class="text-gradient fade-in">Title</h1>### Knowledge Base

    <p class="fade-in fade-in-delay-1">Description</p>**IDs Used:**

    <a href="#" class="btn btn--primary fade-in fade-in-delay-2">Get Started</a>- `category-pills` - Category filter container

  </div>- `articles-grid` - Articles display grid

</section>- `no-results` - Empty state message

```- `search-input` - Search input field

- `breadcrumb` - Breadcrumb navigation

### Card Grid- `breadcrumb-category` - Category in breadcrumb

- `breadcrumb-separator` - Separator in breadcrumb

```html- `breadcrumb-article` - Article name in breadcrumb

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">- `main-view` - Main articles view

  <div class="card hover-lift">Card 1 - Blue</div>- `article-view` - Single article view

  <div class="card hover-lift">Card 2 - Green</div>- `article-content` - Article content container

  <div class="card hover-lift">Card 3 - Purple</div>- `chatbot-toggle` - Chatbot toggle button

</div>- `chatbot-window` - Chatbot window

```- `chatbot-icon-open` - Open icon

- `chatbot-icon-close` - Close icon

### Button Pair- `chat-messages` - Messages container

- `chat-input` - Chat input field

```html- `chat-send` - Send button

<div class="flex gap-4">- `typing-indicator` - Typing indicator (auto-created)

  <a href="#" class="btn btn--primary">Primary</a>

  <a href="#" class="btn btn--secondary">Secondary</a>**Functions:**

</div>```javascript

```filterByCategory(category)  // Filter articles

showArticle(articleId)      // Show single article

---resetView()                 // Return to main view

```

## 🚫 Common Mistakes to Avoid

### Floating Shapes

### ❌ DON'T use old variable names**Container Attribute:**

```html

```css<div id="unique-id" data-floating-shapes>

/* ❌ Wrong */  <div class="floating-shape" data-speed="0.5" data-rotation="1">

color: var(--da-blue-500);    <svg>...</svg>

background: var(--color-text);  </div>

</div>

/* ✅ Correct */```

color: var(--blue);

background: var(--text-primary);**Data Attributes:**

```- `data-floating-shapes` - Marks container for initialization

- `data-speed` - Parallax speed (default: 0.5)

### ❌ DON'T forget error spans- `data-rotation` - Rotation multiplier (default: 0, set to enable rotation)



```html**Auto-initializes on DOMContentLoaded**

<!-- ❌ Wrong -->

<input id="email" data-validate-field required>---



<!-- ✅ Correct -->## Special Components

<input id="email" data-validate-field required>

<span id="email-error" class="form-error"></span>### Sticky CTA Button

``````html

<a href="/contact.html" class="sticky-cta">

### ❌ DON'T forget mobile menu attributes  Get Started

</a>

```html```

<!-- ❌ Wrong -->**Position:** Fixed to bottom-right corner

<button onclick="toggleMobileMenu(this)">Menu</button>**Style:** Blue gradient, rounded pill, floating shadow



<!-- ✅ Correct -->### Floating Shapes Container

<button ```html

  onclick="toggleMobileMenu(this)" <div class="floating-shapes-container">

  aria-expanded="false"   <div class="floating-shape" style="width: 80px; height: 80px; top: 10%; left: 5%;">

  aria-controls="mobile-menu"    <svg>...</svg>

>  </div>

  Menu</div>

</button>```

```**Usage:** Background decorative shapes with parallax effect



### ❌ DON'T forget language attributes---



```html## Quick Reference: Common Patterns

<!-- ❌ Wrong -->

<span>Home</span>### Hero Section Pattern

```html

<!-- ✅ Correct --><section class="gradient-bg relative">

<span data-en="Home" data-es="Inicio">Home</span>  <div class="floating-shapes-container">

```    <!-- Decorative shapes -->

  </div>

---  <div class="container mx-auto px-4 py-20">

    <h1 class="text-gradient fade-in">Title</h1>

## 📦 Files Overview    <p class="fade-in fade-in-delay-1">Description</p>

    <a href="#" class="btn btn--primary fade-in fade-in-delay-2">CTA</a>

### CSS Files  </div>

</section>

- `/assets/css/global.css` - **ONE unified stylesheet with all design tokens**```



### JavaScript Files### Card Grid Pattern

```html

- `/assets/js/global.js` - Language toggle, mobile menu, form validation<div class="grid grid-cols-1 md:grid-cols-3 gap-8">

- `/assets/js/floating-shapes.js` - Parallax shapes  <div class="card hover-lift">Card 1 - Blue border</div>

- `/assets/js/blog-dynamic-load.js` - Blog system  <div class="card hover-lift">Card 2 - Green border</div>

- `/assets/js/knowledge-base.js` - KB + chatbot  <div class="card hover-lift">Card 3 - Purple border</div>

</div>

All features auto-initialize on `DOMContentLoaded````



---### Two-Column CTA Pattern

```html

## 🎨 Quick Color Reference<div class="flex gap-4">

  <a href="#" class="btn btn--primary">Primary Action</a>

| Token                | Hex       | Usage                  |  <a href="#" class="btn btn--secondary">Secondary Action</a>

| -------------------- | --------- | ---------------------- |</div>

| `--blue`             | `#2563EB` | Primary brand color    |```

| `--blue-light`       | `#60A5FA` | Hover states           |

| `--green`            | `#059669` | Success, accents       |---

| `--purple`           | `#7C3AED` | Accent color           |

| `--neutral-900`      | `#111827` | Headings, primary text |## Accessibility Features

| `--neutral-600`      | `#4B5563` | Muted text             |

| `--error`            | `#DC2626` | Error messages         |### Focus States

| `--success`          | `#10B981` | Success states         |All interactive elements have custom focus rings:

```css

---:focus-visible {

  box-shadow: var(--focus-ring);

## 🧠 Design System Philosophy}

```

**ONE unified system:**

### Reduced Motion

1. All tokens from brand.digitalallies.netThe stylesheet respects user motion preferences:

2. Simple, semantic variable names```css

3. Consistent button pattern (`.btn` + modifier)@media (prefers-reduced-motion: reduce)

4. Automatic color rotation for cards/icons```

5. Token-based, maintainableAll animations are disabled for users who prefer reduced motion.



---### Screen Reader Classes

```html

**Last Updated:** November 2, 2025  <span class="sr-only">Screen reader only text</span>

**Version:** 3.0  ```

**System:** Unified Token-Based Design System  

**Source:** brand.digitalallies.net → `/assets/css/global.css`---


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
