/*
 * @Author: Li Jian
 * @Date: 2022-03-10 10:16:53
 * @LastEditTime: 2022-03-10 10:43:43
 * @LastEditors: Li Jian
 */
import { get } from '../index'

// const getFlyline = (params: Object) => get('https://api.oick.cn/lishi/api.php', params)
const getFlyline = (params: Object) => get('/api/get/flyline', params)

export { getFlyline }
