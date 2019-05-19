// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'no-extend-native': 'off',
    'no-new': 'off',
    'no-eval': 'off',
    'no-alert': 'off',
    'no-spaced-func': 'off',
    'no-var': 'off',
    'no-debugger': 'off',
    'no-useless-constructor': 'off',
    'object-curly-spacing': 'off'
  },
  globals: {
    Vhall: true,
    VhallInteraction: true,
    VhallInteractionGuest: true
  }
}
