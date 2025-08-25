/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        accent: '#2563eb'
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
};