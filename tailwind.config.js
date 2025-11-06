/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',  // Custom extra small breakpoint
      },
      fontFamily: {
        'display': ['Russo One', 'sans-serif'],
        'ui': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'emerald': {
          400: '#56f3a9',
          500: '#10b981',
        }
      }
    },
  },
  plugins: [],
}