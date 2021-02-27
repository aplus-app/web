const colors = require('windicss/colors');
const typography = require('windicss/plugin/typography');

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography],
};
