module.exports = {
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setUpTests.js'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  };