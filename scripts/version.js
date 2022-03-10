/*
 * @Author: Li Jian
 * @Date: 2022-03-09 15:43:31
 * @LastEditTime: 2022-03-10 10:47:03
 * @LastEditors: Li Jian
 */
const semver = require('semver')
const { engines } = require('../package')
const chalk = require('chalk')

const version = engines.node
if (!semver.satisfies(process.version, version)) {
  console.log(chalk.red.bgGreenBright(`Required node version ${version}, got: ${process.version}.`))
  process.exit(1)
}
console.log(chalk.grey.bgGreenBright(`Required node version ${version}, got: ${process.version}.`))
