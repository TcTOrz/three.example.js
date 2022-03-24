/*
 * @Author: Li Jian
 * @Date: 2022-03-17 09:24:40
 * @LastEditTime: 2022-03-24 09:49:31
 * @LastEditors: Li Jian
 * @Description: 存放echarts数据处理的api
 */
import EchartsInstance, { barLineOptions, stackBarOptions, pieOptions, barOptions } from '@echarts'
import { httpCharts } from '@axios/api'
import _ from 'lodash'

export const renderLeftTop = async () => {
  const dom = document.querySelector('#content-left-top') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const res = await httpCharts.getLeftTopChartData()
  let data = res.data
  const options = _.cloneDeep(barLineOptions)
  options.title.text = data.text
  options.xAxis.data = data.xAxis
  options.yAxis[0].name = data.yAxis[0].name
  options.yAxis[1].name = data.yAxis[1].name
  options.series[0].data = data.series[0].data
  options.series[1].data = data.series[1].data
  myChart.setOption(myChartIns, options)
}
export const renderLeftMiddle = async () => {
  const dom = document.querySelector('#content-left-middle') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const options = _.cloneDeep(pieOptions)
  const res = await httpCharts.getLeftMiddleChartData()
  let data = res.data
  options.title.text = data.text
  options.series.data = data.series.data
  myChart.setOption(myChartIns, options)
}
export const renderLeftBottom = async () => {
  const dom = document.querySelector('#content-left-bottom') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const options = _.cloneDeep(barOptions)
  const res = await httpCharts.getLeftBottomChartData()
  let data = res.data
  options.title.text = data.text
  options.xAxis.data = data.xAxis
  options.yAxis.name = data.yAxis[0].name
  options.series[0].name = data.series[0].name
  options.series[1].name = data.series[1].name
  options.series[0].data = data.series[0].data
  options.series[1].data = data.series[1].data
  myChart.setOption(myChartIns, options)
}
export const renderRightTop = async () => {
  const dom = document.querySelector('#content-right-top') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const options = _.cloneDeep(stackBarOptions)
  const res = await httpCharts.getRightTopChartData()
  let data = res.data
  options.title.text = data.text
  options.xAxis.data = data.xAxis
  options.yAxis.name = data.yAxis[0].name
  options.series[0].name = data.series[0].name
  options.series[1].name = data.series[1].name
  options.series[0].data = data.series[0].data
  options.series[1].data = data.series[1].data
  myChart.setOption(myChartIns, options)
}
export const renderRightMiddle = async () => {
  const dom = document.querySelector('#content-right-middle') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const options = _.cloneDeep(pieOptions)
  const res = await httpCharts.getRightMiddleChartData()
  let data = res.data
  options.title.text = data.text
  options.series.data = data.series.data
  myChart.setOption(myChartIns, options)
}
export const renderRightBottom = async () => {
  const dom = document.querySelector('#content-right-bottom') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const options = _.cloneDeep(stackBarOptions)
  const res = await httpCharts.getRightBottomChartData()
  let data = res.data
  options.title.text = data.text
  options.xAxis.data = data.xAxis
  options.yAxis.name = data.yAxis[0].name
  options.series[0].name = data.series[0].name
  options.series[1].name = data.series[1].name
  options.series[0].data = data.series[0].data
  options.series[1].data = data.series[1].data
  myChart.setOption(myChartIns, options)
}
