const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base.js");

// configuration of development webpack settings
module.exports = merge(webpackBase, {
  mode: "development",
  output: {
    filename: "assets/js/[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    assetModuleFilename: "images/[name][ext]",
  },
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, "babel.config.js"),
            cacheDirectory: true,
            cacheCompression: true,
            envName: "development",
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    index: "index.html",
    port: 8080,
    compress: true,
    historyApiFallback: true,
    overlay: true,
    watchContentBase: true,
    contentBasePublicPath: path.resolve(__dirname, "public"),
    inline: true,
    open: true,
    progress: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  performance: {
    hints: false,
  }
});
