<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-16 16:52:55
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import EchartsInstance, { barLineOptions, stackBarOptions, pieOptions, barOptions } from '@echarts'
import { httpCharts } from '@axios/api'
import _ from 'lodash'

// 实时获取页面宽度, 响应式布局
const theme = reactive({
  width: `${document.body.clientWidth}px`,
})
window.addEventListener('resize', () => {
  theme.width = `${document.body.clientWidth}px`
})
// 昵称
const nickname = ref('张三')
// 切换导航栏
let showNavBar = ref(false)
let showNavBarTag = ref(false)
const toggleNavBar = () => {
  showNavBarTag.value = !showNavBarTag.value
  if (showNavBarTag.value) {
    showNavBar.value = showNavBarTag.value
    ;(document.querySelector('.navigate') as HTMLDivElement).style.animation = 'flipInX 1s'
  } else {
    ;(document.querySelector('.navigate') as HTMLDivElement).style.animation = 'flipOutX 1s'
    setTimeout(() => {
      showNavBar.value = showNavBarTag.value
    }, 1000)
  }
}
document.body.addEventListener('click', e => {
  // 点击其他区域关闭搜索
  if ((e.target as any).dataset.f === 'navigate') {
    showNavBarTag.value = false
    ;(document.querySelector('.navigate') as HTMLDivElement).style.animation = 'flipOutX 1s'
    setTimeout(() => {
      showNavBar.value = showNavBarTag.value
    }, 1000)
  }
})
// 搜索
const inputSearch = ref('')
const btnSearch = () => {
  console.log(inputSearch.value)
}

// 图表渲染 - 这里的代码我觉得放到axios/https/charts.ts里面更好。
// 等后期代码全部写好再进行迁移，防止意外情况。
const renderLeftTop = async () => {
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
const renderLeftMiddle = async () => {
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
const renderLeftBottom = async () => {
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
const renderRightTop = async () => {
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
const renderRightMiddle = async () => {
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
const renderRightBottom = async () => {
  const dom = document.querySelector('#content-right-bottom') as HTMLDivElement
  const myChart = new EchartsInstance(dom)
  const myChartIns = myChart.registerChartInstance()
  const options = _.cloneDeep(barLineOptions)
  const res = await httpCharts.getRightBottomChartData()
  let data = res.data
  options.title.text = data.text
  options.xAxis.data = data.xAxis
  options.yAxis[0].name = data.yAxis[0].name
  options.yAxis[1].name = data.yAxis[1].name
  options.series[0].data = data.series[0].data
  options.series[1].data = data.series[1].data
  myChart.setOption(myChartIns, options)
}

// 点击全屏事件
const contentLeftTop = ref(null)
const getBoxPosition = (dom: HTMLDivElement) => {
  const domRect = dom.getBoundingClientRect()
  const top = domRect.top
  const left = domRect.left
  const width = domRect.width
  const height = domRect.height
  return { top, left, width, height }
}
const handleFullScreen = () => {
  const dom = contentLeftTop.value
  const { left, width } = getBoxPosition(dom as unknown as HTMLDivElement)
  console.log(left, width)
}

onMounted(() => {
  renderLeftTop()
  renderLeftMiddle()
  renderLeftBottom()
  renderRightTop()
  renderRightMiddle()
  renderRightBottom()
})
</script>
<template lang="pug">
.layout
  //- 此处有一个bug，在开发环境中，无法触发.pug文件的热更新。
  //- 目前无法锁定是vite bug(github issue未找到有人提这个bug), 还是其他原因。
  include ./Header
  //- 定义一个空白区域
  include ./Gap
  include ./Content
  //- 导航栏
  include ./Navigate
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
@import './Layout';
</style>
