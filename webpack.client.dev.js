'use strict';

const merge  = require('webpack-merge');
const common = require('./webpack.client.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {

  mode: 'development',
  // watch: true,

  watchOptions: {
    ignored: ['node_modules', 'cache']
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: false}
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      },
      {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Creates `style` nodes from JS strings
            // 'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
      }

    ]
  }
});
