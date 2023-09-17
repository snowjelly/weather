const path = require("path");

module.exports = {
  mode: "development",
  entry: [
    "./src/index.js",
    "./src/api.js",
    "./src/init.js",
    "./src/localStorage.js",
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 9000,
  },
  optimization: {
    runtimeChunk: "single",
  },
};
