module.exports = {
  hooks: {
    'pre-commit': 'pretty-quick --staged && lint-staged -c lint-staged.config.js',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
