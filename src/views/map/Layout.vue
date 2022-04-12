<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-04-08 16:45:17
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import {
  renderLeftTop,
  renderLeftMiddle,
  renderLeftBottom,
  renderRightTop,
  renderRightMiddle,
  renderRightBottom,
} from './handleCharts' // 渲染ECharts图表
import {
  handleFullScreen,
  contentLeftTop,
  contentLeftMiddle,
  contentLeftBottom,
  contentRightTop,
  contentRightMiddle,
  contentRightBottom,
  contentTop,
  fullScreenClicked,
} from './handleFullScreen' // 全屏控制
import './smoke' // 烟雾控制
import { theme } from '../handleTheme' // 主题控制
import { contentMiddle, leftArrowClick, rightArrowClick, arrowMousemove } from './handleBtn' // 按钮控制

// 放大/缩小
const emit = defineEmits<{
  (e: 'click', type: 'zoom' | 'site' | 'cable', num: number): void
}>()
const zoomIn = () => {
  emit('click', 'zoom', 1)
}
const zoomOut = () => {
  emit('click', 'zoom', 0)
}
watchEffect(() => {
  if (fullScreenClicked.value) {
    zoomIn()
  } else {
    zoomOut()
  }
})
// 切换站点/光缆
const toggleSite = () => {
  emit('click', 'site', 0)
}
const toggleCable = () => {
  emit('click', 'cable', 0)
}
onMounted(() => {
  renderLeftTop()
  renderLeftMiddle()
  renderLeftBottom()
  renderRightTop()
  renderRightMiddle()
  renderRightBottom()
  arrowMousemove()
})
</script>
<template lang="pug">
.layout
  //- 定义一个空白区域
  include ./Gap
  include ./Content
  //- smoke svg特效
  svg-icon(name='smoke')
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
@import './Layout';
</style>
