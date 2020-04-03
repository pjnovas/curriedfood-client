module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  timers: 'fake',
  transform: {
    '^.+\\.(js|ts)x?$': 'babel-jest'
  },
  setupFiles: ['./jest.helpers.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|react-native-safe-area-view' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      ')/)'
  ]
};
