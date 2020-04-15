'use strict';

// Node
const path                             = require('path');
const fs                               = require('fs-extra');

// Libs
const HtmlWebpackPlugin                = require('html-webpack-plugin');

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
    pathinfo: true,
    path: path.join(__dirname, './dist/public'),
    filename: 'javascript/[name].[chunkhash:8].js',
    chunkFilename: 'javascript/[name].[chunkhash:8].chunk.js'
  },

  externals: {
    JsonUrl: 'JsonUrl',
    jquery: 'jQuery',
    GoldenLayout: 'GoldenLayout',
  },

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'web',

  resolve: {
    unsafeCache: true
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },

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
            options: {minimize: true}
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
  },

  plugins: [
    new PreBuild(() => {

      console.log('--- Compiling pug templates');
      pug({
        varName: 'initPug',
        pugGlob: path.join(__dirname, './public/javascript/{views,bo}/**/*.pug'),
        outFile: path.join(__dirname, './public/javascript/generated/init-pug.generated.js')
      });

      console.log('--- Copy lib files into public (not dist/public)');
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
        },
      ]

      for (let c of copyConf) {
        fs.copyFile(c.source, c.destination, error => {
          if (error) {
            throw error;
          }
          console.log(`--- ${c.source} copied to ${c.destination}`);
        });
      }

      // Copy files here because there are lots of them
      // and if we do the copy in the normal plugin the watch task
      // copies them every save even if we ignore that folder
      console.log('--- Copying images folders');
      // let source, destination;
      // source = path.resolve(__dirname, './public/images/');
      // destination = path.resolve(__dirname, './dist/public/images/');
      // fs.copySync(source, destination);
      // source = path.resolve(__dirname, './public/images/');
      // destination = path.resolve(__dirname, './dist/public/images/');
      // fs.copy(source, destination);
      console.log('--- Copy images folders finished');

    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[name].[chunkhash:8].chunk.css'
    }),
    new CopyWebpackPlugin([
      {
        from: './public/images',
        to:   './images',
        ignore: ['generated/*'],
        logLevel: 'debug'
      },
      {
        from: './public/javascript/libs/bo-utils-client.js',
        to:   './javascript/libs/bo-utils-client.js'
      },
      {
        from: './public/javascript/libs/bo-datatable-client.js',
        to:   './javascript/libs/bo-datatable-client.js'
      },
      {
        from: './public/javascript/libs/json-url-single.js',
        to:   './javascript/libs/json-url-single.js'
      },
      {
        from: './public/privacy.html',
        to:   './privacy.html'
      },
      {
        from: './public/privacy.html',
        to:   './privacy.html'
      },
      {
        from: './public/manifest.json',
        to:   './manifest.json'
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index-generated.html',
    }),
  ],

};
