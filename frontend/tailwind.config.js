// tailwind.config.ts
/** @type { import('tailwindcss').Config } */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Fixed the typo (was 'js,ts,jsx,ts,tsx')
    './index.html', // Added index.html
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add this to reduce processing
  future: {
    hoverOnlyWhenSupported: true,
  },
};