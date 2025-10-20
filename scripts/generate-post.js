#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content');

function usage() {
    console.log(`
Digital Allies Markdown Post Generator

Usage: npm run generate-post -- --title="Post Title" [options]

Options:
  --title="Title"            (required) Post title used for the H1 and slug
  --slug="custom-slug"       Optional slug (auto-generated from title if omitted)
  --description="Summary"    Optional SEO description
  --category="Category"      Optional category label
  --tags="tag-one,tag-two"   Optional comma separated list of tags
  --author="Author Name"     Optional author (defaults to "Digital Allies")
  --date=YYYY-MM-DD          Optional publish date (defaults to today)
`);
}

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        title: '',
        slug: '',
        description: '',
        category: '',
        tags: [],
        author: 'Digital Allies',
        date: new Date().toISOString().slice(0, 10)
    };

    args.forEach(arg => {
        if (arg === '--help' || arg === '-h') {
            usage();
            process.exit(0);
        } else if (arg.startsWith('--title=')) {
            options.title = arg.substring(8).replace(/^["']|["']$/g, '');
        } else if (arg.startsWith('--slug=')) {
            options.slug = arg.substring(7).replace(/^["']|["']$/g, '');
        } else if (arg.startsWith('--description=')) {
            options.description = arg.substring(14).replace(/^["']|["']$/g, '');
        } else if (arg.startsWith('--category=')) {
            options.category = arg.substring(11).replace(/^["']|["']$/g, '');
        } else if (arg.startsWith('--tags=')) {
            const raw = arg.substring(7).replace(/^["']|["']$/g, '');
            options.tags = raw.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (arg.startsWith('--author=')) {
            options.author = arg.substring(9).replace(/^["']|["']$/g, '') || 'Digital Allies';
        } else if (arg.startsWith('--date=')) {
            const value = arg.substring(7).replace(/^["']|["']$/g, '');
            if (value) {
                options.date = value;
            }
        }
    });

    if (!options.title) {
        console.error('❌  A --title value is required. Use --help to see usage.');
        process.exit(1);
    }

    if (!options.slug) {
        options.slug = generateSlug(options.title);
    }

    return options;
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

function ensureContentDir() {
    if (!fs.existsSync(CONTENT_DIR)) {
        fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }
}

function createPostFile(options) {
    ensureContentDir();
    const filename = `${options.slug}.md`;
    if (options.slug.includes('..')) {
        console.error(`❌  Invalid slug: '${options.slug}'`);
        process.exit(1);
    }
    const filePath = path.join(CONTENT_DIR, filename);

    if (fs.existsSync(filePath)) {
        console.error(`❌  A post with slug '${options.slug}' already exists at content/${filename}.`);
        process.exit(1);
    }

    const frontMatter = {
        title: options.title,
        slug: options.slug,
        publishDate: options.date,
        author: options.author,
        description: options.description,
        category: options.category,
        tags: options.tags
    };

    const body = `# ${options.title}\n\nStart writing your post content here.\n`;

    const fileContents = matter.stringify(body, frontMatter);
    fs.writeFileSync(filePath, fileContents, 'utf8');

    console.log(`✅  Created content/${filename}`);
    console.log('Next steps:');
    console.log('  1. Edit the markdown file with your article content.');
    console.log('  2. Run "npm run sync-cms" to regenerate the HTML blog post and index.');
}

function main() {
    const options = parseArgs();
    createPostFile(options);
}

main();
