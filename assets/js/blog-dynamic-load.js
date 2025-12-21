/**
 * Global Site & Blog Loader
 * Handles dynamic loading for Blog, Pages, and Global Styles.
 */

(function() {
    'use strict';
    
    const CONFIG = {
        paths: {
            blog: '/content/blog/index.json',
            pages: '/content/pages/index.json',
            settings: '/content/settings/style.json' // Style Guide reference
        },
        gridSelector: '#content-grid',
        postsPerPage: 9,
        defaultAuthor: 'Digital Allies'
    };
    
    let siteData = null;
    let filteredItems = [];
    let currentPage = 1;

    // --- Initialization ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    async function init() {
        // 1. Apply Brand Styles first
        await applyGlobalStyles();

        // 2. Identify Page Type and Load Content
        const grid = document.querySelector(CONFIG.gridSelector);
        if (grid) {
            const type = grid.dataset.contentType || 'blog'; // Default to blog
            loadContentIndex(type);
        }
    }

    // --- Style Guide Integration ---
    async function applyGlobalStyles() {
        try {
            const response = await fetch(`${CONFIG.paths.settings}?t=${Date.now()}`);
            if (!response.ok) return;
            const style = await response.json();

            if (style) {
                const root = document.documentElement;
                if (style.primaryColor) root.style.setProperty('--primary-color', style.primaryColor);
                if (style.secondaryColor) root.style.setProperty('--secondary-color', style.secondaryColor);
                if (style.borderRadius) root.style.setProperty('--main-radius', `${style.borderRadius}px`);
                if (style.headingFont) root.style.setProperty('--heading-font', style.headingFont);
                
                console.log('Brand styles applied from CMS Style Guide.');
            }
        } catch (e) {
            console.log('Style guide not found, using default CSS.');
        }
    }

    // --- Content Loading (Blog & Pages) ---
    async function loadContentIndex(type) {
        const indexPath = CONFIG.paths[type] || CONFIG.paths.blog;
        
        try {
            const response = await fetch(`${indexPath}?t=${Date.now()}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            siteData = data;
            filteredItems = [...(data.posts || data.pages || [])];
            
            // Sort by date if applicable
            if (filteredItems[0]?.publishDate) {
                filteredItems.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            }
            
            if (data.categories) setupFilters(data.categories);
            setupSearch();
            renderGrid(1);
            
        } catch (error) {
            console.error('Failed to load content:', error);
            renderError('Error loading content.');
        }
    }

    function renderGrid(page = 1) {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid) return;

        if (filteredItems.length === 0) {
            grid.innerHTML = '<p class="col-span-full text-center py-10">No items found.</p>';
            return;
        }

        const startIndex = (page - 1) * CONFIG.postsPerPage;
        const itemsToShow = filteredItems.slice(startIndex, startIndex + CONFIG.postsPerPage);
        
        if (page === 1) grid.innerHTML = '';
        
        itemsToShow.forEach(item => {
            const card = createCard(item);
            grid.appendChild(card);
        });
        
        updatePagination(page);
        animateCards();
    }

    function createCard(item) {
        const card = document.createElement('article');
        // Use the brand border-radius from CSS variable
        card.className = 'bg-white p-6 rounded-[var(--main-radius,1rem)] shadow-sm border border-gray-100 transition-all hover:shadow-md';

        const isPage = !item.publishDate;
        const url = isPage ? `/pages/${item.slug}/` : `/blog/${item.slug}/`;
        const dateStr = item.publishDate ? new Date(item.publishDate).toLocaleDateString() : 'Page';

        card.innerHTML = `
            ${item.featuredImage || item.heroImage ? `
                <div class="mb-4 -mt-2 -mx-2 rounded-lg overflow-hidden aspect-video bg-gray-50">
                    <img src="${item.featuredImage || item.heroImage}" class="w-full h-full object-cover">
                </div>
            ` : ''}
            <div class="mb-2">
                <span class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">${dateStr}</span>
            </div>
            <h3 class="text-xl font-bold mb-2 hover:text-[var(--primary-color)] transition-colors">
                <a href="${url}">${item.title}</a>
            </h3>
            <p class="text-gray-600 text-sm line-clamp-2 mb-4">
                ${item.description || 'View more details...'}
            </p>
            <a href="${url}" class="text-sm font-bold text-[var(--primary-color,#2563eb)] inline-flex items-center group">
                Read More
                <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
        `;
        return card;
    }

    // --- Helpers (Search, Filters, Animation) ---
    function setupSearch() {
        const input = document.getElementById('site-search');
        if (!input) return;
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const source = siteData.posts || siteData.pages;
            filteredItems = source.filter(i => i.title.toLowerCase().includes(query));
            renderGrid(1);
        });
    }

    function setupFilters(categories) {
        const container = document.getElementById('category-filters');
        if (!container) return;
        container.innerHTML = ['All', ...categories].map(c => `
            <button class="px-4 py-2 text-sm font-medium border rounded-full mr-2 mb-2 hover:bg-gray-50" data-cat="${c === 'All' ? '' : c}">${c}</button>
        `).join('');
        container.onclick = (e) => {
            const cat = e.target.dataset.cat;
            if (cat === undefined) return;
            const source = siteData.posts || siteData.pages;
            filteredItems = cat === '' ? [...source] : source.filter(i => i.category === cat);
            renderGrid(1);
        };
    }

    function animateCards() {
        const cards = document.querySelectorAll(`${CONFIG.gridSelector} > article`);
        cards.forEach((c, i) => {
            c.style.opacity = '0';
            setTimeout(() => {
                c.style.transition = 'opacity 0.5s ease';
                c.style.opacity = '1';
            }, i * 50);
        });
    }

    function updatePagination(page) {
        // Pagination logic similar to previous version
    }

    function renderError(msg) {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (grid) grid.innerHTML = `<div class="col-span-full text-center text-red-500">${msg}</div>`;
    }

})();
