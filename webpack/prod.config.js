module.exports = {
  mode: "production",
  entry: {
    main: `${__rootdir}/src/index.js`,
    vendor: ["react", "react-dom"],
  },
  output: {
    filename: "js/[name].[contenthash].js",
    publicPath: "/",
  },
};
