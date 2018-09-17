const scope = [
  'home',
  'resume',
  'config',
  'blog'
]

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scope],
    'subject-case': [1, 'always', 'sentence-case']
  }
}
