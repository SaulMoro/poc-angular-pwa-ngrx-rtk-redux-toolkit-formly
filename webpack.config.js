const { patchPostCSS } = require('@ngneat/tailwind');

module.exports = (config) => {
  const isProd = config.mode === 'production';
  const tailwindConfig = require('./tailwind.config.js')(isProd);
  patchPostCSS(config, tailwindConfig);
  return config;
};
