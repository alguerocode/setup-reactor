const path = require('path');
const commonWebpack = require('./webpack.common');
const { merge } = require('webpack-merge');


module.exports = merge(commonWebpack,{
  mode:'development',
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'..','..','build')
  },
  devServer:{
    port:5000,
    watchContentBase:true,
    contentBase:'../../build',
    filename:'[name].bundle.js'
  }
})