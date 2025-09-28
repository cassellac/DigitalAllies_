#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    blogDir: path.join(__dirname, '..', 'blog'),
    indexFile: path.join(__dirname, '..', 'blog', 'blog-index.json')
};

/**
 * Extract metadata from HTML blog post
 */
function extractMetadataFromHtml(htmlPath) {
    try {
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const metadata = {};
        
        // Extract title
        const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
        if (titleMatch) {
            metadata.title = titleMatch[1].replace(' - Digital Allies', '').trim();
        }
        
        // Extract meta description
        const descMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
        if (descMatch) {
            metadata.description = descMatch[1];
        }
        
        // Extract keywords/tags
        const keywordsMatch = htmlContent.match(/<meta name="keywords" content="(.*?)"/);
        if (keywordsMatch && keywordsMatch[1]) {
            metadata.tags = keywordsMatch[1].split(',').map(tag => tag.trim()).filter(tag => tag);
        } else {
            metadata.tags = [];
        }
        
        // Extract author
        const authorMatch = htmlContent.match(/<meta name="author" content="(.*?)"/);
        metadata.author = authorMatch ? authorMatch[1] : 'Digital Allies';
        
        // Extract category from article:section meta tag
        const categoryMatch = htmlContent.match(/<meta property="article:section" content="(.*?)"/);
        metadata.category = categoryMatch ? categoryMatch[1] : '';
        
        // Extract publish date
        const publishMatch = htmlContent.match(/<meta property="article:published_time" content="(.*?)"/);
        if (publishMatch) {
            metadata.publishDate = publishMatch[1];
        } else {
            // Fallback to file creation date
            const stats = fs.statSync(htmlPath);
            metadata.publishDate = stats.birthtime.toISOString();
        }
        
        // Extract word count from structured data
        const wordCountMatch = htmlContent.match(/"wordCount": (\d+)/);
        metadata.wordCount = wordCountMatch ? parseInt(wordCountMatch[1]) : 0;

        // Extract featured image (og:image) and alt
        const ogImageMatch = htmlContent.match(/<meta property="og:image" content="(.*?)"/);
        if (ogImageMatch) {
            metadata.featuredImage = ogImageMatch[1];
        }
        const ogImageAltMatch = htmlContent.match(/<meta (?:name|property)="og:image:alt" content="(.*?)"/);
        if (ogImageAltMatch) {
            metadata.imageAlt = ogImageAltMatch[1];
        }
        
        // Calculate reading time
        metadata.readingTime = Math.ceil(metadata.wordCount / 200);
        
        // Generate excerpt from content or use description
        if (!metadata.description) {
            const contentMatch = htmlContent.match(/<div class="prose[\s\S]*?>([\s\S]*?)<\/div>/);
            if (contentMatch) {
                const textContent = contentMatch[1]
                    .replace(/<[^>]*>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                metadata.excerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '');
            }
        } else {
            metadata.excerpt = metadata.description;
        }
        
        return metadata;
    } catch (error) {
        console.warn(`Warning: Could not extract metadata from ${htmlPath}: ${error.message}`);
        return null;
    }
}

/**
 * Get slug from filename
 */
function getSlugFromFilename(filename) {
    return path.basename(filename, '.html');
}

/**
 * Scan blog directory for HTML files and extract metadata
 */
function scanBlogPosts() {
    const posts = [];
    const categories = new Set();
    const tags = new Set();
    
    if (!fs.existsSync(CONFIG.blogDir)) {
        console.warn(`Blog directory does not exist: ${CONFIG.blogDir}`);
        return { posts, categories: [], tags: [] };
    }
    
    const files = fs.readdirSync(CONFIG.blogDir);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
    
    console.log(`Found ${htmlFiles.length} blog post(s) to process...`);
    
    htmlFiles.forEach(filename => {
        const filePath = path.join(CONFIG.blogDir, filename);
        const slug = getSlugFromFilename(filename);
        
        console.log(`Processing: ${filename}`);
        
        const metadata = extractMetadataFromHtml(filePath);
        if (metadata) {
            const post = {
                title: metadata.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                slug: slug,
                description: metadata.description || '',
                category: metadata.category || '',
                author: metadata.author || 'Digital Allies',
                publishDate: metadata.publishDate,
                tags: metadata.tags || [],
                wordCount: metadata.wordCount || 0,
                readingTime: metadata.readingTime || 1,
                excerpt: metadata.excerpt || metadata.description || 'Read this interesting post...',
                featuredImage: metadata.featuredImage || '',
                imageAlt: metadata.imageAlt || ''
            };
            
            posts.push(post);
            
            // Collect categories and tags
            if (post.category) {
                categories.add(post.category);
            }
            post.tags.forEach(tag => tags.add(tag));
            
            console.log(`  ✓ ${post.title} (${post.wordCount} words, ${post.readingTime} min read)`);
        }
    });
    
    return {
        posts,
        categories: Array.from(categories).sort(),
        tags: Array.from(tags).sort()
    };
}

/**
 * Build and save the blog index
 */
function rebuildIndex(options = {}) {
    console.log('🔄 Rebuilding blog index...');
    
    const { posts, categories, tags } = scanBlogPosts();
    
    // Sort posts by publish date (newest first)
    posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    
    const index = {
        posts: posts,
        categories: categories,
        tags: tags,
        lastUpdated: new Date().toISOString(),
        totalPosts: posts.length,
        metadata: {
            generatedBy: 'rebuild-index.js',
            generatedAt: new Date().toISOString(),
            version: '1.0.0'
        }
    };
    
    // Create blog directory if it doesn't exist
    if (!fs.existsSync(CONFIG.blogDir)) {
        fs.mkdirSync(CONFIG.blogDir, { recursive: true });
        console.log(`Created blog directory: ${CONFIG.blogDir}`);
    }
    
    // Save index
    try {
        fs.writeFileSync(CONFIG.indexFile, JSON.stringify(index, null, 2), 'utf8');
        
        console.log(`✅ Blog index rebuilt successfully!`);
        console.log(`📄 Index file: ${CONFIG.indexFile}`);
        console.log(`📊 Statistics:`);
        console.log(`   • Posts: ${posts.length}`);
        console.log(`   • Categories: ${categories.length} (${categories.join(', ') || 'None'})`);
        console.log(`   • Tags: ${tags.length} (${tags.slice(0, 10).join(', ')}${tags.length > 10 ? '...' : ''})`);
        
        if (options.verbose) {
            console.log('\n📋 Posts:');
            posts.forEach((post, i) => {
                console.log(`   ${i + 1}. ${post.title} (${post.slug}) - ${new Date(post.publishDate).toDateString()}`);
            });
        }
        
    } catch (error) {
        console.error(`Error saving index file: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Show help
 */
function showHelp() {
    console.log(`
Digital Allies Blog Index Rebuilder

Usage: node rebuild-index.js [options]

Options:
  --verbose, -v      Show detailed information about processed posts
  --help, -h         Show this help message

Description:
  This script scans the blog directory for HTML files and rebuilds the blog-index.json
  file with metadata extracted from each post. This is useful when:
  
  - Posts have been manually added or edited
  - The index file is corrupted or missing
  - You need to refresh metadata after bulk changes
  
  The script automatically extracts:
  - Title, description, author
  - Categories and tags
  - Publish dates and word counts
  - Reading time estimates

Examples:
  node rebuild-index.js           # Rebuild index quietly
  node rebuild-index.js -v        # Rebuild with verbose output
    `);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        verbose: false
    };
    
    args.forEach(arg => {
        switch (arg) {
            case '--verbose':
            case '-v':
                options.verbose = true;
                break;
            case '--help':
            case '-h':
                showHelp();
                process.exit(0);
                break;
            default:
                console.warn(`Warning: Unknown argument: ${arg}`);
        }
    });
    
    return options;
}

/**
 * Validate blog directory structure
 */
function validateStructure() {
    const issues = [];
    
    if (!fs.existsSync(CONFIG.blogDir)) {
        issues.push(`Blog directory missing: ${CONFIG.blogDir}`);
    }
    
    return issues;
}

/**
 * Main execution
 */
function main() {
    try {
        const options = parseArgs();
        
        // Validate structure
        const issues = validateStructure();
        if (issues.length > 0) {
            console.warn('⚠️  Validation warnings:');
            issues.forEach(issue => console.warn(`   • ${issue}`));
            console.log(''); // Empty line
        }
        
        rebuildIndex(options);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (options && options.verbose) {
            console.error(error.stack);
        }
        process.exit(1);
    }
}

// Run only if called directly
if (require.main === module) {
    main();
}

module.exports = {
    rebuildIndex,
    scanBlogPosts,
    extractMetadataFromHtml,
    parseArgs
};