module.exports = {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.js'],
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
  roots: ['./src'],
  verbose: true,
};
