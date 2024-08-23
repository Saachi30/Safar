// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      brightness: {
        25: '.25',
      },
      inset: {
        '1/2': '50%',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
