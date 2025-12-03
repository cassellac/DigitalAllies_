// Store translations if provided
let globalTranslations = {};

export function initLanguage(translations = {}) {
    globalTranslations = translations;
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    const initialLang = savedLang || browserLang;

    toggleLanguage(initialLang);

    // Expose to window for inline onclick handlers
    window.toggleLanguage = toggleLanguage;
}

export function toggleLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);

    // Update Toggle Buttons
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');
    const toggleBtn = document.querySelector('.language-toggle'); // For accessibility guide

    if (langEn && langEs) {
        langEn.className = lang === 'en'
            ? 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm'
            : 'px-3 py-1 text-sm font-medium text-gray-dark hover:text-primary-blue transition-colors';
        langEs.className = lang === 'es'
            ? 'px-3 py-1 text-sm font-medium text-primary-blue bg-white rounded-full shadow-sm'
            : 'px-3 py-1 text-sm font-medium text-gray-dark hover:text-primary-blue transition-colors';
    }

    if (toggleBtn) {
        toggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
        toggleBtn.style.background = lang === 'es' ? 'var(--primary-blue)' : 'var(--white)';
        toggleBtn.style.color = lang === 'es' ? 'var(--white)' : 'var(--primary-blue)';
    }

    // Handle data-en/data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
        const translation = el.getAttribute('data-' + lang);
        if (translation !== null) {
            if (el.placeholder !== undefined) {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    // Handle data-translate attributes (using provided translations)
    if (globalTranslations && globalTranslations[lang]) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (globalTranslations[lang][key]) {
                element.textContent = globalTranslations[lang][key];
            }
        });
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}
