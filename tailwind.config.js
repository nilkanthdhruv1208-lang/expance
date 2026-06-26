/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F766E', // deep teal
        credit: '#22C55E',  // green
        debit: '#EF4444',   // red
        background: '#F8FAFC', // slate-50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
      }
    },
  },
  plugins: [],
}
