// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      blue: colors.blue,
      gray: colors.gray
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: []
}
