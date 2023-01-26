global.__rootdir = require("path").resolve(__dirname);
require("dotenv").config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { resolve } = require("path");
const devConfig = require("./webpack/dev.config");
const prodConfig = require("./webpack/prod.config");
const PRODUCTION = process.env.NODE_ENV === "production";

const baseConfig = {
  context: resolve(__dirname),
  bail: PRODUCTION,
  devtool: PRODUCTION ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
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
      "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(
        process.env.FIREBASE_MEASUREMENT_ID
      ),
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

// serve
if (PRODUCTION) {
  console.info("Building for prod...");
  module.exports = merge(baseConfig, prodConfig);
} else {
  console.info("Serving locally...");
  module.exports = merge(baseConfig, devConfig);
}
