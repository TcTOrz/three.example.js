<!--
 * @Author: Li Jian
 * @Date: 2022-02-10 10:11:06
 * @LastEditTime: 2022-03-28 16:23:54
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序入口
-->
<script setup lang="ts">
import { onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { CustomMap } from '@shared'
import HtmlView from '@views/map/Layout.vue'

let maps: CustomMap<HTMLCanvasElement, HTMLDivElement>
onMounted(() => {
  // const internalInstance = getCurrentInstance()
  // internalInstance?.appContext.config.globalProperties.$loading.hide()
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

const eventFn = (type: 'zoom' | 'site' | 'cable', num: number) => {
  if (!maps) return
  if (type === 'zoom') {
    if (num === 1) {
      maps.zoomIn()
    } else {
      maps.zoomOut()
    }
  } else if (type === 'site') {
    maps.toggleSite()
  } else if (type === 'cable') {
    maps.toggleCable()
  }
}
</script>

<template lang="pug">
#topLevel
  #canvasContainer
    canvas#c14
    canvas#c14ProvinceName(style="pointer-events:none; z-index: 0; width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;")
  html-view(@click="eventFn")
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
