/*
 * @Author: Li Jian
 * @Date: 2022-03-15 11:37:57
 * @LastEditTime: 2022-03-15 16:26:46
 * @LastEditors: Li Jian
 */
import * as echarts from 'echarts'
export class EchartsInstanceInterface {
  cancelEvents: Map<any, any>
  charts: Map<any, any>
  elem: HTMLDivElement
  constructor(elem: HTMLDivElement)
  registerChartInstance(): echarts.ECharts
  setOption(instance: echarts.ECharts, option: any): void
}
