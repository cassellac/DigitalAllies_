# Digital Allies 🌐

## Digital Solutions for the Real World

Digital Allies is a modern, accessible web development agency website that showcases digital solutions for small businesses. Built with a focus on accessibility, performance, and user experience.

## 🚀 Purpose

This website serves as:
- **Portfolio showcase** for Digital Allies' web development services
- **Educational resource** with an interactive ADA accessibility guide
- **Business landing page** to attract and convert potential clients
- **Demonstration** of modern web development best practices
- **Content management system** with automated blog generation

## ✨ Features

### Core Functionality
- **Multilingual Support** - English and Spanish translations with dynamic language switching
- **Responsive Design** - Optimized for all devices and screen sizes
- **Interactive ADA Guide** - Comprehensive accessibility testing tools and validation
- **Modern UI/UX** - Clean, professional design with floating shape animations
- **Performance Optimized** - Fast loading times and efficient static site architecture
- **Content Management** - Automated blog post generation from Markdown files

### Accessibility Features
- **WCAG 2.1 AA Compliant** - Meets accessibility standards with built-in validators
- **Keyboard Navigation** - Full keyboard accessibility with skip links
- **Screen Reader Compatible** - Proper semantic HTML and ARIA labels
- **High Contrast Support** - Accessible color schemes and focus indicators
- **Interactive Testing Tools** - Built-in accessibility validators and checkers

### Technical Features
- **Static Site Architecture** - Fast, secure, and SEO-friendly GitHub Pages deployment
- **Progressive Enhancement** - Works without JavaScript, enhanced with JS
- **Analytics Integration** - Google Analytics 4 and Tag Manager
- **Privacy Compliant** - GDPR-ready privacy policy and cookie consent
- **Automated Workflows** - GitHub Actions for content synchronization

## 📁 Project Structure

```
DigitalAllies_/
├── index.html                  # Main landing page
├── about.html                  # About page with company information
├── services.html               # Detailed services showcase
├── blog.html                   # Blog listing page with dynamic loading
├── contact.html                # Contact form and information
├── accessibility-guide.html    # Interactive WCAG 2.1 compliance guide
├── knowledge-base.html         # Knowledge base and resources
├── privacy.html                # Privacy policy (GDPR compliant)
├── terms.html                  # Terms of service
├── cookies.html                # Cookie policy
├── assets/
│   ├── global.css             # Global styles and design system
│   ├── js/
│   │   ├── global.js          # Core JavaScript functionality
│   │   ├── floating-shapes.js # Animated background elements
│   │   ├── blog-dynamic-load.js # Blog content loading
│   │   └── knowledge-base.js  # Knowledge base functionality
│   ├── shapes/                # SVG shape graphics for animations
│   ├── *.svg                  # Service icons and graphics
│   └── favicon files          # Site icons and manifest
├── content/
│   ├── *.md                   # Blog post source files (Markdown)
│   ├── blog-index.json        # Generated blog index
│   └── posts/                 # Generated HTML blog posts
├── scripts/
│   ├── generate-post.js       # Blog post scaffolding tool
│   ├── sync-pages-cms-content.js # Content sync automation
│   ├── templates/             # HTML templates for blog generation
│   └── utils/                 # Shared utilities
├── tools/                     # Development and content tools
├── images/                    # Blog and content images
├── files/documents/           # Downloadable resources
├── package.json               # Node.js dependencies and scripts
├── .github/workflows/         # GitHub Actions automation
└── README.md                  # This documentation
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup with accessibility focus
- **CSS3** - Modern styling with custom properties, grid, and flexbox
- **JavaScript (ES6+)** - Progressive enhancement and interactivity
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **SVG Graphics** - Scalable vector graphics for icons and animations
- **Node.js** - Content management and build automation
- **GitHub Pages** - Static site hosting and deployment
- **GitHub Actions** - Automated content synchronization

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Main brand color
- **Success Green**: `#059669` - Accent and success states
- **Gray Dark**: `#1e293b` - Text and headers
- **Gray Medium**: `#64748b` - Secondary text
- **Pale Blue**: `#dbeafe` - Background and subtle accents

