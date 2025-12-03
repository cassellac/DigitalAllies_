import './css/global.css';
import { loadHeader } from './components/header.js';
import { loadFooter } from './components/footer.js';
import { initLanguage } from './utils/language.js';

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    loadHeader();
    loadFooter();
});
