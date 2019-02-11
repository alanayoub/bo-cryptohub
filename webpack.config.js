const path = require('path');

module.exports = {
  entry: './src/index.js',

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  target: 'node',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'backend.js'
  },

  // A module listed as an external will simply be left alone; it will not be bundled in

  // resolve: {
  //   modules: [path.resolve(__dirname, 'src'), 'node_modules']
  // },
  node: {
    // Module not found: Error: Can't resolve 'fs' in
    // @see https://github.com/webpack-contrib/css-loader/issues/447
    fs: 'empty'
  }
};
