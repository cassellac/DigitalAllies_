/**
 * blog-dynamic-load.js
 * Dynamically loads blog posts from /content/blog/blog-index.json
 * Supports URL parameter filtering ?category=X
 */

document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.querySelector('#blog-posts-grid') || document.querySelector('#blog-posts-container'); 
    const categoryHeader = document.querySelector('#category-header');
    
    // Only run if the container exists
    if (!blogContainer) return;

    // Get category from URL
    const urlCategory = getUrlParameter('category');
    
    // Show loading state
    blogContainer.innerHTML = `
        <div class="col-span-full text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
            <p class="mt-2 text-gray-500">Loading insights...</p>
        </div>
    `;

    fetch('/content/blog/blog-index.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load blog index');
            return response.json();
        })
        .then(data => {
            let posts = data.posts || [];
            
            // Filter by Category if present in URL
            if (urlCategory) {
                const cleanCategory = urlCategory.toLowerCase();
                posts = posts.filter(post => 
                    (post.category && post.category.toLowerCase() === cleanCategory) ||
                    (post.tags && post.tags.some(tag => tag.toLowerCase() === cleanCategory))
                );
                
                // Update Header to show active filter
                if (categoryHeader) {
                    categoryHeader.textContent = `Category: ${urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)}`;
                    categoryHeader.classList.remove('hidden');
                }
            }

            if (posts.length === 0) {
                // Fallback: Show real placeholder content with insight cards
                blogContainer.innerHTML = `
                    <article class="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                        <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-blue-500 to-blue-700">
                            <div class="absolute inset-0 flex items-center justify-center text-white">
                                <i class="fa-solid fa-palette text-6xl opacity-50"></i>
                            </div>
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-primary-blue rounded-full shadow-sm uppercase tracking-wider">
                                    Design
                                </span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-grow">
                            <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                                5 Web Design Trends for 2025
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                I've been watching the design landscape evolve. Here's what I'm seeing—motion, minimalism, and accessibility aren't just trends; they're becoming necessities.
                            </p>
                            <span class="text-sm font-medium text-primary-blue">Coming Soon</span>
                        </div>
                    </article>
                    <article class="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                        <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-green-500 to-green-700">
                            <div class="absolute inset-0 flex items-center justify-center text-white">
                                <i class="fa-solid fa-universal-access text-6xl opacity-50"></i>
                            </div>
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-success-green rounded-full shadow-sm uppercase tracking-wider">
                                    Accessibility
                                </span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-grow">
                            <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                                The Importance of Web Accessibility
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                I used to think accessibility was a nice-to-have. Now I realize it's about opening doors—not just for compliance, but for real people who deserve to navigate your site with dignity.
                            </p>
                            <span class="text-sm font-medium text-primary-blue">Coming Soon</span>
                        </div>
                    </article>
                    <article class="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                        <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-purple-500 to-purple-700">
                            <div class="absolute inset-0 flex items-center justify-center text-white">
                                <i class="fa-solid fa-chart-line text-6xl opacity-50"></i>
                            </div>
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-purple-600 rounded-full shadow-sm uppercase tracking-wider">
                                    SEO
                                </span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-grow">
                            <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                                SEO Strategies That Actually Work
                            </h3>
                            <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                I'm starting to see a pattern—the businesses that rank well aren't gaming the system. They're genuinely serving their communities. Here's how to do the same.
                            </p>
                            <span class="text-sm font-medium text-primary-blue">Coming Soon</span>
                        </div>
                    </article>
                `;
                return;
            }

            // Clear loading state
            blogContainer.innerHTML = '';

            // Render Posts
            posts.forEach(post => {
                const article = document.createElement('article');
                article.className = 'bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group';
                
                // Fallback image if none provided
                const imageSrc = post.featuredImage || '/assets/logo/digital-allies-logo-default.svg';
                const imageAlt = post.imageAlt || post.title;

                article.innerHTML = `
                    <div class="relative overflow-hidden aspect-video">
                        <img src="${imageSrc}" 
                             alt="${imageAlt}"
                             class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                             onerror="this.src='/assets/logo/digital-allies-logo-default.svg'">
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-primary-blue rounded-full shadow-sm uppercase tracking-wider">
                                ${post.category || 'Update'}
                            </span>
                        </div>
                    </div>
                    
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                ${new Date(post.publishDate).toLocaleDateString()}
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                ${post.readingTime || 5} min read
                            </span>
                        </div>

                        <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                            <a href="${post.publicUrl || '#'}" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                ${post.title}
                            </a>
                        </h3>
                        
                        <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                            ${post.excerpt || post.description || 'Click to read more about this topic.'}
                        </p>

                        <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                            <span class="text-sm font-medium text-primary-blue group-hover:translate-x-1 transition-transform inline-flex items-center">
                                Read Article 
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </span>
                        </div>
                    </div>
                `;
                
                blogContainer.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            // Provide fallback content instead of error
            blogContainer.innerHTML = `
                <article class="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                    <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-blue-500 to-blue-700">
                        <div class="absolute inset-0 flex items-center justify-center text-white">
                            <i class="fa-solid fa-palette text-6xl opacity-50"></i>
                        </div>
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-primary-blue rounded-full shadow-sm uppercase tracking-wider">
                                Design
                            </span>
                        </div>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                            5 Web Design Trends for 2025
                        </h3>
                        <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                            I've been watching the design landscape evolve. Here's what I'm seeing—motion, minimalism, and accessibility aren't just trends; they're becoming necessities.
                        </p>
                        <span class="text-sm font-medium text-primary-blue">Coming Soon</span>
                    </div>
                </article>
                <article class="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                    <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-green-500 to-green-700">
                        <div class="absolute inset-0 flex items-center justify-center text-white">
                            <i class="fa-solid fa-universal-access text-6xl opacity-50"></i>
                        </div>
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-success-green rounded-full shadow-sm uppercase tracking-wider">
                                Accessibility
                            </span>
                        </div>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                            The Importance of Web Accessibility
                        </h3>
                        <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                            I used to think accessibility was a nice-to-have. Now I realize it's about opening doors—not just for compliance, but for real people who deserve to navigate your site with dignity.
                        </p>
                        <span class="text-sm font-medium text-primary-blue">Coming Soon</span>
                    </div>
                </article>
                <article class="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                    <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-purple-500 to-purple-700">
                        <div class="absolute inset-0 flex items-center justify-center text-white">
                            <i class="fa-solid fa-chart-line text-6xl opacity-50"></i>
                        </div>
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-purple-600 rounded-full shadow-sm uppercase tracking-wider">
                                SEO
                            </span>
                        </div>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-gray-dark mb-3 group-hover:text-primary-blue transition-colors">
                            SEO Strategies That Actually Work
                        </h3>
                        <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
                            I'm starting to see a pattern—the businesses that rank well aren't gaming the system. They're genuinely serving their communities. Here's how to do the same.
                        </p>
                        <span class="text-sm font-medium text-primary-blue">Coming Soon</span>
                    </div>
                </article>
            `;
        });
});
