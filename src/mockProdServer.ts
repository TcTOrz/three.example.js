/*
 * @Author: Li Jian
 * @Date: 2022-03-10 10:52:41
 * @LastEditTime: 2022-03-10 14:14:27
 * @LastEditors: Li Jian
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import testModule from './mock/index'

export function setupProdMockServer() {
  createProdMockServer([...testModule])
}
