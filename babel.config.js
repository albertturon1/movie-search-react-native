module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'nativewind/babel',
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './src/assets/',
          '@constants': './src/constants/',
          '@components': './src/components/',
          '@hooks': './src/hooks/',
          '@interfaces': './src/interfaces/',
          '@navigation': './src/navigation/',
          '@redux': './src/redux/',
          '@utils': './src/utils/',
          '@screens': './src/screens/',
          '@src': './src/',
          '@': './',
        },
      },
    ],
  ],
};
