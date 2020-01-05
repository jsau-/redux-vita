module.exports = {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.+(ts|tsx|js)'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -1,
    },
  },
  errorOnDeprecated: true,
  notify: true,
  roots: ['<rootDir>/src'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  verbose: true,
};
