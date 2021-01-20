const merge = require('webpack-merge');
const { SvgGeneratorWebpackPlugin } = require('./svg-generator/webpack-plugin');

module.exports = (config) => {
  const isProd = config.mode === 'production';

  return merge(config, {
    plugins: [new SvgGeneratorWebpackPlugin({
      watch     : !isProd,
      srcPath   : './src/assets/svg',
      outputPath: './src/app/svg',
      svgoConfig: {
        plugins: [
          {
            removeDimensions: true,
            cleanupAttrs    : true
          }
        ]
      }
    })]
  });
};
