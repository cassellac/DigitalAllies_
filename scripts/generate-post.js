#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT_CONTENT_DIR = path.join(__dirname, '..', 'content');

function usage() {
    console.log(`
Digital Allies Content Generator

Usage: npm run generate -- --type=[blog|page] --title="Title" [options]

Options:
  --type="type"              (required) 'blog' or 'page'
  --title="Title"            (required) Title used for H1 and slug
  --slug="custom-slug"       Optional slug (auto-generated from title)
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
        type: 'blog',
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
        } else if (arg.startsWith('--type=')) {
            options.type = arg.substring(7).toLowerCase();
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
            options.date = arg.substring(7).replace(/^["']|["']$/g, '');
        }
    });

    if (!options.title) {
        console.error('❌ A --title value is required.');
        process.exit(1);
    }

    if (!['blog', 'page'].includes(options.type)) {
        console.error('❌ --type must be "blog" or "page".');
        process.exit(1);
    }

    if (!options.slug) {
        options.slug = options.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    return options;
}

function main() {
    const options = parseArgs();
    const targetDir = path.join(ROOT_CONTENT_DIR, options.type === 'page' ? 'pages' : 'blog');
    
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const filename = `${options.slug}.md`;
    const filePath = path.join(targetDir, filename);

    if (fs.existsSync(filePath)) {
        console.error(`❌ Content already exists: ${filePath}`);
        process.exit(1);
    }

    const frontMatter = {
        title: options.title,
        slug: options.slug,
        publishDate: options.date,
        author: options.author,
        description: options.description,
        category: options.category,
        tags: options.tags,
        // Page specific field support for the site loader
        ...(options.type === 'page' ? { heroImage: '' } : { featuredImage: '' })
    };

    const body = `# ${options.title}\n\nStart writing your ${options.type} content here.\n`;
    const fileContents = matter.stringify(body, frontMatter);
    
    fs.writeFileSync(filePath, fileContents, 'utf8');
    console.log(`✅ Created ${options.type} at content/${options.type === 'page' ? 'pages' : 'blog'}/${filename}`);
}

main();
