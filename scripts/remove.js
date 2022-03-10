/*
 * @Author: Li Jian
 * @Date: 2022-03-03 10:10:29
 * @LastEditTime: 2022-03-10 11:02:37
 * @LastEditors: Li Jian
 * @Description: remove dist files
 */
/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑     永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
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
      console.log(chalk.green('dist文件删除成功'))
    }
  })
if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  console.log(chalk.grey.bgGreenBright('dist文件夹不存在，无需删除'))
}
