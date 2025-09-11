// Tailwind Config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563EB',
        'light-blue': '#E0F2FE',
        'pale-blue': '#DBEAFE',
        'gray-medium': '#828489',
        'gray-dark': '#414243',
        'success-green': '#059669',
        'light-green': '#D1FAE5'
      },
      fontFamily: {
        'primary': ['Segoe UI', 'system-ui', 'sans-serif'],
        'secondary': ['source-sans-pro', 'Source Sans Pro', 'sans-serif']
      }
    }
  }
};

// Language Switching
let currentLanguage = 'en';
function toggleLanguage(lang) {
  currentLanguage = lang;
  document.getElementById('lang-en').className = lang === 'en'
    ? 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm'
    : 'px-3 py-1 text-sm font-medium text-gray-medium hover:text-primary-blue transition-colors';
  document.getElementById('lang-es').className = lang === 'es'
    ? 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm'
    : 'px-3 py-1 text-sm font-medium text-gray-medium hover:text-primary-blue transition-colors';
  document.querySelectorAll('[data-en][data-es]').forEach(el=>{
    el.textContent = el.getAttribute('data-' + lang);
  });
}

// Mobile Menu
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Init
document.addEventListener('DOMContentLoaded', ()=>toggleLanguage('en'));
