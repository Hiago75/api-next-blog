module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // '@config': './src/config' //Just and example
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
