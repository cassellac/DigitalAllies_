// Tailwind Config
// We check if tailwind is available before configuring
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#2563EB',
                    'primary-blue': '#2563EB',
                    'light-blue': '#E0F2FE',
                    'pale-blue': '#DBEAFE',
                    'light-pink': '#FADEEB',
                    'gray-medium': '#414243',
                    'gray-dark': '#111827',
                    'success-green': '#059669',
                    'light-green': '#D1FAE5',
                    'alert-red': '#EF4444',
                    'indigo-brand': '#6366f1'
                },
                fontFamily: {
                    primary: ['Segoe UI', 'system-ui', 'sans-serif'],
                    secondary: ['Source Sans Pro', 'system-ui', 'sans-serif']
                }
            }
        }
    };
}

// Language Switching Logic
// Attached to window to avoid ReferenceErrors in inline HTML handlers
window.currentLanguage = 'en';

window.toggleLanguage = function(lang) {
    // If no language provided, toggle current
    if (!lang) {
        lang = window.currentLanguage === 'en' ? 'es' : 'en';
    }

    window.currentLanguage = lang;

    // Save preference
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
        console.warn('LocalStorage not accessible', e);
    }

    // Update Buttons UI
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');

    if (langEn && langEs) {
        if (lang === 'en') {
            langEn.className = 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm transition-all';
            langEs.className = 'px-3 py-1 text-sm font-medium text-gray-medium hover:text-primary-blue transition-colors cursor-pointer';
        } else {
            langEs.className = 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm transition-all';
            langEn.className = 'px-3 py-1 text-sm font-medium text-gray-medium hover:text-primary-blue transition-colors cursor-pointer';
        }
    }

    // Update Text Content
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
        const translation = el.getAttribute('data-' + lang);
        if (translation !== null) {
            // Check if it's an input placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
};

// Mobile Menu Toggle
window.toggleMobileMenu = function(button) {
    const trigger = button instanceof HTMLElement ? button : document.querySelector('button[onclick*="toggleMobileMenu"]');
    const menuId = trigger?.getAttribute('aria-controls') || 'mobile-menu';
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const isHidden = menu.classList.toggle('hidden');
    if (trigger) {
        trigger.setAttribute('aria-expanded', String(!isHidden));
        const srOnly = trigger.querySelector('.sr-only');
        if (srOnly) {
            srOnly.textContent = isHidden ? 'Open navigation' : 'Close navigation';
        }
    }
};

// Form Validation Initialization
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// Particle Background Logic (Lazy Load)
function loadAndInitParticles() {
    const shapesContainer = document.querySelector('[data-bg-shapes]');
    if (!shapesContainer) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Simple particle generation if container exists
    const particleCount = shapesContainer.dataset.particles === 'high' ? 20 : 10;
    const color = shapesContainer.dataset.particleColor || 'rgba(37, 99, 235, 0.1)'; // Default primary blue

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 50 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3};
            pointer-events: none;
            transform: translate(0, 0);
            transition: transform 10s linear;
        `;
        
        shapesContainer.appendChild(particle);
        
        // Simple animation loop
        const animate = () => {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            particle.style.transform = `translate(${x}px, ${y}px)`;
            setTimeout(animate, Math.random() * 5000 + 5000);
        };
        setTimeout(animate, 100);
    }
}

// Helper: Get URL Parameters
window.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Restore Language Preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Safety check to ensure DOM is ready for toggle
    if(typeof window.toggleLanguage === 'function') {
        window.toggleLanguage(savedLang);
    }

    // 2. Initialize Forms
    initFormValidation();

    // 3. Initialize Particles
    loadAndInitParticles();
});
