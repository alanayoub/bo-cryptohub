'use strict';

// Node
const path               = require('path');

// Libs
const CopyPlugin         = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: './node_modules/bo-utils/dist/index.client.js',
        to:   'dist/public/javascript/libs/bo-utils-client.js'
      },
      {
        from: './node_modules/bo-datatable/dist/index.client.js',
        to:   'dist/public/javascript/libs/bo-datatable-client.js'
      },
      // {
      //   from: './src/public',
      //   to:   './public'
      // },
      {
        from: './src/public/images',
        to:   'dist/public/images'
      },
      {
        from: './src/public/stylesheet',
        to:   'dist/public/stylesheet'
      },
      {
        from: './src/pug',
        to:   'dist/pug'
      },
    ]),
  ],

};
