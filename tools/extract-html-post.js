#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

function usage() {
    console.error('Usage: node tools/extract-html-post.js <input-file> [output-file]');
}

const [, , inputPath, outputPath] = process.argv;

if (!inputPath) {
    usage();
    process.exit(1);
}

const resolvedInput = path.resolve(process.cwd(), inputPath);
if (!fs.existsSync(resolvedInput)) {
    console.error(`Input file not found: ${resolvedInput}`);
    process.exit(1);
}

const html = fs.readFileSync(resolvedInput, 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

const meta = {
    title: '',
    slug: '',
    publishDate: '',
    author: 'Digital Allies',
    description: '',
    category: '',
    tags: [],
    featuredImage: '',
    featuredImageAlt: ''
};

const titleElement = document.querySelector('meta[property="og:title"]') || document.querySelector('title');
if (titleElement) {
    if (titleElement.getAttribute) {
        meta.title = titleElement.getAttribute('content') || '';
    } else {
        meta.title = titleElement.textContent || '';
    }
    meta.title = meta.title.replace(/ - Digital Allies$/, '').trim();
}

const canonical = document.querySelector('link[rel="canonical"]');
if (canonical) {
    const href = canonical.getAttribute('href');
    if (href) {
        const parts = href.split('/');
        const last = parts.pop() || parts.pop();
        if (last) {
            meta.slug = last.replace(/\.html?$/, '');
        }
    }
}

const descriptionMeta = document.querySelector('meta[name="description"]');
if (descriptionMeta) {
    meta.description = descriptionMeta.getAttribute('content') || '';
}

const categoryMeta = document.querySelector('meta[property="article:section"]');
if (categoryMeta) {
    meta.category = categoryMeta.getAttribute('content') || '';
}

const publishMeta = document.querySelector('meta[property="article:published_time"]');
if (publishMeta) {
    meta.publishDate = publishMeta.getAttribute('content') || '';
}

const authorMeta = document.querySelector('meta[name="author"]') || document.querySelector('meta[property="article:author"]');
if (authorMeta) {
    meta.author = authorMeta.getAttribute('content') || meta.author;
}

const tagMeta = Array.from(document.querySelectorAll('meta[property="article:tag"]'));
if (tagMeta.length) {
    meta.tags = tagMeta.map(tag => (tag.getAttribute('content') || '').trim()).filter(Boolean);
}

const featuredImageMeta = document.querySelector('meta[property="og:image"]');
if (featuredImageMeta) {
    meta.featuredImage = featuredImageMeta.getAttribute('content') || '';
}

const featuredImageAltMeta = document.querySelector('meta[property="og:image:alt"], meta[name="twitter:image:alt"]');
if (featuredImageAltMeta) {
    meta.featuredImageAlt = featuredImageAltMeta.getAttribute('content') || '';
}

const turndown = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced'
});

turndown.addRule('strikethrough', {
    filter: ['del', 's'],
    replacement: function (content) {
        return '~~' + content + '~~';
    }
});

turndown.keep(['table', 'thead', 'tbody', 'tr', 'th', 'td']);

turndown.addRule('hr', {
    filter: 'hr',
    replacement: function () {
        return '\n\n---\n\n';
    }
});

const article = document.querySelector('article .content')
    || document.querySelector('article')
    || document.querySelector('main')
    || document.body;

const markdown = turndown.turndown(article.innerHTML || '');

const frontMatterLines = ['---'];
frontMatterLines.push(`title: "${meta.title.replace(/"/g, '\\"')}"`);
if (meta.slug) {
    frontMatterLines.push(`slug: "${meta.slug}"`);
}
if (meta.publishDate) {
    frontMatterLines.push(`publishDate: ${meta.publishDate}`);
}
if (meta.author && meta.author !== 'Digital Allies') {
    frontMatterLines.push(`author: "${meta.author.replace(/"/g, '\\"')}"`);
} else {
    frontMatterLines.push('author: "Digital Allies"');
}
if (meta.description) {
    frontMatterLines.push(`description: "${meta.description.replace(/"/g, '\\"')}"`);
}
if (meta.category) {
    frontMatterLines.push(`category: "${meta.category.replace(/"/g, '\\"')}"`);
}
if (meta.tags.length) {
    frontMatterLines.push('tags:');
    meta.tags.forEach(tag => {
        frontMatterLines.push(`  - ${tag}`);
    });
}
if (meta.featuredImage) {
    frontMatterLines.push(`featuredImage: "${meta.featuredImage.replace(/"/g, '\\"')}"`);
}
if (meta.featuredImageAlt) {
    frontMatterLines.push(`featuredImageAlt: "${meta.featuredImageAlt.replace(/"/g, '\\"')}"`);
}
frontMatterLines.push('---\n');

const output = frontMatterLines.join('\n') + markdown.trim() + '\n';

if (outputPath) {
    const resolvedOutput = path.resolve(process.cwd(), outputPath);
    fs.writeFileSync(resolvedOutput, output, 'utf8');
    console.log(`Converted ${inputPath} -> ${outputPath}`);
} else {
    process.stdout.write(output);
}
