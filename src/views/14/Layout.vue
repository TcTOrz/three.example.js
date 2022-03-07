<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-07 16:26:51
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'

const theme = reactive({
  width: `${document.body.clientWidth}px`,
})
window.addEventListener('resize', () => {
  theme.width = `${document.body.clientWidth}px`
})
const nickname = ref('张三')
onMounted(() => {
  //   const myChart = echarts.init(document.querySelector('#left') as HTMLDivElement)
  //   myChart.setOption({
  //     title: {
  //       text: 'ECharts',
  //     },
  //     xAxis: {
  //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: '销量',
  //         type: 'bar',
  //         data: [5, 20, 36, 10, 10, 20],
  //       },
  //     ],
  //   })
  //   const myChart1 = echarts.init(document.querySelector('#right') as HTMLDivElement)
  //   myChart1.setOption({
  //     title: {
  //       text: 'ECharts',
  //     },
  //     xAxis: {
  //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: '销量',
  //         type: 'bar',
  //         data: [5, 20, 36, 10, 10, 20],
  //       },
  //     ],
  //   })
})
</script>
<template lang="pug">
.layout
  include ./Header
  //- 定义一个空白区域
  include ./Gap
  include ./Content
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
@import './Layout';
</style>
