<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-02-18 11:17:10
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const headername = ref('test header')
const times = ref(0)
const changeHeadername = () => {
  headername.value = `test header: ${times.value++}`
}

onMounted(() => {
  const myChart = echarts.init(document.querySelector('#left') as HTMLDivElement)
  myChart.setOption({
    title: {
      text: 'ECharts',
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  })
  const myChart1 = echarts.init(document.querySelector('#right') as HTMLDivElement)
  myChart1.setOption({
    title: {
      text: 'ECharts',
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  })
})
</script>
<template lang="pug">
#header(@click="changeHeadername()")
  | {{ headername }}
#left
#right
</template>

<style lang="scss">
#header {
  width: inherit;
  height: 40px;
  background-color: #009688;
  color: white;
  opacity: 0.8;
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
}
#left {
  width: 200px;
  height: 200px;
  background-color: white;
  opacity: 0.7;
  left: 10px;
  top: 50px;
}
#right {
  width: 200px;
  height: 200px;
  background-color: white;
  opacity: 0.7;
  left: 670px;
  top: 50px;
}
</style>
