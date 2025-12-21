#!/usr/bin/env node

/**
 * Pages CMS Sync Script
 * Updated to support multiple collections (blog, pages) and settings (style.json).
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const yaml = require('js-yaml');

// Paths
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');
const SETTINGS_DIR = path.join(CONTENT_DIR, 'settings');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
}

/**
 * Converts YAML setting files (like style.yaml) into JSON for the Global Loader.
 */
function syncSettings() {
    if (!fs.existsSync(SETTINGS_DIR)) return;
    const files = fs.readdirSync(SETTINGS_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    
    files.forEach(file => {
        const filePath = path.join(SETTINGS_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = yaml.load(fileContent);
        const outputJson = path.join(SETTINGS_DIR, file.replace(/\.(yaml|yml)$/, '.json'));
        
        fs.writeFileSync(outputJson, JSON.stringify(data, null, 2));
        console.log(`⚙️  Processed settings: ${file} -> ${path.basename(outputJson)}`);
    });
}

/**
 * Processes a directory of markdown files and generates a JSON index.
 */
function processCollection(dir, type) {
    if (!fs.existsSync(dir)) return { items: [] };

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    const items = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const raw = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(raw);

        if (!data.title) return;

        const slug = data.slug || slugify(data.title);
        const excerpt = data.description || content.slice(0, 160).replace(/[#*`]/g, '') + '...';

        items.push({
            ...data,
            slug,
            excerpt,
            type,
            wordCount: content.split(/\s+/).length
        });
    });

    // Sort by date (newest first)
    items.sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0));

    const categories = Array.from(new Set(items.map(i => i.category).filter(Boolean)));
    const indexPath = path.join(dir, 'index.json');
    
    // The Site Loader expects { posts: [] } for blog and { pages: [] } for pages
    const output = {
        [type === 'blog' ? 'posts' : 'pages']: items,
        categories,
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(indexPath, JSON.stringify(output, null, 2));
    console.log(`🗂️  Index generated for ${type}: ${indexPath} (${items.length} items)`);
    
    return output;
}

function main() {
    console.log('🚀 Starting CMS Sync...');
    
    // 1. Sync Style Guide and Admin Settings
    syncSettings();

    // 2. Process Blog Collection
    processCollection(BLOG_DIR, 'blog');

    // 3. Process Pages Collection
    processCollection(PAGES_DIR, 'pages');

    console.log('✅ Sync Complete.');
}

try {
    main();
} catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
}
