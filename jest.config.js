module.exports = {
    setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
    coveragePathIgnorePatterns: [
      'config/database.js'
    ],
    testPathIgnorePatterns: [
      'config/database.js'
    ]
  };
  