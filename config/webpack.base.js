const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "src", "index.jsx"),
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        loader: "worker-loader",
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".html", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "public", "index.html"),
      inject: true,
    }),
  ],
};
