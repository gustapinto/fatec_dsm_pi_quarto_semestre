const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/test/**/*.test.ts'
  ],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};