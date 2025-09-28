#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configuration
const CONFIG = {
    blogDir: path.join(__dirname, '..', 'blog'),
    templatesDir: path.join(__dirname, 'templates'),
    indexFile: path.join(__dirname, '..', 'blog', 'blog-index.json'),
    templateFile: path.join(__dirname, 'templates', 'post-template.html')
};

// Ensure directories exist
function ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
}

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        title: '',
        description: '',
        category: '',
        tags: [],
        author: 'Digital Allies',
        slug: '',
        contentFile: null,
    content: null,
    featuredImage: '',
    imageAlt: ''
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg.startsWith('--title=')) {
            options.title = arg.substring(8).replace(/['"]/g, '');
        } else if (arg.startsWith('--description=')) {
            options.description = arg.substring(14).replace(/['"]/g, '');
        } else if (arg.startsWith('--category=')) {
            options.category = arg.substring(11).replace(/['"]/g, '');
        } else if (arg.startsWith('--tags=')) {
            options.tags = arg.substring(7).replace(/['"]/g, '').split(',').map(t => t.trim()).filter(t => t);
        } else if (arg.startsWith('--author=')) {
            options.author = arg.substring(9).replace(/['"]/g, '');
        } else if (arg.startsWith('--slug=')) {
            options.slug = arg.substring(7).replace(/['"]/g, '');
        } else if (arg.startsWith('--contentFile=')) {
            options.contentFile = arg.substring(14).replace(/['"]/g, '');
        } else if (arg.startsWith('--content=')) {
            options.content = arg.substring(10).replace(/['"]/g, '');
        } else if (arg.startsWith('--featuredImage=')) {
            options.featuredImage = arg.substring(16).replace(/['"]/g, '');
        } else if (arg.startsWith('--imageAlt=')) {
            options.imageAlt = arg.substring(11).replace(/['"]/g, '');
        } else if (arg === '--help' || arg === '-h') {
            showHelp();
            process.exit(0);
        }
    }

    // Validate required fields
    if (!options.title) {
        console.error('Error: Title is required. Use --title="Your Post Title"');
        process.exit(1);
    }

    // Auto-generate slug if not provided
    if (!options.slug) {
        options.slug = generateSlug(options.title);
    }

    return options;
}

function showHelp() {
    console.log(`
Digital Allies Blog Post Generator

Usage: node generate-post.js [options]

Required Options:
  --title="Post Title"           The title of the blog post

Optional Options:
  --description="Description"    SEO description for the post
  --category="Category"          Post category (Web Development, SEO, etc.)
  --tags="tag1,tag2,tag3"       Comma-separated list of tags
  --author="Author Name"         Author name (defaults to "Digital Allies")
  --slug="post-slug"             URL slug (auto-generated from title if not provided)
  --contentFile="path.md"        Path to markdown file with post content
  --content="Markdown content"   Inline markdown content
    --featuredImage="URL"         Absolute/relative URL to featured image
    --imageAlt="Alt text"          Alt text for the featured image

Examples:
  node generate-post.js --title="SEO Best Practices" --description="Learn the latest SEO techniques" --category="SEO" --tags="seo,marketing"
  
  node generate-post.js --title="New Feature" --contentFile="content.md" --category="Development"

Note: If neither --contentFile nor --content is provided, a template post will be created.
    `);
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim()
        .substring(0, 60); // Limit length
}

function calculateReadingTime(wordCount) {
    return Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
}

function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Simple template replacement (no handlebars dependency)
function renderTemplate(template, data) {
    let result = template;
    
    // Replace simple variables
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, value);
    }
    
    // Handle tags array
    if (data.tags && Array.isArray(data.tags)) {
        const tagsHtml = data.tags.map(tag => 
            `    <meta property="article:tag" content="${escapeHtml(tag)}">`
        ).join('\n');
        result = result.replace(/{{#each tags}}[\s\S]*?{{\/each}}/g, tagsHtml);
        
        // Tags in content
        const tagsContentHtml = data.tags.map(tag => 
            `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">#${escapeHtml(tag)}</span>`
        ).join('\n                ');
        result = result.replace(/{{#if tags}}[\s\S]*?{{\/if}}/g, 
            data.tags.length > 0 ? 
            `<div class="flex flex-wrap gap-2">\n                ${tagsContentHtml}\n            </div>` : 
            '');
    }
    
    // Handle category conditionals
    if (data.category) {
        result = result.replace(/{{#if category}}([\s\S]*?){{\/if}}/g, '$1');
    } else {
        result = result.replace(/{{#if category}}[\s\S]*?{{\/if}}/g, '');
    }
    
    // Handle description conditionals  
    if (data.description) {
        result = result.replace(/{{#if description}}([\s\S]*?){{\/if}}/g, '$1');
    } else {
        result = result.replace(/{{#if description}}[\s\S]*?{{\/if}}/g, '');
    }
    
    // Handle author conditionals
    result = result.replace(/{{#if author}}{{#unless \(eq author "Digital Allies"\)}}([\s\S]*?){{\/unless}}{{\/if}}/g, 
        (data.author && data.author !== 'Digital Allies') ? '$1' : '');
    
    // Format date
    result = result.replace(/{{formatDate publishDate}}/g, formatDate(new Date(data.publishDate)));
    
    return result;
}

function loadBlogIndex() {
    try {
        if (fs.existsSync(CONFIG.indexFile)) {
            const content = fs.readFileSync(CONFIG.indexFile, 'utf8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.warn('Warning: Could not load blog index, creating new one');
    }
    
    return {
        posts: [],
        categories: [],
        tags: [],
        lastUpdated: new Date().toISOString(),
        totalPosts: 0
    };
}

function saveBlogIndex(index) {
    fs.writeFileSync(CONFIG.indexFile, JSON.stringify(index, null, 2), 'utf8');
}

function updateBlogIndex(postData) {
    const index = loadBlogIndex();
    
    // Remove existing post if updating
    const existingIndex = index.posts.findIndex(post => post.slug === postData.slug);
    if (existingIndex >= 0) {
        index.posts.splice(existingIndex, 1);
        console.log(`Updating existing post: ${postData.slug}`);
    } else {
        console.log(`Adding new post: ${postData.slug}`);
    }
    
    // Add/update post
    index.posts.unshift({
        title: postData.title,
        slug: postData.slug,
        description: postData.description,
        category: postData.category,
        author: postData.author,
        publishDate: postData.publishDate,
        tags: postData.tags,
        wordCount: postData.wordCount,
        readingTime: postData.readingTime,
    excerpt: postData.description || postData.content.substring(0, 160) + '...',
    featuredImage: postData.featuredImage || '',
    imageAlt: postData.imageAlt || ''
    });
    
    // Update categories
    if (postData.category && !index.categories.includes(postData.category)) {
        index.categories.push(postData.category);
        index.categories.sort();
    }
    
    // Update tags
    postData.tags.forEach(tag => {
        if (!index.tags.includes(tag)) {
            index.tags.push(tag);
        }
    });
    index.tags.sort();
    
    // Update metadata
    index.totalPosts = index.posts.length;
    index.lastUpdated = new Date().toISOString();
    
    saveBlogIndex(index);
}

function generatePost(options) {
    // Ensure directories exist
    ensureDirExists(CONFIG.blogDir);
    ensureDirExists(CONFIG.templatesDir);
    
    // Get content
    let markdownContent = '';
    if (options.contentFile) {
        const contentPath = path.resolve(options.contentFile);
        if (fs.existsSync(contentPath)) {
            markdownContent = fs.readFileSync(contentPath, 'utf8');
        } else {
            console.error(`Error: Content file not found: ${contentPath}`);
            process.exit(1);
        }
    } else if (options.content) {
        markdownContent = options.content;
    } else {
        // Default template content
        markdownContent = `# ${options.title}

${options.description || 'This is a new blog post generated using the CLI tool.'}

## Introduction

Write your introduction here...

## Main Content

Add your main content here. You can use:

- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://digitalallies.net)

### Code Example

\`\`\`javascript
console.log('Hello, Digital Allies!');
\`\`\`

## Conclusion

Wrap up your post here...
`;
    }
    
    // Convert markdown to HTML
    const htmlContent = marked(markdownContent);
    const wordCount = countWords(markdownContent);
    const readingTime = calculateReadingTime(wordCount);
    const publishDate = new Date().toISOString();
    
    // Load template
    if (!fs.existsSync(CONFIG.templateFile)) {
        console.error(`Error: Template file not found: ${CONFIG.templateFile}`);
        process.exit(1);
    }
    
    const template = fs.readFileSync(CONFIG.templateFile, 'utf8');
    
    // Prepare template data
    const templateData = {
        title: escapeHtml(options.title),
        slug: options.slug,
        description: escapeHtml(options.description),
        keywords: options.tags.map(escapeHtml).join(', '),
        category: escapeHtml(options.category),
        author: escapeHtml(options.author),
        publishDate: publishDate,
        content: htmlContent,
        tags: options.tags,
        wordCount: wordCount,
    readingTime: readingTime,
    featuredImage: escapeHtml(options.featuredImage || ''),
    imageAlt: escapeHtml(options.imageAlt || '')
    };
    
    // Render template
    const finalHtml = renderTemplate(template, templateData);
    
    // Save post file
    const postPath = path.join(CONFIG.blogDir, `${options.slug}.html`);
    fs.writeFileSync(postPath, finalHtml, 'utf8');
    
    // Update blog index
    updateBlogIndex({
        title: options.title,
        slug: options.slug,
        description: options.description,
        category: options.category,
        author: options.author,
        publishDate: publishDate,
        tags: options.tags,
        wordCount: wordCount,
        readingTime: readingTime,
    content: markdownContent,
    featuredImage: options.featuredImage,
    imageAlt: options.imageAlt
    });
    
    console.log(`✅ Blog post created successfully!`);
    console.log(`📄 File: ${postPath}`);
    console.log(`🔗 URL: /blog/${options.slug}.html`);
    console.log(`📊 Stats: ${wordCount} words, ${readingTime} min read`);
    console.log(`🏷️  Tags: ${options.tags.join(', ') || 'None'}`);
    console.log(`📚 Category: ${options.category || 'None'}`);
}

// Main execution
function main() {
    try {
        const options = parseArgs();
        generatePost(options);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Run only if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generatePost,
    parseArgs,
    loadBlogIndex,
    saveBlogIndex,
    updateBlogIndex
};