const base = require('./base');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'production',

  entry: [
    `${ __rootdir }/src/index.js`,
  ],

  output: {
    filename: 'js/bundle-[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
        'style-loader',
        'css-loader',
        'sass-loader'
        ],
      },
    ],
  },
});
