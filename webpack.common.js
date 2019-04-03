'use strict';

// Node
const path               = require('path');

// Libs
const CopyPlugin         = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
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
      {from: './node_modules/bo-utils/dist/index.client.js', to: '../src/public/javascript/libs/bo-utils-client.js'},
      {from: './node_modules/bo-datatable/dist/index.client.js', to: '../src/public/javascript/libs/bo-datatable-client.js'},
      {from: './src/public', to: './public'},
      {from: './src/pug', to: './pug'},
    ]),
  ],

};
