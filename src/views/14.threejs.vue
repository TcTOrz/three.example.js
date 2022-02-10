<!--
 * @Author: Li Jian
 * @Date: 2022-02-10 10:11:06
 * @LastEditTime: 2022-02-10 16:48:52
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import { CustomMap } from '@shared'

onMounted(() => {
  const canvas: HTMLCanvasElement = document.querySelector('#c14') as HTMLCanvasElement
  if (!canvas) return

  const provinceCvs: HTMLCanvasElement = document.querySelector(
    '#c14ProvinceName'
  ) as HTMLCanvasElement
  if (!provinceCvs) return
  const ins = new CustomMap(canvas, provinceCvs) // 初始化地图
})
</script>

<template lang="pug">
canvas#c14(style="width: 100vw; height: 100vh; position: relative;")
canvas#c14ProvinceName(style="pointer-events:none; z-index: 0; width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;")
#popInfo(style="display: inline;")
</template>

<style></style>
