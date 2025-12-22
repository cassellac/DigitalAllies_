// Tailwind Config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        blue: {
          50: '#E0F2FE',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8'
        },
        green: {
          100: '#D1FAE5',
          500: '#059669'
        },
        red: {
          500: '#EF4444'
        },
        gray: {
          700: '#414243',
          900: '#000000'
        },
        'primary-blue': '#2563EB',
        'light-blue': '#E0F2FE',
        'pale-blue': '#DBEAFE',
        'light-pink': '#FADEEB',
        'gray-medium': '#414243',
        'gray-dark': '#111827',
        'success-green': '#059669',
        'light-green': '#D1FAE5'
      },
      fontFamily: {
        primary: ['Segoe UI', 'system-ui', 'sans-serif'],
        secondary: ['Source Sans Pro', 'system-ui', 'sans-serif']
      }
    }
  }
};

// Language Switching Logic
let currentLanguage = 'en';

function toggleLanguage(lang) {
  // If no language provided, toggle current
  if (!lang) {
    lang = currentLanguage === 'en' ? 'es' : 'en';
  }

  currentLanguage = lang;
  
  // Save preference
  localStorage.setItem('preferredLanguage', lang);

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
}

// Mobile Menu Toggle
function toggleMobileMenu(button) {
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
}

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

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Restore Language Preference
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  toggleLanguage(savedLang);

  // 2. Initialize Forms
  initFormValidation();

  // 3. Initialize Particles (if present)
  if (typeof loadAndInitParticles === 'function') {
    try {
      loadAndInitParticles();
    } catch (e) {
      console.warn('initParticleBackground failed', e);
    }
  }
});

// Helper: Get URL Parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
