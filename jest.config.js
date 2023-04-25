module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  verbose: true,
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.+(ts)', '**/?(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  coverageThreshold: {
    global: {
      branches: 66,
      functions: 100,
      lines: 96,
      statements: 96,
    }
  },
};