/*
 * @Author: Li Jian
 * @Date: 2021-12-22 22:41:36
 * @LastEditTime: 2021-12-22 22:41:37
 * @LastEditors: Li Jian
 */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
})
