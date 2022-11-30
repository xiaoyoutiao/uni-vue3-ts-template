import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
}

module.exports = Configuration
