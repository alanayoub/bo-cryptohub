'use strict';

// Node
const path                             = require('path');

// Libs
const HtmlWebpackPlugin                = require('html-webpack-plugin');
const CleanWebpackPlugin               = require('clean-webpack-plugin');
const CopyWebpackPlugin                = require('copy-webpack-plugin');

const PreBuild                         = require('./webpack-plugin-pre-build.js');

const { nodePugCompileTemplates: pug } = require('bo-utils');

module.exports = {

  entry: {
    app: path.resolve(__dirname, './public/javascript/index.js'),
    pug: path.resolve(__dirname, './public/javascript/generated/init-pug.generated.js')
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'javascript/[name].[chunkhash:8].js',
    chunkFilename: 'javascript/[name].[chunkhash:8].chunk.js'
  },

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'web',
  node: {
    __dirname: false,
    __filename: false,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },

  plugins: [
    new PreBuild(() => {
      console.log('Compiling pug templates');
      pug({
        varName: 'initPug',
        pugGlob: path.join(__dirname, './src/pug/**/*.pug'),
        outFile: path.join(__dirname, './public/javascript/generated/init-pug.generated.js')
      });
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './node_modules/bo-utils/dist/index.client.js',
        to:   './javascript/libs/bo-utils-client.js'
      },
      {
        from: './node_modules/bo-datatable/dist/index.client.js',
        to:   './javascript/libs/bo-datatable-client.js'
      },
      {
        from: './public/*',
        to:   './',
        flatten: true
      },
      {
        from: './public/images',
        to:   './images'
      },
      {
        from: './public/javascript/libs',
        to:   './javascript/libs'
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
  ],

};
