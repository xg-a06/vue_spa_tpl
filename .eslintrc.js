const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@babel/eslint-parser'
  },
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve('./src')]],
        extensions: ['.js', '.vue', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
  globals: {},
  rules: {
    'import/extensions': ['error', 'always', { js: 'never', ts: 'never', tsx: 'never' }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0
  }
};
