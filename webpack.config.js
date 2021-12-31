/* eslint-disable */
global.__rootdir = require("path").resolve(__dirname);

require("dotenv").config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const merge = require("webpack-merge");
const webpack = require("webpack");
const { resolve } = require("path");

const PRODUCTION = process.env.NODE_ENV === "production";
const SRC_DIR = `${__rootdir}/src`;

const baseConfig = {
  bail: PRODUCTION,
  context: resolve(__dirname),
  devtool: PRODUCTION ? "source-map" : "cheap-module-eval-source-map",
  devServer: {
    stats: "minimal",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg|png)$/,
        use: "file-loader",
      },
    ],
  },
  output: {
    path: `${__rootdir}/public`,
    pathinfo: !PRODUCTION,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body",
      filename: "index.html",
      title: "Dillcap",
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css|scss/,
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.FIREBASE_API_KEY": JSON.stringify(
        process.env.FIREBASE_API_KEY
      ),
      "process.env.FIREBASE_APP_ID": JSON.stringify(
        process.env.FIREBASE_APP_ID
      ),
      "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
        process.env.FIREBASE_DATABASE_URL
      ),
      "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
        process.env.FIREBASE_PROJECT_ID
      ),
    }),
  ],
  resolve: {
    alias: {
      Source: SRC_DIR,
      Components: `${SRC_DIR}/components`,
      Config: `${__rootdir}/config`,
      Images: `${SRC_DIR}/assets/images`,
      Pages: `${SRC_DIR}/pages`,
      Styles: `${SRC_DIR}/styles`,
      Utils: `${SRC_DIR}/utils`,
    },
    extensions: [".js", ".json", ".css", ".scss"],
  },
};

if (PRODUCTION) {
  console.info("Building for prod...");
  module.exports = merge(baseConfig, {
    mode: "production",
    entry: {
      main: `${__rootdir}/src/index.js`,
      vendor: ["react", "react-dom"],
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                resources: [resolve(__dirname, "./src/styles/globals.scss")],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    output: {
      filename: "js/[hash].js",
      publicPath: "/",
    },
  });
} else {
  console.info("Serving locally...");
  module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
      historyApiFallback: true,
    },
    entry: [
      "webpack-dev-server/client?http://localhost:8080",
      `${__rootdir}/src/index.js`,
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                resources: [resolve(__dirname, "./src/styles/globals.scss")],
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: "js/bundle.js",
      publicPath: "/",
    },
  });
}
