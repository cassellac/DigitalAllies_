#!/usr/bin/env node

/**
 * Pages CMS Sync Script
 *
 * Converts Markdown entries created via Pages CMS into production-ready
 * HTML blog posts that use the global Digital Allies layout and keeps the
 * blog index in sync. Designed to run locally (npm run sync-cms) or inside
 * the GitHub Action workflow when new content is committed.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Paths and constants
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BLOG_DIR = path.join(ROOT, 'blog');
const TEMPLATE_PATH = path.join(__dirname, 'templates', 'post-template.html');
const INDEX_PATH = path.join(BLOG_DIR, 'blog-index.json');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function loadTemplate() {
    if (!fs.existsSync(TEMPLATE_PATH)) {
        throw new Error(`Post template not found at ${TEMPLATE_PATH}`);
    }
    return fs.readFileSync(TEMPLATE_PATH, 'utf8');
}

function generateSlug(input) {
    return input
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function escapeHtml(text = '') {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderTemplate(template, data) {
    let output = template;

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            return; // handled later
        }
        const safeValue = value == null ? '' : value;
        const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        output = output.replace(pattern, safeValue);
    });

    output = output.replace(/\{\{formatDate publishDate\}\}/g, formatDisplayDate(data.publishDate));

    // Tags block
    if (Array.isArray(data.tags)) {
        const tagMeta = data.tags.map(tag => `    <meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n');
        output = output.replace(/\{\{#each tags\}\}[\s\S]*?\{\{\/each\}\}/g, tagMeta);

        const tagChips = data.tags.length
            ? `<div class="flex flex-wrap gap-2">\n                ${data.tags.map(tag => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">#${escapeHtml(tag)}</span>`).join('\n                ')}\n            </div>`
            : '';
        output = output.replace(/\{\{#if tags\}\}[\s\S]*?\{\{\/if\}\}/g, tagChips);
    }

    // Conditional blocks for category, description, featured image, etc.
    output = replaceConditional(output, 'category', Boolean(data.category));
    output = replaceConditional(output, 'description', Boolean(data.description));
    output = replaceConditional(output, 'imageAlt', Boolean(data.imageAlt));
    output = replaceConditional(output, 'featuredImage', Boolean(data.featuredImage));

    // Author conditional (only show when not default)
    output = output.replace(/\{\{#if author\}\}\{\{#unless \(eq author "Digital Allies"\)\}\}([\s\S]*?)\{\{\/unless\}\}\{\{\/if\}\}/g,
        data.author && data.author !== 'Digital Allies' ? '$1' : '');

    return output;
}

function formatDisplayDate(isoString) {
    if (!isoString) {
        return '';
    }
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
        return isoString;
    }
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function replaceConditional(template, name, condition) {
    const regex = new RegExp(`\\{\\{#if ${name}\\}\\}([\\s\\S]*?)\\{\\{\\/if\\}\\}`, 'g');
    return template.replace(regex, condition ? '$1' : '');
}

function stripHtml(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildExcerpt({ description, markdown, html }) {
    if (description) {
        return description.trim();
    }
    const base = stripHtml(html || markdown || '');
    return base.substring(0, 200).trim() + (base.length > 200 ? '…' : '');
}

function normalizeTags(tags) {
    if (!tags) return [];
    if (Array.isArray(tags)) {
        return tags.map(tag => tag.toString().trim()).filter(Boolean);
    }
    return tags.toString().split(',').map(tag => tag.trim()).filter(Boolean);
}

function resolvePublishDate(value, fallback) {
    if (!value) return fallback;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        console.warn(`⚠️  Invalid publishDate '${value}' encountered. Using fallback ${fallback}`);
        return fallback;
    }
    return date.toISOString();
}

function readExistingIndex() {
    if (!fs.existsSync(INDEX_PATH)) {
        return {
            posts: [],
            categories: [],
            tags: [],
            lastUpdated: new Date(0).toISOString(),
            totalPosts: 0,
            metadata: {}
        };
    }

    try {
        const raw = fs.readFileSync(INDEX_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        console.warn('⚠️  Unable to parse existing blog index. Rebuilding from scratch.', error);
        return {
            posts: [],
            categories: [],
            tags: [],
            lastUpdated: new Date(0).toISOString(),
            totalPosts: 0,
            metadata: {}
        };
    }
}

function saveIndex(index) {
    fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
}

function main() {
    ensureDir(CONTENT_DIR);
    ensureDir(BLOG_DIR);

    const template = loadTemplate();
    const contentFiles = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));

    if (!contentFiles.length) {
        console.log('ℹ️  No markdown content found. Nothing to sync.');
        return;
    }

    const existingIndex = readExistingIndex();
    const newPosts = [];

    contentFiles.forEach(file => {
        const filePath = path.join(CONTENT_DIR, file);
        const fileRaw = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileRaw);
        const data = parsed.data || {};
        const body = parsed.content.trim();

        if (!data.title) {
            console.warn(`⚠️  Skipping ${file} because the title field is missing.`);
            return;
        }

        const slug = data.slug ? data.slug.toString().trim() : generateSlug(data.title);
        if (!slug) {
            console.warn(`⚠️  Skipping ${file} because a valid slug could not be generated.`);
            return;
        }

        const publishDateIso = resolvePublishDate(data.publishDate, fs.statSync(filePath).mtime.toISOString());
        const tags = normalizeTags(data.tags);
        const author = data.author ? data.author.toString().trim() : 'Digital Allies';
        const description = data.description ? data.description.toString().trim() : '';
        const category = data.category ? data.category.toString().trim() : '';
        const featuredImage = data.featuredImage ? data.featuredImage.toString().trim() : '';
        const featuredImageAlt = data.featuredImageAlt ? data.featuredImageAlt.toString().trim() : '';

        const htmlContent = marked.parse(body, { mangle: false, headerIds: false });
        const wordCount = body ? body.split(/\s+/).filter(Boolean).length : 0;
        const readingTime = Math.max(1, Math.ceil(wordCount / 200));
        const excerpt = buildExcerpt({ description, markdown: body, html: htmlContent });

        const rendered = renderTemplate(template, {
            title: escapeHtml(data.title),
            slug,
            description: escapeHtml(description),
            keywords: tags.map(escapeHtml).join(', '),
            category: escapeHtml(category),
            author: escapeHtml(author),
            publishDate: publishDateIso,
            content: htmlContent,
            tags,
            wordCount,
            readingTime,
            featuredImage: escapeHtml(featuredImage),
            imageAlt: escapeHtml(featuredImageAlt)
        });

        const postPath = path.join(BLOG_DIR, `${slug}.html`);
        fs.writeFileSync(postPath, rendered, 'utf8');
        console.log(`✅ Generated ${postPath}`);

        newPosts.push({
            title: data.title,
            slug,
            description,
            category,
            author,
            publishDate: publishDateIso,
            tags,
            wordCount,
            readingTime,
            excerpt,
            featuredImage,
            imageAlt: featuredImageAlt
        });
    });

    if (!newPosts.length) {
        console.log('ℹ️  No posts generated. Index remains unchanged.');
        return;
    }

    const existingWithoutNew = (existingIndex.posts || []).filter(post => !newPosts.find(np => np.slug === post.slug));
    const combinedPosts = [...newPosts, ...existingWithoutNew];
    combinedPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    const categories = Array.from(new Set(combinedPosts.map(post => post.category).filter(Boolean))).sort();
    const tags = Array.from(new Set(combinedPosts.flatMap(post => post.tags || []).filter(Boolean))).sort();
    const now = new Date().toISOString();

    const updatedIndex = {
        posts: combinedPosts,
        categories,
        tags,
        lastUpdated: now,
        totalPosts: combinedPosts.length,
        metadata: {
            generatedBy: 'sync-pages-cms-content.js',
            generatedAt: now,
            source: 'content/*.md'
        }
    };

    saveIndex(updatedIndex);
    console.log(`🗂️  Updated blog index with ${combinedPosts.length} posts.`);
}

try {
    main();
} catch (error) {
    console.error('❌ Pages CMS sync failed:', error);
    process.exit(1);
}
