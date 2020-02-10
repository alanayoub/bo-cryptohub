'use strict';

const merge = require('webpack-merge');
const critical = require('critical');

const common = require('./webpack.client.common.js');
const PostBuild = require('./webpack-plugin-post-build.js');

module.exports = merge(common, {

  mode: 'production',

  plugins: [
    new PostBuild(() => {
      console.log('Running "critical", generating new HTML');
      critical.generate({
        inline: true,
        base: 'src/',
        src: 'index-generated.html',
        dest: 'index-generated.html',
        width: 1300,
        height: 900,
        minify: true
      });
    })
  ],

});
