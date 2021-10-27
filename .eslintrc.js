/* eslint-disable import/no-commonjs */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'no-console': ['error', { allow: ['warn'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
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
        alphabetize: {
          order: 'asc',
        },
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
      },
    ],
  },
};
