import { defineConfig } from 'vite';
import { resolve, join, relative } from 'path';
import { readdirSync, statSync } from 'fs';

function getHtmlFiles(dir) {
  const files = {};

  function traverse(currentDir) {
    const entries = readdirSync(currentDir);

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (entry.endsWith('.html')) {
        // Create a unique key based on the relative path
        // e.g., content/posts/slug/index.html -> content-posts-slug
        const relPath = relative(__dirname, fullPath);
        const name = relPath.replace(/\.html$/, '').replace(/\//g, '-');
        files[name] = fullPath;
      }
    }
  }

  if (statSync(dir).isDirectory()) {
    traverse(dir);
  }

  return files;
}

// Get all HTML files from content directory
const contentFiles = getHtmlFiles(resolve(__dirname, 'content'));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        'knowledge-base': resolve(__dirname, 'knowledge-base.html'),
        'accessibility-guide': resolve(__dirname, 'accessibility-guide.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        ...contentFiles
      },
    },
  },
  server: {
    open: true,
  },
});