### Typography
- **Primary Font**: System font stack (Segoe UI, Arial, sans-serif)
- **Secondary Font**: "Roboto", Arial, sans-serif – used for body text
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components
- **Cards**: Elevated content containers with hover effects and gradients
- **Buttons**: Primary, secondary, and ghost button variants with hover animations
- **Navigation**: Sticky header with mobile-responsive hamburger menu
- **Forms**: Accessible form controls with validation and error states
- **Floating Shapes**: Animated SVG background elements

## 📱 Pages Overview

### Landing Page (`index.html`)
- Hero section with animated value proposition
- Services showcase with icons and hover effects
- Statistics and company highlights
- Call-to-action sections with gradient styling
- Multilingual content support

### Services (`services.html`)
- Detailed service offerings with pricing
- Interactive service cards
- Case studies and testimonials
- Service-specific contact forms

### About (`about.html`)
- Company story and mission
- Team member profiles
- Company values and approach
- Location and contact information

### Blog (`blog.html`)
- Dynamic blog post loading
- Category and tag filtering
- Search functionality
- Pagination for large content sets

### Accessibility Guide (`accessibility-guide.html`)
- Interactive WCAG 2.1 guidelines
- Color contrast checker tool
- Alt text analyzer
- Heading structure validator
- Screen reader simulation
- Comprehensive resource links

### Knowledge Base (`knowledge-base.html`)
- Searchable resource library
- Category-based organization
- Downloadable guides and templates
- Integration with external knowledge systems

### Legal Pages
- **Privacy Policy** (`privacy.html`) - GDPR-compliant privacy information
- **Terms of Service** (`terms.html`) - Legal terms and conditions
- **Cookie Policy** (`cookies.html`) - Cookie usage and consent

## 🌍 Internationalization

The site supports English and Spanish with:
- Dynamic language switching with persistent state
- `data-en` and `data-es` attributes for all content
- Language-specific URLs for legal pages
- Cultural considerations in design and copy
- Proper `lang` attribute management

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Perceivable**: Alt text, color contrast, responsive design
- **Operable**: Keyboard navigation, no seizure triggers, accessible forms
- **Understandable**: Clear language, consistent navigation, error prevention
- **Robust**: Valid HTML, assistive technology compatibility

### Interactive Tools
- **Color Contrast Checker**: Real-time WCAG compliance testing
- **Alt Text Analyzer**: Content quality validation
- **Heading Validator**: Document structure verification
- **Keyboard Navigation Demo**: Accessibility demonstrations

## 📰 Content Management System

### Blog Workflow
The blog system generates static HTML from Markdown files:

1. **Create content**: Use the post generator or create Markdown files manually
   ```bash
   npm run generate-post -- --title="Your Post Title" --description="Summary" --category="Web Development" --tags="html,css,accessibility"
   ```

2. **Content structure**: Each post includes YAML front matter:
   ```yaml
   ---
   title: "Post Title"
   description: "Post summary"
   publishDate: "2025-01-15"
   category: "Web Development"
   tags: ["html", "css", "accessibility"]
   featuredImage: "/images/post-featured.svg"
   ---
   ```

3. **Sync content**: Generate HTML pages and update the blog index
   ```bash
   npm run sync-cms
   ```

4. **Deploy**: Commit changes to trigger GitHub Pages deployment

### Content Types
- **Blog Posts**: Technical articles, tutorials, industry insights
- **Case Studies**: Client project showcases and results
- **Resources**: Downloadable guides, templates, and tools
- **Knowledge Base**: Technical documentation and how-to guides

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (for content management)
- Modern web browser
- Git (for version control)
- Text editor or IDE

### Local Development
1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd DigitalAllies_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

4. **View the site**: Open `http://localhost:8000` in your browser

### Content Development
1. **Create new blog post**
   ```bash
   npm run generate-post -- --title="Your Title" --category="Category"
   ```

2. **Edit Markdown content** in `content/[slug].md`

3. **Generate HTML pages**
   ```bash
   npm run sync-cms
   ```

4. **Preview changes** in your local server

