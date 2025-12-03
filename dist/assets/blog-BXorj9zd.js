import"./main-CxpxTHpI.js";(function(){const a={indexPath:"/content/blog-index.json",blogPath:"/content/posts/",postsPerPage:9,gridSelector:"#blog-posts-grid"};let o=null,l=[],d=!1;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f();function f(){if(!document.querySelector(a.gridSelector)){console.warn("Blog grid element not found. Looking for:",a.gridSelector);return}p(),$(),S()}async function p(){if(!d){d=!0;try{const e=await fetch(a.indexPath+"?t="+Date.now());if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);o=await e.json(),l=[...o.posts||[]],l.sort((t,r)=>new Date(r.publishDate)-new Date(t.publishDate)),c(),u()}catch(e){console.error("Failed to load blog index:",e),k("Unable to load blog posts. Please try again later.")}finally{d=!1}}}function c(e=1){const t=document.querySelector(a.gridSelector);if(!t||!l.length){w();return}const r=(e-1)*a.postsPerPage,n=r+a.postsPerPage,i=l.slice(r,n);e===1&&(t.innerHTML=""),i.forEach(g=>{const m=v(g);t.appendChild(m)}),L(e),E()}function v(e){const t=document.createElement("article");t.className="bg-white p-6 rounded-2xl gradient-shadow border border-pale-blue transition-transform hover:scale-105";const r=new Date(e.publishDate),n=C(e.wordCount||0),i=e.description||e.excerpt||"Read this interesting post...",g=s(e.publicUrl||`${a.blogPath}${e.slug}/`),m=e.featuredImage?`
            <div class="mb-4 -mt-2 -mx-2 rounded-xl overflow-hidden aspect-video bg-gray-100 relative group">
                <img src="${s(e.featuredImage)}" 
                     ${e.imageAlt?`alt="${s(e.imageAlt)}"`:'alt="Blog post featured image"'}
                     loading="lazy" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
        `:"";t.innerHTML=`
            ${m}
            ${e.category?`<div class="mb-3">
                <span class="bg-primary-blue text-white px-2 py-1 rounded-full text-xs font-medium">
                    ${s(e.category)}
                </span>
            </div>`:""}
            
            <h3 class="text-2xl font-bold text-gray-dark mb-2 line-clamp-2">
                ${s(e.title)}
            </h3>
            
            <div class="text-sm text-gray-medium mb-3 flex items-center space-x-3">
                <span>${r.toLocaleDateString()}</span>
                <span>•</span>
                <span>${n} read</span>
                ${e.author&&e.author!=="Digital Allies"?`<span>•</span><span>By ${s(e.author)}</span>`:""}
            </div>
            
            <p class="text-gray-medium mb-4 line-clamp-3">
                ${s(i)}
            </p>
            
            ${e.tags&&e.tags.length>0?`
                <div class="mb-4 flex flex-wrap gap-1">
                    ${e.tags.slice(0,3).map(y=>`<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            #${s(y)}
                        </span>`).join("")}
                    ${e.tags.length>3?'<span class="text-gray-400 text-xs">+'+(e.tags.length-3)+" more</span>":""}
                </div>
            `:""}
            
            <a href="${g}"
               class="text-primary-blue hover:underline font-medium inline-flex items-center group"
               data-post-slug="${s(e.slug)}">
                Read More
                <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        `;const b=t.querySelector("a[data-post-slug]");return b&&b.addEventListener("click",y=>{P(e.slug,e.title)}),t}function w(){const e=document.querySelector(a.gridSelector);e&&(e.innerHTML=`
            <div class="col-span-full text-center py-12">
                <div class="text-gray-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No Posts Found</h3>
                <p class="text-gray-500">We're working on some great content. Check back soon!</p>
            </div>
        `)}function k(e){const t=document.querySelector(a.gridSelector);t&&(t.innerHTML=`
            <div class="col-span-full text-center py-12">
                <div class="text-red-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Oops!</h3>
                <p class="text-gray-500">${s(e)}</p>
                <button onclick="location.reload()" class="mt-4 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Try Again
                </button>
            </div>
        `)}function $(){let e=document.getElementById("blog-search");if(!e){const r=document.querySelector(a.gridSelector);r&&r.parentElement&&(e=document.createElement("div"),e.id="blog-search",e.className="mb-8 max-w-md mx-auto",e.innerHTML=`
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
                `,r.parentElement.insertBefore(e,r))}const t=document.getElementById("blog-search-input");if(t){let r;t.addEventListener("input",n=>{clearTimeout(r),r=setTimeout(()=>{h(n.target.value)},300)})}}function S(){let e=document.getElementById("blog-filters");if(!e&&o&&o.categories&&o.categories.length>1){const t=document.getElementById("blog-search");if(t){e=document.createElement("div"),e.id="blog-filters",e.className="mb-6 text-center";const r=["All",...o.categories];e.innerHTML=`
                    <div class="flex flex-wrap justify-center gap-2">
                        ${r.map(n=>`
                            <button class="category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors
                                          ${n==="All"?"bg-primary-blue text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}"
                                    data-category="${n==="All"?"":s(n)}">
                                ${s(n)}
                            </button>
                        `).join("")}
                    </div>
                `,t.parentElement.insertBefore(e,t.nextSibling),e.addEventListener("click",n=>{n.target.classList.contains("category-filter")&&(e.querySelectorAll(".category-filter").forEach(i=>{i.className="category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"}),n.target.className="category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors bg-primary-blue text-white",x(n.target.dataset.category))})}}}function h(e){!o||!o.posts||(e=e.toLowerCase().trim(),e===""?l=[...o.posts]:l=o.posts.filter(t=>t.title.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)||t.excerpt&&t.excerpt.toLowerCase().includes(e)||t.tags&&t.tags.some(r=>r.toLowerCase().includes(e))||t.category&&t.category.toLowerCase().includes(e)),c(),u())}function x(e){!o||!o.posts||(e===""?l=[...o.posts]:l=o.posts.filter(t=>t.category===e),c(),u())}function L(e){const t=Math.ceil(l.length/a.postsPerPage);if(t<=1)return;const r=document.querySelector(a.gridSelector);let n=document.getElementById("load-more-btn");e<t?n||(n=document.createElement("div"),n.id="load-more-btn",n.className="col-span-full text-center mt-8",n.innerHTML=`
                    <button class="bg-primary-blue text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
                        Load More Posts
                    </button>
                `,r.appendChild(n),n.querySelector("button").addEventListener("click",()=>{c(e+1)})):n&&n.remove()}function u(){const e=document.getElementById("blog-stats");if(e){const t=l.length,r=o?o.totalPosts:t;e.textContent=`Showing ${t} of ${r} posts`}}function E(){document.querySelectorAll(a.gridSelector+" > article").forEach((t,r)=>{t.style.opacity="0",t.style.transform="translateY(20px)",setTimeout(()=>{t.style.transition="opacity 0.6s ease, transform 0.6s ease",t.style.opacity="1",t.style.transform="translateY(0)"},r*100)})}function C(e){const r=Math.ceil(e/200);return r===1?"1 min":`${r} min`}function s(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function P(e,t){typeof gtag<"u"&&gtag("event","blog_post_click",{post_slug:e,post_title:t}),console.log("Post clicked:",{slug:e,title:t})}window.BlogLoader={reload:p,search:h,filterByCategory:x}})();
