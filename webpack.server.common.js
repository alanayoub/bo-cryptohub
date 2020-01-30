'use strict';

// Node
const path               = require('path');

// Libs
const CopyPlugin         = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals      = require('webpack-node-externals');
const PreBuild           = require('./webpack-plugin-pre-build.js');

const generateColumnDependencies = require('./src/utils/generateColumnDependencies.js');

module.exports = {

  entry: './src/index.js',
  // watch: true,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  node: {
    __dirname: false,
    __filename: false,
  },

  plugins: [
    new PreBuild(() => {

      generateColumnDependencies(result => {
        if (!result) {
          console.log('Error generating column dependencies');
        }
      });

    })
  ],

};
