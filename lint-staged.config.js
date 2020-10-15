module.exports = {
  'src/app/**/*.ts': ['sh ./tools/lint.sh 1'],
  'src/app/**/*.{scss,css}': ['sh ./tools/lint.sh 2'],
  //'src/app/**/*.{js,json,md,html}': ['sh ./tools/lint.sh 0'],
};
