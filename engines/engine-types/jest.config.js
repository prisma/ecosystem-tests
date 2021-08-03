module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  snapshotResolver: './jestSnapshotResolver.js',
  testTimeout: 100000,
  modulePathIgnorePatterns: ['custom-engines'],
  globalSetup: './globalSetup.ts'
}
