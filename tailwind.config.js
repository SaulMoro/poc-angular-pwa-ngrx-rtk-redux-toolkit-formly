module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['**/*.html', '**/*.ts'],
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
  plugins: [],
});
