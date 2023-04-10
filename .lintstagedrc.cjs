module.exports = {
  'src/**/*.{js,ts,vue}': 'eslint --cache --fix',
  'src/**/*.{css,scss,vue}': 'stylelint --fix --allow-empty-input',
  'src/**/*': 'prettier --write',
}
