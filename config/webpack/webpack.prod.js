const path = require('path');
const { merge } = require('webpack-merge');
const commonWebpack = require('./webpack.common');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TasterPlugin = require('terser-webpack-plugin');

module.exports = merge(commonWebpack, {
  mode: "production",
  devtool: false,
  output: {
    clean: true,
    filename: "[name].[fullhash].js",
    path: path.resolve(__dirname, '..', '..', 'build')
  },
  optimization:{
    minimize:true,
    minimizer:[
      new TasterPlugin({
        exclude:/node_modules/,
        test:/\.js$/,
        extractComments:false
      }),
      new CssMinimizerPlugin()
    ]
  }
})


