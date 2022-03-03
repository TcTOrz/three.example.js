/*
 * @Author: Li Jian
 * @Date: 2022-03-03 10:10:29
 * @LastEditTime: 2022-03-03 10:39:27
 * @LastEditors: Li Jian
 * @Description: remove dist files
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exit } = require('process')

fs.existsSync(path.resolve(__dirname, '../dist')) &&
  fs.rm(path.resolve(__dirname, '../dist'), { recursive: true }, err => {
    if (err) {
      console.log(
        chalk.red.bgGreenBright('你可能没有权限删除dist文件夹，请手动删除dist文件夹后再执行')
      )
      console.log(chalk.red(err))
      process.exit(1)
    } else {
      console.log(chalk.green('删除成功'))
    }
  })
