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

};
