module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
});
