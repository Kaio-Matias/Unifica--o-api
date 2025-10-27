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
          '@middlewares': './src/app/middlewares',
          '@controllers': './src/app/controllers',
          '@views': './src/app/views',
          '@seeders': './src/database/seeders',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
}
