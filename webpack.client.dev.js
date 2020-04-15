const merge  = require('webpack-merge');
const common = require('./webpack.client.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {

  mode: 'development',

  watch: true,
  watchOptions: {
    ignored: [
      'node_modules/**',
      // 'cache/**',
      // 'src/**',
      // 'logs/**',
      // 'graphics/**',
      // 'dist/**',
      // 'public/images/**'
    ]
  },

  devtool: 'cheap-module-eval-source-map',

});
