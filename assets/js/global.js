// Tailwind Config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#438eff',
        'light-blue': '#E0F2FE',
        'pale-blue': '#DBEAFE',
        'light-pink':'#FADEEB',
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
  const langEn = document.getElementById('lang-en');
  const langEs = document.getElementById('lang-es');

  if (langEn && langEs) {
    langEn.className = lang === 'en'
      ? 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm'
      : 'px-3 py-1 text-sm font-medium text-gray-dark hover:text-primary-blue transition-colors';
    langEs.className = lang === 'es'
      ? 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm'
      : 'px-3 py-1 text-sm font-medium text-gray-dark hover:text-primary-blue transition-colors';
  }

  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    const translation = el.getAttribute('data-' + lang);
    if (translation !== null) {
      el.textContent = translation;
    }
  });
}

// Mobile Menu
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

// Init
document.addEventListener('DOMContentLoaded', () => {
  toggleLanguage('en');
  initFormValidation();
});

function initFormValidation() {
  const forms = document.querySelectorAll('[data-validate="contact"]');

  forms.forEach(form => {
    const fields = Array.from(form.querySelectorAll('[data-validate-field]'));

    const validateField = (field) => {
      const errorElement = document.getElementById(`${field.id}-error`);
      if (!errorElement) return true;

      let errorMessage = '';
      const value = field.value.trim();

      if (field.hasAttribute('required') && value === '') {
        errorMessage = field.dataset.errorRequired || 'This field is required.';
      } else if (value !== '') {
        if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
          errorMessage = field.dataset.errorInvalid || 'Enter a valid email address.';
        }
        if (field.type === 'tel' && value !== '' && !/^\+?[0-9\s().-]{7,}$/.test(value)) {
          errorMessage = field.dataset.errorInvalid || 'Enter a valid phone number.';
        }
      }

      if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('active');
        field.setAttribute('aria-invalid', 'true');
        return false;
      }

      errorElement.textContent = '';
      errorElement.classList.remove('active');
      field.setAttribute('aria-invalid', 'false');
      return true;
    };

    fields.forEach(field => {
      const events = ['blur'];
      if (field.tagName === 'SELECT') {
        events.push('change');
      } else {
        events.push('input');
      }

      events.forEach(eventName => {
        field.addEventListener(eventName, () => {
          if (eventName === 'input' && field.getAttribute('aria-invalid') !== 'true') {
            return;
          }
          validateField(field);
        });
      });
    });

    form.addEventListener('submit', (event) => {
      let formIsValid = true;
      fields.forEach(field => {
        const fieldIsValid = validateField(field);
        if (!fieldIsValid) {
          formIsValid = false;
        }
      });

      if (!formIsValid) {
        event.preventDefault();
        const firstInvalidField = fields.find(field => field.getAttribute('aria-invalid') === 'true');
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
      }
    });
  });
}
