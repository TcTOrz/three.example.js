<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 14:05:43
 * @LastEditTime: 2022-03-09 14:21:33
 * @LastEditors: Li Jian
 * @Description: 第二三级光缆程序入口
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import Fiber from '@shared/fiber'
import HtmlView from '@views/16/Layout.vue'
import router from '@router'

let ins: Fiber<HTMLCanvasElement>
const toIndex = () => {
  ins.dispose()
  router.push('/14')
}
onMounted(() => {
  const canvas = document.querySelector('#c16') as HTMLCanvasElement
  ins = new Fiber(canvas)
})
</script>
<template lang="pug">
#fiberLevel
  #canvasContainer
    canvas#c16
  #loading
    .progress
      .url
      .img
        .progressbar
        .progress-number
  html-view.btnClass(v-on:jumpBack="toIndex")
</template>

<style lang="scss">
#fiberLevel {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  #canvasContainer {
    width: inherit;
    height: inherit;
    #c16 {
      width: inherit;
      height: inherit;
      display: block;
      position: relative;
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
