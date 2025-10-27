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
          '@config': './src/config',
          '@middlewares': './src/app/middlewares',
          '@models': './src/app/models',
          '@controllers': './src/app/controllers',
          '@views': './src/app/views',
          '@database': './src/database',
          '@migrations': './src/database/migrations',
          '@seeders': './src/database/seeders',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
}
