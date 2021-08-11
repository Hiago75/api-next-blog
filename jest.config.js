module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts?'],
  // collectCoverage: true,
  clearMocks: true,
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
};
