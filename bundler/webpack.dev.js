/*
 * @Author: Li Jian
 * @Date: 2021-12-22 21:33:28
 * @LastEditTime: 2021-12-22 22:40:42
 * @LastEditors: Li Jian
 */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  mode: 'development',
  // devServer: {
  //   port: '8080',
  //   open: true,
  // },
})
