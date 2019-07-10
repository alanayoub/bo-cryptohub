'use strict';

// Node
const path                             = require('path');
const fs                               = require('fs');

// Libs
const HtmlWebpackPlugin                = require('html-webpack-plugin');
const CleanWebpackPlugin               = require('clean-webpack-plugin');
const CopyWebpackPlugin                = require('copy-webpack-plugin');
const MiniCssExtractPlugin             = require('mini-css-extract-plugin');

const PreBuild                         = require('./webpack-plugin-pre-build.js');

const { nodePugCompileTemplates: pug } = require('bo-utils');

module.exports = {

  entry: {
    app: path.resolve(__dirname, './public/javascript/index.js'),
    pug: path.resolve(__dirname, './public/javascript/generated/init-pug.generated.js')
  },

  output: {
    path: path.join(__dirname, './dist/public'),
    filename: 'javascript/[name].[chunkhash:8].js',
    chunkFilename: 'javascript/[name].[chunkhash:8].chunk.js'
  },

  externals: {
    JsonUrl: 'JsonUrl'
  },

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'web',

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
        pugGlob: path.join(__dirname, './public/javascript/views/**/*.pug'),
        outFile: path.join(__dirname, './public/javascript/generated/init-pug.generated.js')
      });

      const copyConf = [
        {
          source: './node_modules/bo-utils/dist/index.client.js',
          destination: path.resolve(__dirname, './public/javascript/libs/bo-utils-client.js')
        },
        {
          source: './node_modules/bo-datatable/dist/index.client.js',
          destination: path.resolve(__dirname, './public/javascript/libs/bo-datatable-client.js')
        },
        {
          source: './node_modules/json-url/dist/browser/json-url-single.js',
          destination: path.resolve(__dirname, './public/javascript/libs/json-url-single.js')
        }
      ]
      for (let c of copyConf) {
        fs.copyFile(c.source, c.destination, error => {
          if (error) throw err;
          console.log(`${c.source} copied to ${c.destination}`);
        });
      }

    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
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
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[name].[chunkhash:8].chunk.css'
    })
  ],

};
