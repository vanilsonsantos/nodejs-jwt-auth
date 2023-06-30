module.exports = {
    setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
    coveragePathIgnorePatterns: [
      'config/database.js',
      'controller/agent.js'
    ],
    testPathIgnorePatterns: [
      'config/database.js',
      'controller/agent.js'
    ]
  };
  