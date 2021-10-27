/* eslint-disable import/no-commonjs */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'sort-imports-es6-autofix'],
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'no-console': ['error', { allow: ['warn'] }],
    'import/imports-first': 2,
    'import/named': 0,
    'import/no-amd': 2,
    'import/no-unresolved': 0,
    'import/no-named-as-default-member': 0,
    'import/no-commonjs': 'error',
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default': 0,
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'sibling', 'parent', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@themes',
            group: 'internal',
          },
          {
            pattern: '@components',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
      },
    ],
  },
};
