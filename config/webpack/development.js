const base = require('./base');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',

  entry: [
    `${ __rootdir }/src/index.js`,
  ],

  output: {
    filename: 'js/bundle.js',
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

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  }
});
