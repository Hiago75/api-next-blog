module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts?'],
  // collectCoverage: true,
  clearMocks: true,
  maxWorkers: 1,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
};
