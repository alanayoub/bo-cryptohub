const path = require('path');

module.exports = {

  mode: 'development',

  entry: './src/index.js',

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'node',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  // A module listed as an external will simply be left alone; it will not be bundled in
  externals: {}

};
