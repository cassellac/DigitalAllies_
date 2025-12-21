const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const CONTENT_DIR = path.join(ROOT, 'content');
const SETTINGS_DIR = path.join(CONTENT_DIR, 'settings');

function loadJson(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        }
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e);
    }
    return {};
}

module.exports = function getGlobalContext() {
    const site = loadJson(path.join(SETTINGS_DIR, 'site.json'));
    const styles = loadJson(path.join(SETTINGS_DIR, 'style.json'));
    
    // Handle new nested style structure from .pages.yml
    // Fallback to old flat structure if nested keys don't exist yet
    const branding = styles.branding || styles;
    
    return {
        brand: {
            name: site.siteName || "Digital Allies",
            tagline: site.siteDescription || "Creating digital solutions for the real world.",
            siteUrl: "https://digitalallies.net",
            contact: {
                email: site.contactEmail || "contact@digitalallies.net",
                phone: "928-228-5769"
            },
            // Add Logo from CMS
            logo: site.logo || "/assets/logo/digital-allies-logo-default.svg"
        },
        // Expose new CMS Features & Security settings
        config: {
            features: site.features || { enableBlog: true, enableShop: false },
            security: site.security || { enableUserRegistration: false },
            styles: {
                primaryColor: branding.primaryColor || '#0052CC',
                secondaryColor: branding.secondaryColor || '#262626',
                borderRadius: (styles.components && styles.components.borderRadius) || styles.borderRadius || 8
            }
        },
        navigation: [
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Services", path: "/services" },
            { label: "Blog", path: "/blog" },
            { label: "Knowledge Base", path: "/knowledge-base" },
            { label: "Contact", path: "/contact" }
        ],
        language: {
            default: "en",
            supported: ["en", "es"]
        },
        assets: {
            stylesheet: "/assets/css/global.css",
            scripts: [
                "/assets/js/global.js",
                "/assets/js/knowledge-base.js"
            ]
        }
    };
};
