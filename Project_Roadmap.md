Project: Digital Allies Refactor

Core Objectives

Design Consistency: index.html is the visual Gold Standard. All other pages must inherit its typography, spacing, color palette, and component behavior.

Performance: Remove unused CSS/JS and optimize asset loading.

Functionality: Fix broken integrations (Blog CMS) and UX issues (Language Persistence).

Known Issues & Tasks

1. Global Cleanup (Housekeeping)

[ ] Audit css/ folder. Consolidate separate page stylesheets into a global style system (or utility class structure) based on index.html.

[ ] Audit js/ folder. Remove dead scripts. Modularize common functions (nav, footer, utilities).

[ ] Delete unused images or assets identified during the scan.

2. Language Switching System

[ ] Current Behavior: Resets on page load or is inconsistent.

[ ] Target Behavior:

Detect browser language on first visit.

User selection is saved to localStorage.

On page load (every page), check localStorage and apply language immediately to prevent "flash of wrong content."

3. Blog CMS Integration

[ ] Issue: pages cms content is not rendering on blog.html.

[ ] Investigation: Check the JS fetching logic. verify API endpoints/Webhooks.

[ ] Fix: Ensure dynamic rendering works or build-step static generation is configured correctly.

4. Services Page Update

[ ] Align header/footer with index.html.

[ ] Update typography and card styles to match the new design system.

[ ] (Pending user input on specific content updates).

5. Index Page (Source of Truth)

[ ] Ensure index.html is fully modularized so its components (Nav, Footer) can be reused/imported elsewhere easily.

Questions for the User (To be discussed)

Are we using a build tool (Vite, Webpack) or raw HTML/JS?

How is the "Pages CMS" currently supposed to connect? (API Key, JSON file, specific JS library?)

For the Services page, do you want to keep the current layout and just change the styles, or rebuild the layout entirely?