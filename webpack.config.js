const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        // extract css and put them in sperate files
        filename: env.production
          ? "assets/css/[name].bundle.css"
          : "assets/css/[name].[fullhash].css", // file name approach
        chunkFilename: env.production
          ? "assets/css/[name].[contenthash:8].chunk.css"
          : "assets/css/[name].chunk.css", // chunk name of files
      }),
      new webpack.DefinePlugin({
        // set the NODE_ENV property
        "process.env.NODE_ENV": JSON.stringify(
          env.production ? "production" : "development"
        ),
      }),
    ],

  };
};
/************************************************************************************************** end  */
