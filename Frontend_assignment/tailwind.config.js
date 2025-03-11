/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
        'background-paper-light': 'var(--background-paper-light)',
        'background-paper-dark': 'var(--background-paper-dark)',
      },
      animation: {
        'cursor-blob': 'blob 3s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};