// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: [`./src/index.js`],
  output: {
    filename: "js/[name].[contenthash].js",
    path: "/",
  },
  devServer: {
    static: {
      directory: "./js",
    },
    historyApiFallback: true,
  },
  // plugins: [new BundleAnalyzerPlugin()],
};
