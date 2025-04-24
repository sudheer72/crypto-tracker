/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: {
          500: '#16C784',
        },
        red: {
          500: '#EA3943',
        },
        blue: {
          600: '#0052FE',
        },
      },
      animation: {
        'pulse-price': 'pulse-price 1.5s cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        'pulse-price': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};