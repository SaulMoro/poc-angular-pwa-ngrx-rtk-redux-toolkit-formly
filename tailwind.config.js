module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        container: '65vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
});
