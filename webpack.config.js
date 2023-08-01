const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/index.js", "./src/api.js"],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  optimization: {
    runtimeChunk: "single",
  },
};
