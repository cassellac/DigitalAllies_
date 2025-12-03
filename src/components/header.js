export function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    headerPlaceholder.innerHTML = `
    <header class="bg-white/95 backdrop-blur-sm border-b border-pale-blue sticky top-0 z-50" role="banner">
        <nav class="max-w-7xl mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
            <div class="flex items-center justify-between">
                <a href="/" class="flex items-center space-x-1">
                    <div class="relative w-4 h-4 flex items-center justify-center">
                        <div class="w-2 h-2 bg-primary-blue rounded-full brand-pulse"></div>
                    </div>
                    <h1 class="text-xl font-bold text-gradient">Digital Allies</h1>
                </a>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-gray-dark hover:text-primary-blue transition-colors" data-en="Home"
                        data-es="Inicio">Home</a>
                    <a href="/about" class="text-gray-dark hover:text-primary-blue transition-colors" data-en="About"
                        data-es="Acerca">About</a>
                    <a href="/services" class="text-gray-dark hover:text-primary-blue transition-colors"
                        data-en="Services" data-es="Servicios">Services</a>
                    <a href="/blog" class="text-gray-dark hover:text-primary-blue transition-colors" data-en="Blog"
                        data-es="Blog">Blog</a>
                    <a href="/knowledge-base" class="text-gray-dark hover:text-primary-blue transition-colors"
                        data-en="Knowledge Base" data-es="Base de Conocimientos">Knowledge Base</a>
                    <a href="/contact" class="text-gray-dark hover:text-primary-blue transition-colors"
                        data-en="Contact" data-es="Contacto">Contact</a>
                    <a href="/contact" class="btn btn--secondary px-8 py-4 text-sm" data-en="Start Your Project"
                        data-es="Comienza Tu Proyecto">Start Your Project</a>
                </div>
                <button class="md:hidden p-2" onclick="toggleMobileMenu(this)" aria-expanded="false"
                    aria-controls="mobile-menu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <span class="sr-only">Open navigation</span>
                </button>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-pale-blue" role="menu">
                <div class="flex flex-col space-y-4 pt-4">
                    <a href="/" class="text-gray-dark hover:text-primary-blue" data-en="Home" data-es="Inicio"
                        role="menuitem">Home</a>
                    <a href="/about" class="text-gray-dark hover:text-primary-blue" data-en="About" data-es="Acerca"
                        role="menuitem">About</a>
                    <a href="/services" class="text-gray-dark hover:text-primary-blue" data-en="Services"
                        data-es="Servicios" role="menuitem">Services</a>
                    <a href="/blog" class="text-gray-dark hover:text-primary-blue" data-en="Blog" data-es="Blog"
                        role="menuitem">Blog</a>
                    <a href="/knowledge-base" class="text-gray-dark hover:text-primary-blue" data-en="Knowledge Base"
                        data-es="Base de Conocimientos" role="menuitem">Knowledge Base</a>
                    <a href="/contact" class="btn btn--secondary px-8 py-4 text-sm" data-en="Contact" data-es="Contacto"
                        role="menuitem">Contact</a>
                </div>
            </div>
        </nav>
    </header>
  `;
}
