/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mystery-dark': '#1e293b',
        'mystery-accent': '#991b1b',
        'mystery-light': '#f8fafc',
        'mystery-paper': '#f3e8d2',
      },
      fontFamily: {
        'detective': ['Playfair Display', 'serif'],
        'script': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
