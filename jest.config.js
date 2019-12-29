module.exports = {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.js',
    '!./src/typedef/**',
  ],
  errorOnDeprecated: true,
  notify: true,
  roots: ['./src'],
  verbose: true,
};
