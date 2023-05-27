/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellowStar: '#ffd60b',
        background: '#fff',
        muted: '#EAEAEA',
        border: '#f6f0e8',
      },
    },
  },
  plugins: [],
};
