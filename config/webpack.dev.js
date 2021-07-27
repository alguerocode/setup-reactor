const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base.js");

// configuration of development webpack settings
module.exports = merge(webpackBase, {
  mode: "development",
  output: {
    filename: "assets/js/[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname,"..", "babel.config.js"),
            cacheDirectory: true,
            cacheCompression: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: true,
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    index: "index.html",
    port: 5000,
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
    hints: "warning",
  },
});
