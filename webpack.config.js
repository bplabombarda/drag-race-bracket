/* eslint-disable */
global.__rootdir = require('path').resolve(__dirname);

require('dotenv').config();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const merge             = require('webpack-merge');
const webpack           = require('webpack');
const { resolve }       = require('path');

const PRODUCTION = process.env.NODE_ENV === 'production';
const SRC_DIR = `${ __rootdir }/src`;

const commonConfig = {
  output: {
    path:   `${ __rootdir }/public`,
    pathinfo: !PRODUCTION,
  },

  context: resolve(__dirname),

  devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    stats: 'minimal',
  },

  bail: PRODUCTION,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg|png)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject:   'body',
      filename: 'index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css|scss/,
      options: {
        postcss: [
          autoprefixer(),
        ],
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
      'process.env.FIERBASE_DATABASE_URL': JSON.stringify(process.env.FIERBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
    }),
  ],

  resolve: {
    alias: {
      Source:     SRC_DIR,
      Components: `${ SRC_DIR }/components`,
      Config:     `${ __rootdir }/config`,
      Images:     `${ SRC_DIR }/assets/images`,
      Pages:      `${ SRC_DIR }/pages`,
      Styles:     `${ SRC_DIR }/styles`,
      Utils:      `${ SRC_DIR }/utils`,
    },
    extensions: [".js", ".json", ".css", ".scss"],
  }
}

if (PRODUCTION) {
  console.info( 'Building for prod...');

  module.exports = merge( commonConfig, {
    mode: 'production',

    entry: {
      main: `${ __rootdir }/src/index.js`,
      vendor: [
        'react',
        'react-dom',
      ],
    },

    output: {
      filename: 'js/[hash].js',
      publicPath: '/',
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  });
} else {
  console.info( 'Serving locally...');

  module.exports = merge( commonConfig, {
    mode: 'development',

    devServer: {
      historyApiFallback: true,
    },

    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      `${ __rootdir }/src/index.js`,
    ],

    output: {
      filename: 'js/bundle.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  });
}
