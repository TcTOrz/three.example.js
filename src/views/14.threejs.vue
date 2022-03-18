<!--
 * @Author: Li Jian
 * @Date: 2022-02-10 10:11:06
 * @LastEditTime: 2022-03-18 17:02:00
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序入口
-->
<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { CustomMap } from '@shared'
import HtmlView from '@views/14/Layout.vue'

let maps: CustomMap<HTMLCanvasElement, HTMLDivElement>
onMounted(() => {
  const canvas: HTMLCanvasElement = document.querySelector('#c14') as HTMLCanvasElement
  if (!canvas) return
  const provinceCvs: HTMLCanvasElement = document.querySelector(
    '#c14ProvinceName'
  ) as HTMLCanvasElement
  if (!provinceCvs) return
  const popElem: HTMLDivElement = document.querySelector('#popInfo') as HTMLDivElement
  // const pointPopElem: HTMLDivElement = document.querySelector('#pointPopInfo') as HTMLDivElement
  maps = new CustomMap(canvas, provinceCvs, popElem) // 初始化地图
  // setInterval(() => {
  //   maps.toggleRenderer()
  //   maps.dispose()
  // }, 2000)
  // console.log(maps.scene)
})
onUnmounted(() => {
  maps.dispose() // 销毁
})

const zoomInOut = (num: number) => {
  if (num === 1) {
    maps.zoomIn()
  } else {
    maps.zoomOut()
  }
}
</script>

<template lang="pug">
#topLevel
  #canvasContainer
    canvas#c14
    canvas#c14ProvinceName(style="pointer-events:none; z-index: 0; width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;")
  html-view(@click="zoomInOut")
//- pippy弹出框
#popInfo(style="display: inline;")
// - stats
#stats
</template>

<style lang="scss" scoped>
#topLevel {
  width: inherit;
  height: inherit;
  * {
    position: absolute;
  }
  #canvasContainer {
    height: inherit;
    #c14 {
      position: relative;
    }
  }
}
:global(#stats > div) {
  left: 100px !important;
}
</style>