## 📊 Performance Optimization

- **Minified Assets**: Optimized CSS and JavaScript delivery
- **SVG Graphics**: Scalable vector graphics for crisp displays
- **Lazy Loading**: Deferred loading for non-critical resources
- **Caching Strategy**: Proper cache headers for static assets
- **CDN Integration**: Tailwind CSS and external libraries via CDN
- **Image Optimization**: WebP support and responsive images

## 🔧 Customization

### Branding
- Update color variables in `assets/global.css`
- Replace logo and brand assets in `assets/`
- Modify company information in structured data
- Update contact information across pages

### Content
- Edit HTML files for page content
- Update translation attributes for multilingual support
- Customize service offerings and pricing
- Manage blog articles in `content/*.md`

### Styling
- Modify CSS custom properties for design changes
- Add new components following existing patterns
- Extend Tailwind utility classes as needed
- Update floating shape animations

## 📈 Analytics & Tracking

- **Google Analytics 4**: Comprehensive web analytics with enhanced ecommerce
- **Google Tag Manager**: Flexible tracking configuration and event management
- **Privacy Compliant**: Cookie consent and GDPR data protection
- **Performance Monitoring**: Core Web Vitals and user experience metrics

## 🔒 Security & Privacy

- **HTTPS Ready**: Secure connection support via GitHub Pages
- **Privacy Policy**: Comprehensive GDPR-compliant data protection
- **No Sensitive Data**: Client-side only, no server-side data storage
- **Safe External Links**: Proper `rel` attributes for security
- **Content Security**: Sanitized user inputs and secure forms

## 🚢 Deployment

### GitHub Pages (Automatic)
- Push to `main` branch triggers automatic deployment
- GitHub Actions handle content synchronization
- Custom domain support via CNAME file
- SSL certificate automatically provisioned

### Manual Deployment
1. **Build content**: Run `npm run sync-cms`
2. **Commit changes**: Include generated HTML files
3. **Deploy**: Upload to any static hosting provider

## 🤝 Contributing

When contributing to this project:
1. **Accessibility First**: Maintain WCAG 2.1 AA standards
2. **Code Quality**: Follow existing patterns and conventions
3. **Testing**: Validate across multiple browsers and devices
4. **Documentation**: Update README and inline comments
5. **Multilingual**: Ensure content updates include both languages

### Development Guidelines
- Use semantic HTML5 elements
- Follow CSS custom property conventions
- Implement progressive enhancement
- Test with screen readers and keyboard navigation
- Validate HTML and CSS regularly

## 📞 Support & Contact

For questions about this codebase or Digital Allies services:

- **Website**: [Digital Allies](https://digitalallies.net)
- **Email**: contact@digitalallies.net
- **Phone**: 928-228-5769
- **Location**: Kingman, AZ
- **Accessibility**: Committed to WCAG 2.1 AA compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed  
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Must include copyright notice
- ⚠️ No warranty provided

## 🔗 Dependencies

### Runtime Dependencies
- **gray-matter**: YAML front matter parsing
- **marked**: Markdown to HTML conversion
- **jsdom**: DOM manipulation for content generation
- **fs-extra**: Enhanced file system operations
- **dompurify**: HTML sanitization
- **turndown**: HTML to Markdown conversion

### Development Tools
- **GitHub Actions**: Automated workflows
- **Node.js Scripts**: Content management utilities
- **ESLint**: Code quality enforcement (optional)

---

**Built with ♿ accessibility, 🌍 inclusivity, 💻 modern web standards, and 🚀 performance in mind.**

## 🗺️ Roadmap

### Planned Features
- [ ] Enhanced search functionality
- [ ] Newsletter subscription system
- [ ] Client portal integration
- [ ] Advanced analytics dashboard
- [ ] API integration capabilities
- [ ] Enhanced mobile experience
- [ ] Progressive web app features

### Current Version: 1.0.0
- ✅ Full website functionality
- ✅ Blog content management system
- ✅ Accessibility compliance
- ✅ Multilingual support
- ✅ GitHub Pages deployment
- ✅ Analytics integration
