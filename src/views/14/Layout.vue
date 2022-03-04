<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-04 10:09:31
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'

const headername = ref('test header')
const times = ref(0)
// const changeHeadername = () => {
//   headername.value = `test header: ${times.value++}`
// }
const theme = reactive({
  width: `${document.body.clientWidth}px`,
})
window.addEventListener('resize', () => {
  theme.width = `${document.body.clientWidth}px`
})

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
.layout
  #header
    .left
    .right
  .content
    #left
    #right
</template>

<style lang="scss">
$width: v-bind('theme.width');
$header-height: 50px;
$side-width: 300px;
.layout {
  // width: $width;
  // height: inherit;
  top: 0;
  left: 0;
  * {
    position: relative;
    opacity: 0.8;
  }
  #header {
    width: $width;
    height: $header-height;
    background-image: url('@assets/image/u6.png');
    background-repeat: no-repeat;
    background-size: 100%;
    // background-position: center;
    .left {
      width: 100px;
    }
    .right {
      width: 100px;
    }
  }
  .content {
    top: $header-height;
    height: calc(100vh - $header-height);
    width: $side-width;
    #left {
      width: inherit;
      height: inherit;
      background-color: white;
    }
    #right {
      width: inherit;
      height: inherit;
      left: calc($width - $side-width);
      background-color: white;
    }
  }
}
</style>
