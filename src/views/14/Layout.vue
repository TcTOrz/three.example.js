<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-07 15:47:47
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
  .gap
  .content
    #left
      .content-left-top
        .border-flash-top
        .border-flash-left
      .content-left-middle
        .border-flash-top
        .border-flash-left
      .content-left-bottom
        .border-flash-top
        .border-flash-left
    #right
      .content-right-top
        .border-flash-top
        .border-flash-left
      .content-right-middle
        .border-flash-top
        .border-flash-left
      .content-right-bottom
        .border-flash-top
        .border-flash-left
    #top
      #top0
        .top-left
        .top-right
          .top-right-top
            | 2000
            span
              | 座
          .top-right-bottom
            | 特高压变电站
      #top1
        .top-left
        .top-right
          .top-right-top
            | 4500
            span
              | 个
          .top-right-bottom
            | 特高压杆塔
      #top2
        .top-left
        .top-right
          .top-right-top
            | 45000
            span
              | 千米
          .top-right-bottom
            | 光缆段总长
      #top3
        .top-left
        .top-right
          .top-right-top
            | 45000
            span
              | 千米
          .top-right-bottom
            | 一次线路总长
    #bottom
    #toolbar
      #full-screen
      #zoom-in
      #zoom-out
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
$header-height: 50px;
$gap-height: 20px;
$side-width: 260px;
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
  .gap {
    height: $gap-height;
  }
  .content {
    @mixin flash-top {
      width: 100%;
      height: 8px;
      background-image: url('@assets/image/u38.png');
      background-repeat: no-repeat;
      background-size: 50% 100%;
      background-position: center -4px;
    }
    @mixin flash-left {
      width: 100%;
      height: 8px;
      background-image: url('@assets/image/u38.png');
      background-repeat: no-repeat;
      background-size: 100px 100%;
      background-position: 100% -4px;
      transform: rotate(90deg);
      left: -51%;
      position: absolute;
    }
    // top: $header-height;
    $padding: 10px;
    $card-width: 31%;
    & > div {
      position: absolute;
    }
    #left {
      width: $side-width;
      height: calc(100vh - $header-height - $gap-height);
      left: $padding;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-wrap: wrap;
      .content-left-top {
        height: $card-width;
        background-image: url('@assets/image/u8.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .border-flash-top {
          @include flash-top;
        }
        .border-flash-left {
          @include flash-left;
        }
      }
      .content-left-middle {
        height: $card-width;
        background-image: url('@assets/image/u8.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .border-flash-top {
          @include flash-top;
        }
        .border-flash-left {
          @include flash-left;
        }
      }
      .content-left-bottom {
        height: $card-width;
        background-image: url('@assets/image/u8.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .border-flash-top {
          @include flash-top;
        }
        .border-flash-left {
          @include flash-left;
        }
      }
    }
    #right {
      width: $side-width;
      height: calc(100vh - $header-height - $gap-height);
      left: calc($width - $side-width - $padding);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-wrap: wrap;
      // background-color: white;
      .content-right-top {
        height: $card-width;
        background-image: url('@assets/image/u8.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .border-flash-top {
          @include flash-top;
        }
        .border-flash-left {
          @include flash-left;
        }
      }
      .content-right-middle {
        height: $card-width;
        background-image: url('@assets/image/u8.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .border-flash-top {
          @include flash-top;
        }
        .border-flash-left {
          @include flash-left;
        }
      }
      .content-right-bottom {
        height: $card-width;
        background-image: url('@assets/image/u8.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .border-flash-top {
          @include flash-top;
        }
        .border-flash-left {
          @include flash-left;
        }
      }
    }
    #top {
      max-width: calc($width - $side-width * 2 - $padding * 2);
      // height: 100px;
      // background-color: white;
      left: $side-width + $padding;
      display: flex;
      align-items: center;
      & > div {
        width: 130px;
        height: 50px;
        // background-color: white;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        cursor: pointer;
      }
      & > div:not(:last-child) {
        border-right: 1px solid #729cec;
      }
      @mixin cards($url) {
        &:hover .top-right > .top-right-bottom {
          color: #729cec;
        }
        &:hover {
          transform: scale(1.1);
        }
        .top-left {
          width: 40%;
          height: 100%;
          background-image: url($url);
          background-repeat: no-repeat;
          background-size: 90%;
          background-position: center;
        }
        .top-right {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .top-right-top {
            display: flex;
            align-items: flex-end;
            font-size: 18px;
            justify-content: space-evenly;
            color: #00ff99;
            & > span {
              font-size: 12px;
            }
          }
          .top-right-bottom {
            color: white;
            font-size: 12px;
            transform: scale(0.9);
            // &:hover {
            //   color: #729cec;
            // }
          }
        }
      }
      #top0 {
        @include cards('@assets/image/u104.png');
      }
      #top1 {
        @include cards('@assets/image/u106.png');
      }
      #top2 {
        @include cards('@assets/image/u108.png');
      }
      #top3 {
        @include cards('@assets/image/u109.png');
      }
    }
    #bottom {
      width: calc($width - $side-width * 2);
      height: 100px;
      // background-color: white;
      left: $side-width;
      top: calc(100vh - 100px);
    }
    #toolbar {
      position: absolute;
      left: calc($width - $side-width - $padding - 50px);
      width: 30px;
      height: 100px;
      display: flex;
      flex-direction: column;
      background: url('@assets/image/u210.png') no-repeat;
      background-size: cover;
      & > div {
        width: 100%;
        height: calc(100% / 3);
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
        }
      }
      #full-screen {
        background: url('@assets/image/u211.png') no-repeat center;
        background-size: 60%;
      }
      #zoom-in {
        background: url('@assets/image/u212.png') no-repeat center;
        background-size: 60%;
      }
      #zoom-out {
        background: url('@assets/image/u213.png') no-repeat center;
        background-size: 60%;
      }
    }
  }
}
</style>
