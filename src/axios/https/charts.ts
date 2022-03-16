/*
 * @Author: Li Jian
 * @Date: 2022-03-15 15:50:33
 * @LastEditTime: 2022-03-16 09:23:14
 * @LastEditors: Li Jian
 */
import { get } from '../index'

const getLeftTopChartData = (params?: Object) => get('/api/getLeftTopChartData', params)
const getLeftMiddleChartData = (params?: Object) => get('/api/getLeftMiddleChartData', params)
const getLeftBottomChartData = (params?: Object) => get('/api/getLeftBottomChartData', params)
const getRightTopChartData = (params?: Object) => get('/api/getRightTopChartData', params)
const getRightMiddleChartData = (params?: Object) => get('/api/getRightMiddleChartData', params)
const getRightBottomChartData = (params?: Object) => get('/api/getRightBottomChartData', params)

export {
  getLeftTopChartData,
  getLeftMiddleChartData,
  getLeftBottomChartData,
  getRightTopChartData,
  getRightMiddleChartData,
  getRightBottomChartData,
}
