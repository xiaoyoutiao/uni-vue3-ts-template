/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['import', '@typescript-eslint', 'you-dont-need-lodash-underscore'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
    },
  },
  settings: {},
  rules: {
    // 不允许使用any
    '@typescript-eslint/no-explicit-any': 0,
    'vue/attribute-hyphenation': ['warn', 'never'],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
          'object',
        ],
        pathGroups: [
          {
            pattern: '@/*',
            group: 'internal',
          },
          {
            pattern: '@/components/*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/utils/*',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
  },
}
