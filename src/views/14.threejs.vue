<!--
 * @Author: Li Jian
 * @Date: 2022-02-10 10:11:06
 * @LastEditTime: 2022-02-28 11:02:48
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序入口
-->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
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
  // }, 2000)
  // console.log(maps.scene)
})
onUnmounted(() => {
  maps.events.map(f => f()) // 销毁事件
})
</script>

<template lang="pug">
#topLevel
  #canvasContainer
    canvas#c14(style="width: 100vw; height: 100vh; position: relative;")
    canvas#c14ProvinceName(style="pointer-events:none; z-index: 0; width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;")
  //- html-view
//- pippy弹出框
#popInfo(style="display: inline;")
// - stats
#stats(style="position: absolute; top: 0; left: 0;")
</template>

<style lang="scss">
#topLevel {
  width: 100vw;
  height: 100vh;
  position: relative;
  * {
    position: absolute;
  }
  #canvasContainer {
    height: inherit;
  }
}
</style>
