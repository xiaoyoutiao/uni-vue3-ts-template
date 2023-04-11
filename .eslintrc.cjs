/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * @link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
 */

/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  globals: {
    uni: 'readonly',
    wx: 'readonly',
    Uni: 'readonly',
    PageEnum: 'readonly'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:you-dont-need-lodash-underscore/compatible',
    './.eslintrc-auto-import.json'
  ],
  parser: 'vue-eslint-parser',
  plugins: ['import', '@typescript-eslint', 'you-dont-need-lodash-underscore'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json']
    }
  },
  settings: {},
  rules: {
    // 不允许使用any
    'no-undef': ['off'],
    '@typescript-eslint/no-explicit-any': 0,
    'vue/attribute-hyphenation': ['warn', 'never'],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'default', 'home', 'profile']
      }
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'warn',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type', 'object'],
        pathGroups: [
          {
            pattern: '@/**/*',
            group: 'internal'
          }
        ]
      }
    ]
  }
}
