const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = (env) => {
  console.log(env)
  console.log(process.env.NODE_ENV);
  return {
    mode: env.production ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      clean: true,
      filename: env.production ? "assets/js/[name].[fullhash].js" : "assets/js/[name].bundle.js",
      path: path.resolve(__dirname, 'build'),
      publicPath: './'
    },
    devtool: env.development && "eval-cheap-source-map",
    optimization:{
      minimize: env.production,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons:false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          },
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            }
          },
          common: {
            minChunks: 2,
            priority: -10
          }
        }
      },
      runtimeChunk: "single"
    },
    devServer: {
      port: 5000,
      contentBase:'./public',
      watchContentBase: true,
      filename: '[name].bundle.js',
      hot: true,
      compress: true,
      historyApiFallback: true,
      open: true,
      overlay: true,
      publicPath:'/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        title: "React | Basic Setup",
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: env.production ? "assets/css/[name].bundle.css" : "assets/css/[name].[fullhash].css",
        chunkFilename: env.production ? "assets/css/[name].[contenthash:8].chunk.css" : "assets/css/[name].chunk.css"
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: env.production ? 'production' : 'development'
            }
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: false,
              encoding: true,
              name: "images/[name].[fullhash].[ext]",
            }
          }
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/images/[name].[fullhash].[ext]"
          }
        }
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  };
};
