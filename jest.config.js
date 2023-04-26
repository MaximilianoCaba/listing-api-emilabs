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
      branches: 84,
      functions: 100,
      lines: 97,
      statements: 97,
    }
  },
};