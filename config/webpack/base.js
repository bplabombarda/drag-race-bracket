global.__rootdir = require('path').resolve(__dirname, '../../');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const aliases = require('./aliases');

const prod = process.env.node_env === 'production';

module.exports = {
  output: {
    path:   `${ __rootdir }/public`,
    pathinfo: !prod,
    publicPath: '/',
  },

  devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',

  bail: prod,

  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${ __rootdir }/server/views/index.html`,
      inject:   'body',
      filename: 'index.html',
      title: 'Yoooooo!',
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.sass|scss/,
      options: {
        postcss: [
          autoprefixer({
            browsers: [ 'last 2 versions' ]
          })
        ]
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    alias: { ...aliases },
    extensions: [ '.js', '.jsx', '.json', '.css', '.sass', '.scss' ]
  }
};
