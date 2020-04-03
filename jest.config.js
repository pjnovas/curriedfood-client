module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  timers: 'fake',
  transform: {
    '^.+\\.(js|ts)x?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.enzyme.js', './jest.helpers.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|react-native-safe-area-view' +
      // '|@expo\\vector-icons' +
      // '|expo-font' +
      // '|expo-asset' +
      ')/)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!<rootDir>/node_modules/',
    // Tech Debt
    '!<rootDir>/src/context/auth-context'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
