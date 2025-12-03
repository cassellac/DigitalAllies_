import '../css/accessibility.css';

import { initLanguage, toggleLanguage } from '../utils/language.js';

let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Translation content
const translations = {
    en: {
        title: "Interactive ADA Accessibility Guide",
        subtitle: "Comprehensive tools and resources for building inclusive digital experiences",
        overview: "Overview",
        guidelines: "Guidelines",
        testing: "Testing Tools",
        examples: "Examples",
        resources: "Resources",
        understanding: "Understanding ADA Compliance",
        understandingDesc: "The Americans with Disabilities Act (ADA) ensures equal access to digital content. Learn the fundamentals and why it matters for your business.",
        wcagTitle: "WCAG 2.1 Guidelines",
        wcagDesc: "The Web Content Accessibility Guidelines provide the framework for accessible web design. Follow these principles to ensure compliance.",
        testingTitle: "Accessibility Testing Tools",
        testingDesc: "Use these interactive tools to test and validate the accessibility of your web content.",
        examplesTitle: "Interactive Examples",
        examplesDesc: "See accessibility principles in action with these interactive demonstrations.",
        resourcesTitle: "Additional Resources",
        resourcesDesc: "Expand your accessibility knowledge with these curated resources and tools.",
        footerText: "© 2025 Digital Allies. Building accessible web experiences for everyone."
    },
    es: {
        title: "Guía Interactiva de Accesibilidad ADA",
        subtitle: "Herramientas y recursos integrales para crear experiencias digitales inclusivas",
        overview: "Resumen",
        guidelines: "Pautas",
        testing: "Herramientas de Prueba",
        examples: "Ejemplos",
        resources: "Recursos",
        understanding: "Entendiendo el Cumplimiento ADA",
        understandingDesc: "La Ley de Estadounidenses con Discapacidades (ADA) garantiza el acceso igualitario al contenido digital. Aprende los fundamentos y por qué es importante para tu negocio.",
        wcagTitle: "Pautas WCAG 2.1",
        wcagDesc: "Las Pautas de Accesibilidad del Contenido Web proporcionan el marco para el diseño web accesible. Sigue estos principios para asegurar el cumplimiento.",
        testingTitle: "Herramientas de Prueba de Accesibilidad",
        testingDesc: "Usa estas herramientas interactivas para probar y validar la accesibilidad de tu contenido web.",
        examplesTitle: "Ejemplos Interactivos",
        examplesDesc: "Ve los principios de accesibilidad en acción con estas demostraciones interactivas.",
        resourcesTitle: "Recursos Adicionales",
        resourcesDesc: "Expande tu conocimiento de accesibilidad con estos recursos y herramientas seleccionados.",
        footerText: "© 2025 Digital Allies. Construyendo experiencias web accesibles para todos."
    }
};

// Initialize language with translations
document.addEventListener('DOMContentLoaded', () => {
    initLanguage(translations);

    // Override the global toggle for the specific button behavior in this page if needed,
    // but the shared utility now handles the .language-toggle class too.
    // We just need to ensure the button calls the shared toggleLanguage.
    const toggleBtn = document.querySelector('.language-toggle');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            const newLang = document.documentElement.lang === 'en' ? 'es' : 'en';
            toggleLanguage(newLang);
        };
    }
});

// Tab functionality
window.showTab = function (tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');

    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
        event.target.setAttribute('aria-selected', 'true');
    }
}

// Color contrast checker
window.checkContrast = function () {
    const foreground = document.getElementById('foregroundColor').value;
    const background = document.getElementById('backgroundColor').value;

    const contrastRatio = calculateContrastRatio(foreground, background);
    const resultsContainer = document.getElementById('contrastResults');

    let status, icon, statusText;
    if (contrastRatio >= 7) {
        status = 'result-pass';
        icon = '✅';
        statusText = currentLanguage === 'en' ? 'AAA Compliant' : 'Cumple AAA';
    } else if (contrastRatio >= 4.5) {
        status = 'result-pass';
        icon = '✅';
        statusText = currentLanguage === 'en' ? 'AA Compliant' : 'Cumple AA';
    } else if (contrastRatio >= 3) {
        status = 'result-warning';
        icon = '⚠️';
        statusText = currentLanguage === 'en' ? 'Large Text Only' : 'Solo Texto Grande';
    } else {
        status = 'result-fail';
        icon = '❌';
        statusText = currentLanguage === 'en' ? 'Non-compliant' : 'No cumple';
    }

    resultsContainer.innerHTML = `
        <div class="result-item ${status}">
            <span class="result-icon">${icon}</span>
            <div>
                <strong>${currentLanguage === 'en' ? 'Contrast Ratio' : 'Relación de Contraste'}: ${contrastRatio.toFixed(2)}:1</strong><br>
                ${statusText}
            </div>
        </div>
    `;
}

