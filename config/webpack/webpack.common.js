const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

console.log(process.env.NODE_ENV,'welcome');
module.exports = {
  entry:path.resolve(__dirname,'..','..','src','index.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename:process.env.NODE_ENV === "production" ? "[name].[fullhash].css":"[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};
