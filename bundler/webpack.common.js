/*
 * @Author: Li Jian
 * @Date: 2021-12-22 21:36:23
 * @LastEditTime: 2021-12-22 22:44:19
 * @LastEditors: Li Jian
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
  module: {},
}
