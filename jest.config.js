const {pathsToModuleNameMapper} = require('ts-jest');

const {compilerOptions} = require('./tsconfig');

module.exports = {
  preset: 'react-native',

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|@react-navigation|react-navigation|react-native-config|react-native-reanimated|react-native-image-crop-picker|react-native-maps|react-native-linear-gradient|@t3-oss/env-core)/.*)',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!**/node_modules/**',
    '!**/.yarn/**',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'interfaces',
    'mocks',
    'constants',
    'sentry.ts',
    'store.ts',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
