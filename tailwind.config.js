module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: '#F33A6A',
        primary: '#F8A71E',
        lightOrange: '#FAC35A',
        deepOrange: '#F8A71E',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
