/*
 * @Author: Li Jian
 * @Date: 2022-03-15 15:50:33
 * @LastEditTime: 2022-03-15 15:50:33
 * @LastEditors: Li Jian
 */
import { get } from '../index'

const getLeftTopChartData = (params?: Object) => get('/api/getLeftTopChartData', params)

export { getLeftTopChartData }
