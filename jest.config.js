module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts?'],
  // collectCoverage: true,
  clearMocks: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
};
