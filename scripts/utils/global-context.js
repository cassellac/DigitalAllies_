const path = require('path');

const SITE_URL = 'https://digitalallies.net';
const BLOG_BASE_PATH = '/content/posts';

const GLOBAL_CONTEXT = {
    brand: {
        name: 'Digital Allies',
        tagline: 'Creating digital solutions for the real world.',
        siteUrl: SITE_URL,
        contact: {
            email: 'contact@digitalallies.net',
            phone: '928-228-5769'
        }
    },
    navigation: [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Blog', path: '/blog' },
        { label: 'Knowledge Base', path: '/knowledge-base' },
        { label: 'Contact', path: '/contact' }
    ],
    language: {
        default: 'en',
        supported: ['en', 'es']
    }
};

function buildContextScript() {
    return `<script>window.DIGITAL_ALLIES_GLOBALS = ${JSON.stringify(GLOBAL_CONTEXT)};</script>`;
}

function buildCanonical(slug) {
    return `${SITE_URL}${BLOG_BASE_PATH}/${slug}/`;
}

function resolvePublicPostPath(slug) {
    return `${BLOG_BASE_PATH}/${slug}/`;
}

function resolveOutputDirectory(rootDir, slug) {
    if (slug.includes('..')) throw new Error('Invalid directory name');
    return path.join(rootDir, slug);
}

module.exports = {
    SITE_URL,
    BLOG_BASE_PATH,
    GLOBAL_CONTEXT,
    buildContextScript,
    buildCanonical,
    resolvePublicPostPath,
    resolveOutputDirectory
};
