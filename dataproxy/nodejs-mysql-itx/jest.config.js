/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 90000,
  globalSetup: './jestGlobalSetup.js',
  maxWorkers: 1,
}
