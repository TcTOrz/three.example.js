<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 14:05:43
 * @LastEditTime: 2022-03-23 16:49:48
 * @LastEditors: Li Jian
 * @Description: 第二三级站点程序入口
-->
<script setup lang="ts">
import { onMounted, reactive, watchEffect } from 'vue'
import { Site } from '@shared'
import HtmlView from '@views/site/Layout.vue'
import router from '@router'

let title = '站点-电力通信数字孪生智能辅助决策系统      '
document.title = title
setInterval(() => {
  title = title.substring(1) + title[0]
  document.title = title
}, 500)

let ins: Site<HTMLCanvasElement>
const toIndex = () => {
  ins.dispose()
  router.push('/map')
}
onMounted(() => {
  const canvas = document.querySelector('#c15') as HTMLCanvasElement
  ins = new Site(canvas)
  watchEffect(() => {
    ins.move()
  })
})
</script>
<template lang="pug">
#siteLevel
  #canvasContainer
    canvas#c15
    #labels
  #loading
    .progress
      .url
      .img
        .progressbar
        .progress-number
  html-view.btnClass(v-on:jumpBack="toIndex")
    | 返 回
</template>

<style lang="scss">
#siteLevel {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  #canvasContainer {
    width: inherit;
    height: inherit;
    #c15 {
      width: inherit;
      height: inherit;
      display: block;
      position: relative;
    }
    #labels {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      color: white;
      & > div {
        position: absolute; /* let us position them inside the container */
        left: 0; /* make their default position the top left of the container */
        top: 0;
        cursor: pointer; /* change the cursor to a hand when over us */
        font-size: large;
        user-select: none; /* don't let the text get selected */
        text-shadow:         /* create a black outline */ -1px -1px 0 #000, 0 -1px 0 #000,
          1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000,
          -1px 0 0 #000;
        &:hover {
          color: red;
        }
      }
    }
  }
  #loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* display: flex; */
    display: none;
    justify-content: center;
    align-items: center;
    .progress {
      /* display: flex; */
      margin: 1.5em;
      border: 1px solid green;
      width: 50vw;
      /* align-items: center; */
      .url {
        font-size: 12px;
        color: green;
      }
      .img {
        display: flex;
        width: inherit;
        align-items: center;
      }
    }
    .progressbar {
      width: inherit;
      margin: 2px;
      background: green;
      height: 1em;
      transform-origin: top left;
      transform: scaleX(0);
    }
    .progress-number {
      /* margin: 0.5em; */
      font-size: 1.5em;
      font-weight: bold;
      color: green;
    }
  }
  .btnClass {
    position: absolute;
    left: 5px;
    top: 5px;
  }
}
</style>
