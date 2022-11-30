module.exports = {
  '*.{js,ts,vue}': 'eslint --cache --fix',
  '*.{css,scss,vue}': 'stylelint --fix --allow-empty-input',
  '*': 'prettier --write',
}
