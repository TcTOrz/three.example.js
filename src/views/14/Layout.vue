<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-04 14:34:04
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'

const headername = ref('test header')
const times = ref(0)

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
      .container
        #aIcon
          <svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="15px" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1 0 0 1 -1580 -19 )">
              <path d="M 20.0184135977337 0  C 20.4348441926346 0  20.7273371104816 0.193892045454546  20.8958923512748 0.581676136363637  C 21.064447592068 0.989346590909089  20.9950424929178 1.33735795454545  20.6876770538244 1.62571022727273  L 13 8.97869318181818  L 13 20.0454545454545  C 13.3555240793201 20.4630681818182  13.1621813031161 20.7563920454545  12.7754957507082 20.9254261363636  C 12.6466005665722 20.9751420454545  12.5226628895184 21  12.4036827195467 21  C 12.1359773371105 21  11.9128895184136 20.9055397727273  11.7344192634561 20.7166193181818  L 7.92705382436261 16.8984375  C 7.73866855524079 16.7095170454545  7.64447592067989 16.4857954545455  7.64447592067989 16.2272727272727  L 7.64447592067989 8.97869318181818  L 0.312322946175637 1.62571022727273  C 0.00495750708215297 1.33735795454545  -0.0644475920679887 0.989346590909089  0.104107648725212 0.581676136363637  C 0.272662889518414 0.193892045454546  0.565155807365439 0  0.981586402266289 0  L 20.0184135977337 0  Z " fill-rule="nonzero" fill="#a4d8fd" stroke="none" transform="matrix(1 0 0 1 1580 19 )" />
            </g>
          </svg>
        #bIcon
        #cIcon
        #dIcon
        #eIcon
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
      width: 100px;
      height: 40px;
      .container {
        width: 100%;
        height: 100%;
        & > div {
          display: flex;
          align-items: center;
        }
        #aIcon {
          width: 20px;
          height: 100%;
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
