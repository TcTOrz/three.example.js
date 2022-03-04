<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-04 16:50:48
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
  #header
    .left
    .right
      .container
        svg-icon#aIcon(name="u241" width="25px" height="25px" style="transform: scale(.7);")
        #bContainer
          #bText
            | {{ nickname }}
          svg-icon#bIcon(name="u242" width="40px" height="40px" style="transform: scale(.7);")
        svg-icon#cIcon(name="u243" width="25px" height="21px" style="transform: scale(.7);")
        svg-icon#dIcon(name="u244" width="20px" height="22px" style="transform: scale(.7);")
        svg-icon#eIcon(name="u245" width="25px" height="25px" style="transform: scale(.7);")
  .content
    //- #left
    //- #right
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
$header-height: 50px;
$side-width: 150px;
$opacity: 0.9;
.layout {
  top: 0;
  left: 0;
  & > div {
    opacity: $opacity;
  }
  #header {
    width: $width;
    height: $header-height;
    background-image: url('@assets/image/u6.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 80px;
      height: 50px;
      background-image: url('@assets/image/menu_u240.png');
      background-repeat: no-repeat;
      background-size: 50px;
      background-position: center;
      opacity: 1;
      cursor: pointer;
    }
    .right {
      width: 160px;
      height: 40px;
      position: relative;
      right: 80px;
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > * {
          cursor: pointer;
        }
        #aIcon {
          width: 20px;
        }
        #bContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          #bIcon {
            width: 40px;
          }
          #bText {
            position: absolute;
            z-index: 1;
            color: white;
            font-size: 12px;
            transform: scale(0.8);
            user-select: none;
          }
        }
        #cIcon {
          width: 25px;
        }
        #dIcon {
          width: 20px;
        }
        #eIcon {
          width: 25px;
        }
      }
    }
  }
  .content {
    top: $header-height;
    #left {
      width: $side-width;
      height: calc(100vh - $header-height);
      background-color: white;
      display: inline-block;
      position: absolute;
    }
    #right {
      width: $side-width;
      height: calc(100vh - $header-height);
      left: calc($width - $side-width);
      background-color: white;
      display: inline-block;
      position: absolute;
    }
  }
}
</style>
