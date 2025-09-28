/**
 * Blog Dynamic Load Script
 * Dynamically loads blog posts from blog-index.json and injects them into the blog grid
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        indexPath: 'blog/blog-index.json',
        blogPath: 'blog/',
        postsPerPage: 9,
        gridSelector: '#blog-posts-grid'
    };
    
    // State
    let blogIndex = null;
    let currentPage = 1;
    let filteredPosts = [];
    let isLoading = false;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid) {
            console.warn('Blog grid element not found. Looking for:', CONFIG.gridSelector);
            return;
        }
        
        loadBlogIndex();
        setupSearch();
        setupFilters();
    }
    
    async function loadBlogIndex() {
        if (isLoading) return;
        isLoading = true;
        
        try {
            const response = await fetch(CONFIG.indexPath + '?t=' + Date.now());
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            blogIndex = await response.json();
            filteredPosts = [...(blogIndex.posts || [])];
            
            // Sort posts by date (newest first)
            filteredPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            
            renderPosts();
            updateStats();
            
        } catch (error) {
            console.error('Failed to load blog index:', error);
            renderError('Unable to load blog posts. Please try again later.');
        } finally {
            isLoading = false;
        }
    }
    
    function renderPosts(page = 1) {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid || !filteredPosts.length) {
            renderEmptyState();
            return;
        }
        
        const startIndex = (page - 1) * CONFIG.postsPerPage;
        const endIndex = startIndex + CONFIG.postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        if (page === 1) {
            grid.innerHTML = '';
        }
        
        postsToShow.forEach(post => {
            const postElement = createPostCard(post);
            grid.appendChild(postElement);
        });
        
        // Update pagination if needed
        updatePagination(page);
        
        // Animate cards
        animateCards();
    }
    
    function createPostCard(post) {
        const card = document.createElement('article');
        card.className = 'bg-white p-6 rounded-2xl gradient-shadow border border-pale-blue transition-transform hover:scale-105';
        
        const publishDate = new Date(post.publishDate);
        const readingTime = calculateReadingTime(post.wordCount || 0);
        const excerpt = post.description || post.excerpt || 'Read this interesting post...';
        
        card.innerHTML = `
            ${post.category ? `<div class="mb-3">
                <span class="bg-primary-blue text-white px-2 py-1 rounded-full text-xs font-medium">
                    ${escapeHtml(post.category)}
                </span>
            </div>` : ''}
            
            <h3 class="text-2xl font-bold text-gray-dark mb-2 line-clamp-2">
                ${escapeHtml(post.title)}
            </h3>
            
            <div class="text-sm text-gray-medium mb-3 flex items-center space-x-3">
                <span>${publishDate.toLocaleDateString()}</span>
                <span>•</span>
                <span>${readingTime} read</span>
                ${post.author && post.author !== 'Digital Allies' ? `<span>•</span><span>By ${escapeHtml(post.author)}</span>` : ''}
            </div>
            
            <p class="text-gray-medium mb-4 line-clamp-3">
                ${escapeHtml(excerpt)}
            </p>
            
            ${post.tags && post.tags.length > 0 ? `
                <div class="mb-4 flex flex-wrap gap-1">
                    ${post.tags.slice(0, 3).map(tag => 
                        `<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            #${escapeHtml(tag)}
                        </span>`
                    ).join('')}
                    ${post.tags.length > 3 ? '<span class="text-gray-400 text-xs">+' + (post.tags.length - 3) + ' more</span>' : ''}
                </div>
            ` : ''}
            
            <a href="${CONFIG.blogPath}${escapeHtml(post.slug)}.html" 
               class="text-primary-blue hover:underline font-medium inline-flex items-center group"
               data-post-slug="${escapeHtml(post.slug)}">
                Read More
                <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        `;
        
        // Add click tracking
        const link = card.querySelector('a[data-post-slug]');
        if (link) {
            link.addEventListener('click', (e) => {
                trackPostClick(post.slug, post.title);
            });
        }
        
        return card;
    }
    
    function renderEmptyState() {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No Posts Found</h3>
                <p class="text-gray-500">We're working on some great content. Check back soon!</p>
            </div>
        `;
    }
    
    function renderError(message) {
        const grid = document.querySelector(CONFIG.gridSelector);
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-red-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Oops!</h3>
                <p class="text-gray-500">${escapeHtml(message)}</p>
                <button onclick="location.reload()" class="mt-4 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Try Again
                </button>
            </div>
        `;
    }
    
    function setupSearch() {
        // Create search interface if it doesn't exist
        let searchContainer = document.getElementById('blog-search');
        if (!searchContainer) {
            const grid = document.querySelector(CONFIG.gridSelector);
            if (grid && grid.parentElement) {
                searchContainer = document.createElement('div');
                searchContainer.id = 'blog-search';
                searchContainer.className = 'mb-8 max-w-md mx-auto';
                searchContainer.innerHTML = `
                    <div class="relative">
                        <input type="text" id="blog-search-input" 
                               placeholder="Search blog posts..." 
                               class="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-blue focus:border-primary-blue">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                `;
                grid.parentElement.insertBefore(searchContainer, grid);
            }
        }
        
        const searchInput = document.getElementById('blog-search-input');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    performSearch(e.target.value);
                }, 300);
            });
        }
    }
    
    function setupFilters() {
        // Create category filter if it doesn't exist
        let filterContainer = document.getElementById('blog-filters');
        if (!filterContainer && blogIndex && blogIndex.categories && blogIndex.categories.length > 1) {
            const searchContainer = document.getElementById('blog-search');
            if (searchContainer) {
                filterContainer = document.createElement('div');
                filterContainer.id = 'blog-filters';
                filterContainer.className = 'mb-6 text-center';
                
                const categories = ['All', ...blogIndex.categories];
                filterContainer.innerHTML = `
                    <div class="flex flex-wrap justify-center gap-2">
                        ${categories.map(category => `
                            <button class="category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors
                                          ${category === 'All' ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                                    data-category="${category === 'All' ? '' : escapeHtml(category)}">
                                ${escapeHtml(category)}
                            </button>
                        `).join('')}
                    </div>
                `;
                
                searchContainer.parentElement.insertBefore(filterContainer, searchContainer.nextSibling);
                
                // Add event listeners
                filterContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('category-filter')) {
                        // Update active state
                        filterContainer.querySelectorAll('.category-filter').forEach(btn => {
                            btn.className = 'category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200';
                        });
                        e.target.className = 'category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors bg-primary-blue text-white';
                        
                        filterByCategory(e.target.dataset.category);
                    }
                });
            }
        }
    }
    
    function performSearch(query) {
        if (!blogIndex || !blogIndex.posts) return;
        
        query = query.toLowerCase().trim();
        
        if (query === '') {
            filteredPosts = [...blogIndex.posts];
        } else {
            filteredPosts = blogIndex.posts.filter(post => {
                return post.title.toLowerCase().includes(query) ||
                       post.description.toLowerCase().includes(query) ||
                       (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
                       (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))) ||
                       (post.category && post.category.toLowerCase().includes(query));
            });
        }
        
        currentPage = 1;
        renderPosts();
        updateStats();
    }
    
    function filterByCategory(category) {
        if (!blogIndex || !blogIndex.posts) return;
        
        if (category === '') {
            filteredPosts = [...blogIndex.posts];
        } else {
            filteredPosts = blogIndex.posts.filter(post => post.category === category);
        }
        
        currentPage = 1;
        renderPosts();
        updateStats();
    }
    
    function updatePagination(currentPage) {
        const totalPages = Math.ceil(filteredPosts.length / CONFIG.postsPerPage);
        
        if (totalPages <= 1) return;
        
        // Simple load more button for now
        const grid = document.querySelector(CONFIG.gridSelector);
        let loadMoreBtn = document.getElementById('load-more-btn');
        
        if (currentPage < totalPages) {
            if (!loadMoreBtn) {
                loadMoreBtn = document.createElement('div');
                loadMoreBtn.id = 'load-more-btn';
                loadMoreBtn.className = 'col-span-full text-center mt-8';
                loadMoreBtn.innerHTML = `
                    <button class="bg-primary-blue text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
                        Load More Posts
                    </button>
                `;
                grid.appendChild(loadMoreBtn);
                
                loadMoreBtn.querySelector('button').addEventListener('click', () => {
                    renderPosts(currentPage + 1);
                });
            }
        } else if (loadMoreBtn) {
            loadMoreBtn.remove();
        }
    }
    
    function updateStats() {
        const statsElement = document.getElementById('blog-stats');
        if (statsElement) {
            const total = filteredPosts.length;
            const totalPosts = blogIndex ? blogIndex.totalPosts : total;
            statsElement.textContent = `Showing ${total} of ${totalPosts} posts`;
        }
    }
    
    function animateCards() {
        const cards = document.querySelectorAll(CONFIG.gridSelector + ' > article');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function calculateReadingTime(wordCount) {
        const wordsPerMinute = 200;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes === 1 ? '1 min' : `${minutes} min`;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function trackPostClick(slug, title) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'blog_post_click', {
                'post_slug': slug,
                'post_title': title
            });
        }
        
        // Console log for debugging
        console.log('Post clicked:', { slug, title });
    }
    
    // Expose public methods
    window.BlogLoader = {
        reload: loadBlogIndex,
        search: performSearch,
        filterByCategory: filterByCategory
    };
    
})();