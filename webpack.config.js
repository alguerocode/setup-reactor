const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TasterPlugin = require('terser-webpack-plugin');

const path = require('path');


module.exports = (env) => {
  console.log(env)

  const config = {
    mode: "development",
    entry: path.resolve(__dirname, 'src', 'index.js'),
    devtool: "eval-cheap-source-map",
    devServer: {
      port: 5000,
      watchContentBase: true,
      contentBase: './build',
      filename: '[name].bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: env.production ? "[name].[fullhash].css" : "[name].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              exclude: /node_modules/
            }
          }
        }
      ]
    }
  }
  if (env.production) {
    config.mode = 'production';
    config.devtool = false;
    config.output.filename = '[name].[fullhash].js';
    config.output = {
      clean: true,
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, 'build'),
      publicPath: './build'
    },
      config.optimization = {
        minimize: true,
        minimizer: [
          new TasterPlugin({
            exclude: /node_modules/,
            test: /\.(js|jsx)$/,
            extractComments: false,

          }),
          new CssMinimizerPlugin()
        ]
      }
  }
  return config;
};
