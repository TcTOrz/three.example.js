/*
 * @Author: Li Jian
 * @Date: 2022-03-10 10:16:53
 * @LastEditTime: 2022-03-10 15:10:44
 * @LastEditors: Li Jian
 */
import { get } from '../index'

const getPoint = (params: Object) => get('/api/point', params)

// const getFlyline = (params: Object) => get('https://api.oick.cn/lishi/api.php', params)
const getFlyline = (params: Object) => get('/api/flyline', params)

const getPointAndFlyline = (params?: Object) => get('/api/pointAndFlyline', params)

export { getFlyline, getPoint, getPointAndFlyline }
