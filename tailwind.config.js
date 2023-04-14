/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryWhite: 'rgba(255,255,255,1)',
        secondaryWhite: 'rgba(255,255,255,0.8)',
        tertiaryWhite: 'rgba(255,255,255,0.7)',
        green: '#378AF0',
        primaryBlack: '#000',
        secondaryBlack: '#161618',
        tertiaryBlack: '#303030',
        grey: '#303030',
        join_red: '#F41010',
        thin_grey_line: 'rgba(235,235,245,0.25)',
        bottomSheetBackground: 'rgba(41, 43,45,0.7)',
        bottomSheetBlue: '#478ED6',
        bottomSheetGrey: '#383838',
        navigationBlue: '#1451AD',
      },
    },
  },
  plugins: [],
};
