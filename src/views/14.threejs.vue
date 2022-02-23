<!--
 * @Author: Li Jian
 * @Date: 2022-02-10 10:11:06
 * @LastEditTime: 2022-02-23 14:27:03
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序入口
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import { CustomMap } from '@shared'
import HtmlView from '@views/14/Layout.vue'

onMounted(() => {
  const canvas: HTMLCanvasElement = document.querySelector('#c14') as HTMLCanvasElement
  if (!canvas) return
  const provinceCvs: HTMLCanvasElement = document.querySelector(
    '#c14ProvinceName'
  ) as HTMLCanvasElement
  if (!provinceCvs) return
  const popElem: HTMLDivElement = document.querySelector('#popInfo') as HTMLDivElement
  // const pointPopElem: HTMLDivElement = document.querySelector('#pointPopInfo') as HTMLDivElement
  new CustomMap(canvas, provinceCvs, popElem) // 初始化地图
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
