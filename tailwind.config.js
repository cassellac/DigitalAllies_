/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./*.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./assets/**/*.{js,css}",
        "./content/**/*.md", // For CMS content if processed
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#2563EB',
                'success-green': '#059669',
                'alert-red': '#EF4444',
                'gray-dark': '#414243', // From index.html (Source of Truth)
                'gray-medium': '#6B7280',
                'pale-blue': '#DBEAFE',
                'light-blue': '#E0F2FE',
                'light-green': '#D1FAE5',
                'indigo-brand': '#6366f1',
                'light-pink': '#FADEEB', // From global.js
            },
            fontFamily: {
                'primary': ['Segoe UI', 'system-ui', 'sans-serif'],
                'secondary': ['Source Sans Pro', 'system-ui', 'sans-serif']
            }
        },
    },
    plugins: [],
}
