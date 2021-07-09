const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = (env) => { // webpack function with env pramater and return webpack config ;
                            //
  console.log(env)          // console the webpack env object {} ;

  return {
    mode: env.production ? 'production' : 'development',//Providing the mode configuration option tells webpack
                                                        //to use its built-in optimizations accordingly. (production | development);
    entry: './src/index.js',                            //The entry object is where webpack looks to start building the bundle;
    output: {
      clean: true, // Clean the output directory before emit.
      filename: env.production ? "assets/js/[name].[fullhash].js" : //This option determines the name of each output bundle;
                                 "assets/js/[name].bundle.js",      // it determines depend on webpack env property;
      path: path.resolve(__dirname, 'build'),                       // tells webpack where path to output the files;
      publicPath: './'  // This option specifies the public URL of the output directory when referenced in a browser;
    },
    devtool: env.development && "eval-cheap-source-map",   // This option controls if and how source maps are generated if
                                                           // webpack env.production = true is set to false for optimization and minifying the files
    optimization:{                  // optimization section 
      minimize: env.production,     // Tell webpack to minimize the bundle using the TerserPlugin or the plugin(s) specified in minimizer
                                    // if webpack env.production = false don't use it and use default webpack optimization 
      minimizer: [                  // Allows you to override the default minimizer by providing a different one or more customized
        new TerserWebpackPlugin({   // tarser => use for minimize and optimize js files 
          parallel:true,            // Use multi-process parallel running to improve the build speed
          terserOptions: {          // Terser minify options 
            compress: {              
              comparisons:false,    
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false       // allow show warning 
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
