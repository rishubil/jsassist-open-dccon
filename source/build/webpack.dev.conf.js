var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'JSAssist Open Dccon',
      filename: 'index.html',
      template: 'index-templete.html',
      chunks: ['dcconIndex'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      title: 'JSAssist Open Dccon - List',
      filename: 'list.html',
      template: 'index-templete.html',
      chunks: ['dcconList'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      title: 'JSAssist Open Dccon - Chat',
      filename: 'chat.html',
      template: 'index-templete.html',
      chunks: ['dcconChat'],
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
