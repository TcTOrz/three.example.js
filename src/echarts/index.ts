/*
 * @Author: Li Jian
 * @Date: 2022-03-14 16:45:09
 * @LastEditTime: 2022-03-15 16:25:29
 * @LastEditors: Li Jian
 */
import * as echarts from 'echarts'
import { EchartsInstanceInterface } from './index.d'
import { barLineOptions, stackBarOptions, pieOptions, barOptions } from './option'

export { barLineOptions, stackBarOptions, pieOptions, barOptions }

export default class EchartsInstance implements EchartsInstanceInterface {
  // 事件容器
  cancelEvents: Map<any, any> = new Map()
  // 记录所有chart实例
  charts: Map<any, any> = new Map()
  elem: HTMLDivElement
  constructor(elem: HTMLDivElement) {
    this.elem = elem
    return this
  }
  private addResizeEvent(instance: any) {
    const resizeHandler = () => {
      instance.resize()
    }
    this.cancelEvents.set(instance, resizeHandler)
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
      this.cancelEvents.delete(instance)
    }
  }
  registerChartInstance() {
    const elem = this.elem
    const existInstance = echarts.getInstanceByDom(elem)
    if (existInstance) return existInstance
    const instance = echarts.init(elem)
    this.showLoading(instance)
    this.addResizeEvent(instance)
    this.charts.set(elem, instance)
    return instance
  }
  setOption(instance: echarts.ECharts, option: any) {
    instance.setOption(option)
    this.hideLoading(instance)
  }
  private showLoading(instance: echarts.ECharts) {
    instance.showLoading({
      text: '加载中...',
      color: '#3BB5A0',
      lineWidth: 2,
    })
  }
  private hideLoading(instance: echarts.ECharts) {
    // setTimeout(() => {
    instance.hideLoading()
    // }, 2000)
  }
}