// Calculate contrast ratio between two colors
function calculateContrastRatio(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getRelativeLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Alt text analyzer
window.analyzeAltText = function () {
    const altText = document.getElementById('altTextInput').value.trim();
    const resultsContainer = document.getElementById('altTextResults');

    if (!altText) {
        resultsContainer.innerHTML = `
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${currentLanguage === 'en' ? 'No alt text provided' : 'No se proporcionó texto alt'}</div>
            </div>
        `;
        return;
    }

    const issues = [];
    const suggestions = [];

    // Check for common issues
    if (altText.toLowerCase().includes('image of') || altText.toLowerCase().includes('picture of')) {
        issues.push(currentLanguage === 'en' ? 'Avoid "image of" or "picture of"' : 'Evita "imagen de" o "foto de"');
    }

    if (altText.length > 125) {
        issues.push(currentLanguage === 'en' ? 'Alt text is too long (>125 characters)' : 'Texto alt muy largo (>125 caracteres)');
    }

    if (altText.length < 10) {
        suggestions.push(currentLanguage === 'en' ? 'Consider adding more descriptive details' : 'Considera agregar más detalles descriptivos');
    }

    // Generate results
    let resultsHTML = '';

    if (issues.length === 0 && suggestions.length === 0) {
        resultsHTML += `
            <div class="result-item result-pass">
                <span class="result-icon">✅</span>
                <div>${currentLanguage === 'en' ? 'Alt text looks good!' : '¡El texto alt se ve bien!'}</div>
            </div>
        `;
    }

    issues.forEach(issue => {
        resultsHTML += `
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${issue}</div>
            </div>
        `;
    });

    suggestions.forEach(suggestion => {
        resultsHTML += `
            <div class="result-item result-warning">
                <span class="result-icon">⚠️</span>
                <div>${suggestion}</div>
            </div>
        `;
    });

    resultsContainer.innerHTML = resultsHTML;
}

// Heading structure validator
window.validateHeadings = function () {
    const htmlInput = document.getElementById('htmlInput').value.trim();
    const resultsContainer = document.getElementById('headingResults');

    if (!htmlInput) {
        resultsContainer.innerHTML = `
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${currentLanguage === 'en' ? 'No HTML content provided' : 'No se proporcionó contenido HTML'}</div>
            </div>
        `;
        return;
    }

    // Parse headings from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlInput;
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
        resultsContainer.innerHTML = `
            <div class="result-item result-warning">
                <span class="result-icon">⚠️</span>
                <div>${currentLanguage === 'en' ? 'No headings found' : 'No se encontraron encabezados'}</div>
            </div>
        `;
        return;
    }

    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
    let resultsHTML = '';
    let hasH1 = headingLevels.includes(1);

    if (!hasH1) {
        resultsHTML += `
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${currentLanguage === 'en' ? 'Missing H1 heading' : 'Falta encabezado H1'}</div>
            </div>
        `;
    }

    // Check for proper sequence
    for (let i = 1; i < headingLevels.length; i++) {
        const current = headingLevels[i];
        const previous = headingLevels[i - 1];

        if (current > previous + 1) {
            resultsHTML += `
                <div class="result-item result-warning">
                    <span class="result-icon">⚠️</span>
                    <div>${currentLanguage === 'en' ? `Skipped heading level: H${previous} to H${current}` : `Nivel de encabezado omitido: H${previous} a H${current}`}</div>
                </div>
            `;
        }
    }

    if (resultsHTML === '' && hasH1) {
        resultsHTML = `
            <div class="result-item result-pass">
                <span class="result-icon">✅</span>
                <div>${currentLanguage === 'en' ? 'Heading structure is valid!' : '¡La estructura de encabezados es válida!'}</div>
            </div>
        `;
    }

    resultsContainer.innerHTML = resultsHTML;
}

// Demo functions
window.showMessage = function (message) {
    document.getElementById('keyboardMessage').textContent = message;
}

window.announceElement = function (announcement) {
    const output = document.getElementById('screenReaderOutput');
    output.textContent = announcement;

    // Clear after 3 seconds
    setTimeout(() => {
        output.textContent = '';
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Set focus on the first tab button
    const firstTab = document.querySelector('.tab-button');
    if (firstTab) firstTab.focus();
});
