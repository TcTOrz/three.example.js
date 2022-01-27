<!--
 * @Author: Li Jian
 * @Date: 2022-01-27 10:17:52
 * @LastEditTime: 2022-01-27 15:38:21
 * @LastEditors: Li Jian
-->
<script lang="ts" setup>
import tippy, { roundArrow } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/animations/shift-away-extreme.css'
import 'tippy.js/themes/translucent.css'

const propData = defineProps<{
  data: { info: String; name: String }
  el: HTMLDivElement
}>()
const instance = tippy(propData.el, {
  content: `${propData.data.name}：${propData.data.info}`,
  // trigger: 'click',
  animation: 'shift-away-extreme',
  arrow: roundArrow,
  duration: [500, 1000],
  theme: 'translucent',
})
instance.show()
window.addEventListener('mousemove', () => {
  instance.hide()
})
</script>
<template lang="pug">
//- .popup(style="width: 1px; height: 1px;")
</template>
