const eslintCommond = 'eslint --cache --fix'
const stylelintCommond = 'stylelint --fix --allow-empty-input'
const prettierCommond = 'prettier --write'

module.exports = {
  '*.{vue}': [eslintCommond, stylelintCommond, prettierCommond],
  '*.{ts,json}': [eslintCommond, prettierCommond],
  '*.{scss,css}': [stylelintCommond, prettierCommond],
}
