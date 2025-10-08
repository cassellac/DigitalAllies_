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
const {
    buildContextScript,
    buildCanonical,
    resolvePublicPostPath,
    resolveOutputDirectory
} = require('./utils/global-context');

// Paths and constants
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const POSTS_HTML_DIR = path.join(CONTENT_DIR, 'posts');
const TEMPLATE_PATH = path.join(__dirname, 'templates', 'post-template.html');
const INDEX_JSON_PATH = path.join(CONTENT_DIR, 'blog-index.json');
const INDEX_HTML_PATH = path.join(CONTENT_DIR, 'index.html');
const INDEX_TEMPLATE_PATH = path.join(__dirname, 'templates', 'blog-index-template.html');

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
        const tagMetaIndent = ' '.repeat(4);
        const tagMeta = data.tags
            .map(tag => `${tagMetaIndent}<meta property="article:tag" content="${escapeHtml(tag)}">`)
            .join('\n');
        output = output.replace(/\{\{#each tags\}\}[\s\S]*?\{\{\/each\}\}/g, tagMeta);

        const tagChips = buildTagChips(data.tags);
        output = output.replace(/^[\t ]*\{\{#if tags\}\}[\s\S]*?\{\{\/if\}\}\n?/gm, tagChips ? `${tagChips}\n` : '');
    }

    // Conditional blocks for category, description, featured image, etc.
    output = replaceConditional(output, 'category', Boolean(data.category));
    output = replaceConditional(output, 'description', Boolean(data.description));
    output = replaceConditional(output, 'imageAlt', Boolean(data.imageAlt));
    output = replaceConditional(output, 'featuredImage', Boolean(data.featuredImage));

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

function normalizeMarkdown(content) {
    if (!content) {
        return '';
    }

    return content
        .replace(/\r\n/g, '\n')
        .replace(/\\([\\`*_{}\[\]()#+.!>\-])/g, '$1')
        .replace(/\]\(\[([^\]]+)\]\((https?:\/\/[^)]+)\)\)/g, ']($2)')
        .replace(/([A-Za-z0-9])\[/g, '$1 [')
        .replace(/(\*\*|__)(?=\[)/g, '$1 ');
}

function buildTagChips(tags) {
    if (!Array.isArray(tags) || !tags.length) {
        return '';
    }

    const containerIndent = ' '.repeat(12);
    const chipIndent = ' '.repeat(16);

    const chipMarkup = tags
        .map(tag => `${chipIndent}<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">#${escapeHtml(tag)}</span>`)
        .join('\n');

    return [
        `${containerIndent}<div class="flex flex-wrap gap-2">`,
        chipMarkup,
        `${containerIndent}</div>`
    ].join('\n');
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

function buildAuthorBlock(author) {
    if (!author || author === 'Digital Allies') {
        return '';
    }

    const containerIndent = ' '.repeat(16);
    const iconIndent = ' '.repeat(20);
    const pathIndent = ' '.repeat(24);

    return [
        `${containerIndent}<div class="flex items-center">`,
        `${iconIndent}<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">`,
        `${pathIndent}<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>`,
        `${iconIndent}</svg>`,
        `${iconIndent}By ${author}`,
        `${containerIndent}</div>`
    ].join('\n');
}

function readExistingIndex() {
    if (!fs.existsSync(INDEX_JSON_PATH)) {
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
        const raw = fs.readFileSync(INDEX_JSON_PATH, 'utf8');
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
    fs.writeFileSync(INDEX_JSON_PATH, JSON.stringify(index, null, 2));
}

function buildIndexHtml(index) {
    if (!fs.existsSync(INDEX_TEMPLATE_PATH)) {
        throw new Error(`Blog index template not found at ${INDEX_TEMPLATE_PATH}`);
    }

    const template = fs.readFileSync(INDEX_TEMPLATE_PATH, 'utf8');
    const postsMarkup = (index.posts || []).map(post => {
        const dateDisplay = formatDisplayDate(post.publishDate);
        const excerpt = escapeHtml(post.excerpt || 'Read the latest insights from Digital Allies.');
        const category = post.category ? `<span class="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium">${escapeHtml(post.category)}</span>` : '';

        const tagsMarkup = (post.tags || []).slice(0, 3).map(tag => `
                <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">#${escapeHtml(tag)}</span>`).join('');

        const moreTags = (post.tags || []).length > 3
            ? `<span class="text-gray-400 text-xs">+${post.tags.length - 3} more</span>`
            : '';

        return `
        <article class="bg-white/90 backdrop-blur rounded-2xl border border-pale-blue p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            ${category ? `<div class="mb-4">${category}</div>` : ''}
            <h2 class="text-3xl font-bold text-gray-dark mb-3">
                <a href="${escapeHtml(post.publicUrl)}" class="hover:underline text-primary-blue">
                    ${escapeHtml(post.title)}
                </a>
            </h2>
            <div class="flex flex-wrap items-center gap-3 text-sm text-gray-medium mb-4">
                <span>${dateDisplay}</span>
                <span>•</span>
                <span>${post.readingTime} min read</span>
                ${post.author && post.author !== 'Digital Allies' ? `<span>•</span><span>By ${escapeHtml(post.author)}</span>` : ''}
            </div>
            <p class="text-gray-medium mb-6 leading-relaxed">${excerpt}</p>
            ${(post.tags || []).length ? `<div class="flex flex-wrap gap-2 mb-6">${tagsMarkup}${moreTags}</div>` : ''}
            <a href="${escapeHtml(post.publicUrl)}" class="inline-flex items-center text-primary-blue font-semibold hover:underline group">
                Read More
                <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </article>`;
    }).join('\n');

    const populated = template
        .replace(/\{\{totalPosts\}\}/g, index.totalPosts || 0)
        .replace(/\{\{generatedAt\}\}/g, formatDisplayDate(index.lastUpdated))
        .replace(/\{\{posts\}\}/g, postsMarkup)
        .replace(/\{\{globalContextScript\}\}/g, buildContextScript());

    fs.writeFileSync(INDEX_HTML_PATH, populated, 'utf8');
    console.log(`📄  Rebuilt static blog index at ${INDEX_HTML_PATH}`);
}

function main() {
    ensureDir(CONTENT_DIR);
    ensureDir(POSTS_HTML_DIR);

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
        const markdownBody = normalizeMarkdown(body);

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

        const htmlContent = marked.parse(markdownBody, { mangle: false, headerIds: false });
        const wordCount = markdownBody ? markdownBody.split(/\s+/).filter(Boolean).length : 0;
        const readingTime = Math.max(1, Math.ceil(wordCount / 200));
        const excerpt = buildExcerpt({ description, markdown: markdownBody, html: htmlContent });

        const safeAuthor = escapeHtml(author);

        const canonicalUrl = buildCanonical(slug);
        const publicUrl = resolvePublicPostPath(slug);
        const rendered = renderTemplate(template, {
            title: escapeHtml(data.title),
            slug,
            description: escapeHtml(description),
            keywords: tags.map(escapeHtml).join(', '),
            category: escapeHtml(category),
            author: safeAuthor,
            authorBlock: buildAuthorBlock(safeAuthor),
            publishDate: publishDateIso,
            content: htmlContent,
            tags,
            wordCount,
            readingTime,
            featuredImage: escapeHtml(featuredImage),
            imageAlt: escapeHtml(featuredImageAlt),
            canonicalUrl,
            shareUrl: canonicalUrl,
            publicPostPath: publicUrl,
            globalContextScript: buildContextScript()
        });

        const postDir = resolveOutputDirectory(POSTS_HTML_DIR, slug);
        ensureDir(postDir);
        const postPath = path.join(postDir, 'index.html');
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
            imageAlt: featuredImageAlt,
            canonicalUrl,
            publicUrl: `${publicUrl}`
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
    buildIndexHtml(updatedIndex);
    console.log(`🗂️  Updated blog index with ${combinedPosts.length} posts.`);
}

try {
    main();
} catch (error) {
    console.error('❌ Pages CMS sync failed:', error);
    process.exit(1);
}
