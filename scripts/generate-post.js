#!/usr/bin/env node

/**
 * generate-post.js
 * CLI tool to generate a new blog post markdown file.
 * Updated to include 'description' and 'featuredImageAlt'.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const POSTS_DIR = path.join(__dirname, '..', 'content', 'blog');

// Ensure directory exists
if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
}

const questions = [
    { key: 'title', query: 'Post Title: ' },
    { key: 'slug', query: 'Slug (leave empty to auto-generate): ' },
    { key: 'description', query: 'Meta Description (SEO): ' },
    { key: 'author', query: 'Author (default: Digital Allies): ' },
    { key: 'category', query: 'Category: ' },
    { key: 'tags', query: 'Tags (comma separated): ' },
    { key: 'featuredImage', query: 'Featured Image Path (e.g., /images/post1.jpg): ' },
    { key: 'featuredImageAlt', query: 'Image Alt Text (Accessibility): ' }
];

const answers = {};

function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

function ask(index) {
    if (index === questions.length) {
        createPost();
        rl.close();
        return;
    }

    const q = questions[index];
    rl.question(q.query, (ans) => {
        answers[q.key] = ans.trim();
        ask(index + 1);
    });
}

function createPost() {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const slug = answers.slug || slugify(answers.title);
    const filename = `${slug}.md`;
    const filepath = path.join(POSTS_DIR, filename);
    
    // Handle tags array
    const tagsList = answers.tags 
        ? '\n' + answers.tags.split(',').map(t => `  - ${t.trim()}`).join('\n')
        : '';

    const author = answers.author || 'Digital Allies';

    const content = `---
title: "${answers.title.replace(/"/g, '\\"')}"
slug: ${slug}
publishDate: ${date}
author: "${author}"
description: "${answers.description.replace(/"/g, '\\"')}"
category: ${answers.category}
tags:${tagsList}
featuredImage: ${answers.featuredImage}
featuredImageAlt: "${answers.featuredImageAlt.replace(/"/g, '\\"')}"
---

# ${answers.title}

Write your content here...
`;

    fs.writeFileSync(filepath, content);
    console.log(`\n✅ Post created successfully: ${filepath}`);
}

console.log('📝 Generate New Blog Post\n');
ask(0);
