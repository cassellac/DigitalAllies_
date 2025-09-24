# GitHub Copilot Instructions - Digital Allies

## Copilot Agent Permissions

**Required Permissions for GitHub Copilot Agent:**
- **Repository Access**: Read and write access to all files across all branches
- **Issues**: Full read and write access to repository issues
- **Pull Requests**: Full read and write access to pull requests and reviews
- **Actions**: Read and write access to GitHub Actions workflows and runs
- **Scope**: Entire repository across all branches

**Note**: These permissions must be configured by repository administrators through GitHub's web interface at:
- Repository Settings > Actions > General
- Organization Settings > GitHub Apps (if using GitHub App)
- User Settings > Developer settings > Personal access tokens (if using PAT)

## Repository Summary

Digital Allies is a static multilingual website (English/Spanish) for a digital services company that specializes in web development, accessibility consulting, and digital solutions for small businesses. The site emphasizes WCAG 2.1 AA accessibility compliance and modern web standards.

**Repository Type**: Static website  
**Size**: Small (~2,700 lines of code)  
**Languages**: HTML5, CSS3, JavaScript (ES6+)  
**Framework**: Tailwind CSS (CDN)  
**Target**: Modern web browsers with accessibility focus  
**License**: MIT  
**Domain**: digitalallies.net  

## High-Level Architecture & Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript ES6+ (no build process required)
- **Styling**: Tailwind CSS via CDN + custom CSS in `assets/global.css`
- **JavaScript**: Vanilla JS with progressive enhancement in `assets/js/global.js`
- **Graphics**: SVG icons and images for scalability
- **Analytics**: Google Analytics 4 and Google Tag Manager
- **Hosting**: Static hosting (GitHub Pages compatible)
- **Dependencies**: MongoDB driver (likely for future backend integration)

## Build & Development Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server for development (Python, Node.js, or PHP)
- Text editor or IDE

### Setup & Development
```bash
# Clone and navigate to repository
cd /path/to/DigitalAllies_

# Install dependencies (minimal - only MongoDB driver)
npm install

# Start local development server (choose one):
python3 -m http.server 8000          # Python 3
python -m http.server 8000           # Python 2
npx serve .                          # Node.js
php -S localhost:8000                # PHP

# Open browser to http://localhost:8000
```

### Validation & Testing
```bash
# Validate JavaScript syntax
node -c assets/js/global.js

# Check for security vulnerabilities
npm audit

# Test all pages load correctly:
curl -s http://localhost:8000/ | grep -q "Digital Allies"
curl -s http://localhost:8000/about.html | grep -q "Our Values"
curl -s http://localhost:8000/ada_guide.html | grep -q "ADA"
curl -s http://localhost:8000/services.html | grep -q "Services"
```

**Critical**: Always test both English and Spanish language switching functionality after making changes to content or JavaScript.

## Project Layout & Architecture

```
DigitalAllies_/
├── index.html              # Main landing page (475 lines)
├── about.html              # Company information page (415 lines)
├── ada_guide.html          # Interactive accessibility guide (1280 lines)
├── services.html           # Services showcase (191 lines)
├── blog.html               # Blog/news page (185 lines)
├── privacy                 # Privacy policy (HTML file)
├── assets/
│   ├── global.css          # Design system & custom styles (85 lines)
│   ├── js/
│   │   └── global.js       # Core functionality (43 lines)
│   ├── *.svg               # Service icons and graphics
│   └── favicon files       # Site icons and manifest
├── package.json            # MongoDB dependency only
├── sitemap.xml             # SEO sitemap
├── CNAME                   # Domain configuration
└── README.md               # Comprehensive documentation
```

### Key Architecture Elements

**Design System**: Centralized in `assets/global.css` with custom CSS properties and Tailwind extensions
- Colors: Primary blue (#2563EB), success green (#059669), gray variants
- Typography: Segoe UI primary, Source Sans Pro secondary
- Components: Gradient shadows, hover effects, animations

**JavaScript Architecture**: 
- Tailwind configuration object at runtime
- Language switching system with `data-en` and `data-es` attributes
- Mobile menu toggle functionality
- Progressive enhancement approach

**Multilingual Support**:
- All user-facing text has `data-en` and `data-es` attributes
- JavaScript toggles content based on selected language
- Language selector in header of every page

## Content Management

### Making Content Changes
1. **HTML Content**: Edit `data-en` and `data-es` attributes for both languages
2. **Styling**: Modify `assets/global.css` for design system changes
3. **Functionality**: Update `assets/js/global.js` for interactive features
4. **Images**: Add SVG files to `assets/` directory

### Accessibility Requirements
- **ALWAYS** include proper alt text for images
- **ALWAYS** maintain keyboard navigation support
- **ALWAYS** ensure color contrast meets WCAG 2.1 AA standards
- **ALWAYS** use semantic HTML structure
- **ALWAYS** test with screen readers if modifying interactive elements

## No Build Process Required

This is a **static website** with no build pipeline. Changes are immediately effective when files are saved. The site uses:
- Tailwind CSS via CDN (configured in `global.js`)
- No transpilation or compilation needed
- No package bundling required
- Direct file serving from web server

## Testing & Validation Procedures

### Manual Testing Checklist
1. **Language Toggle**: Click EN/ES buttons, verify all text changes
2. **Mobile Menu**: Test hamburger menu on mobile viewports
3. **Navigation**: Verify all internal links work
4. **Forms**: Test any contact forms or interactive elements
5. **Accessibility**: Tab through entire page with keyboard
6. **Performance**: Check page load times and responsiveness

### Browser Testing
- **Required**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Accessibility**: Test with screen readers (NVDA, JAWS, VoiceOver)

### Pre-deployment Validation
```bash
# Start local server
python3 -m http.server 8000

# Check all main pages load
for page in "" "about.html" "ada_guide.html" "services.html" "blog.html"; do
  curl -f "http://localhost:8000/$page" > /dev/null && echo "$page ✓" || echo "$page ✗"
done

# Validate JavaScript
node -c assets/js/global.js && echo "JS ✓" || echo "JS ✗"
```

## Common Pitfalls & Important Notes

### Content Updates
- **ALWAYS** update both `data-en` and `data-es` attributes when changing text
- **NEVER** hardcode text without language attributes
- **ALWAYS** test language switching after content changes

### File Paths
- All asset references use relative paths (`assets/...`)
- Favicon references use absolute paths (`/assets/...`)
- Ensure consistency when adding new assets

### Performance Considerations
- Site loads Tailwind CSS from CDN - check CDN availability
- Google Analytics requires internet connection for tracking
- SVG icons provide fast loading and scaling

### Analytics & Privacy
- Google Analytics ID: G-9HVGNEKE8R (in all HTML files)
- Privacy policy page exists and is GDPR compliant
- No sensitive data stored or transmitted

## Trust These Instructions

These instructions are comprehensive and tested. **Only perform additional exploration** if:
- The information here is incomplete for your specific task
- You encounter errors not covered in this guide
- You need to understand code patterns not documented here

For standard content updates, styling changes, or functionality additions, follow this guide without additional repository exploration.