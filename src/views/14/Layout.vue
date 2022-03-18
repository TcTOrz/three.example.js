<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-18 17:00:24
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { Search } from '@element-plus/icons-vue'
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
import { toggleNavBar, navigate, showNavBar } from './handleNavigate' // 导航栏控制

// 实时获取页面宽度, 响应式布局
const theme = reactive({
  width: `${document.body.clientWidth}px`,
})
window.addEventListener('resize', () => {
  theme.width = `${document.body.clientWidth}px`
})
// 昵称
const nickname = ref('张三')
// 搜索
const inputSearch = ref('')
const btnSearch = () => {
  console.log(inputSearch.value)
}
// 放大/缩小
const emit = defineEmits<{
  (e: 'click', num: number): void
}>()
const zoomIn = () => {
  emit('click', 1)
}
const zoomOut = () => {
  emit('click', 0)
}
watchEffect(() => {
  if (fullScreenClicked.value) {
    zoomIn()
  } else {
    zoomOut()
  }
})
onMounted(() => {
  renderLeftTop()
  renderLeftMiddle()
  renderLeftBottom()
  renderRightTop()
  renderRightMiddle()
  renderRightBottom()
})
</script>
<template lang="pug">
.layout
  //- 此处有一个bug，在开发环境中，无法触发.pug文件的热更新。
  //- 目前无法锁定是vite bug(github issue未找到有人提这个bug), 还是其他原因。
  include ./Header
  //- 定义一个空白区域
  include ./Gap
  include ./Content
  //- 导航栏
  include ./Navigate
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
@import './Layout';
</style>
