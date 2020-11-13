const merge = require('webpack-merge');
const { SvgGeneratorWebpackPlugin } = require('./svg-generator /webpack-plugin');

module.exports = (config) => {
  const isProd = config.mode === 'production';

  return merge(config, {
    plugins: [new SvgGeneratorWebpackPlugin({
      watch          : !isProd,
      srcFiles       : './src/assets/svg',
      outputDirectory: './src/app',
      dirName        : 'svg',
      svgoConfig     : {
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
