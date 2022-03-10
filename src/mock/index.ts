/*
 * @Author: Li Jian
 * @Date: 2022-03-10 09:58:10
 * @LastEditTime: 2022-03-10 14:09:46
 * @LastEditors: Li Jian
 */
import { MockMethod } from 'vite-plugin-mock'
// const Mock = require('mockjs')
import Mock from 'mockjs'

export default [
  {
    url: '/api/get/flyline',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: [
          {
            test: 'hello world',
          },
        ],
      })
    },
  },
] as MockMethod[]
