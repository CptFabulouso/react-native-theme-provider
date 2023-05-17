/* eslint-disable import/no-commonjs */
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules', 'src/__tests__'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/example/'],
};
