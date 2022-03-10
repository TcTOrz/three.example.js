<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-10 14:10:54
 * @LastEditors: Li Jian
 * @Description: 第一级(地图)程序HTML布局
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import { Search } from '@element-plus/icons-vue'

console.log(echarts)
// 实时获取页面宽度, 响应式布局
const theme = reactive({
  width: `${document.body.clientWidth}px`,
})
window.addEventListener('resize', () => {
  theme.width = `${document.body.clientWidth}px`
})
// 昵称
const nickname = ref('张三')
// 切换导航栏
let showNavBar = ref(false)
let showNavBarTag = ref(false)
const toggleNavBar = () => {
  showNavBarTag.value = !showNavBarTag.value
  if (showNavBarTag.value) {
    showNavBar.value = showNavBarTag.value
    ;(document.querySelector('.navigate') as HTMLDivElement).style.animation = 'flipInX 1s'
  } else {
    ;(document.querySelector('.navigate') as HTMLDivElement).style.animation = 'flipOutX 1s'
    setTimeout(() => {
      showNavBar.value = showNavBarTag.value
    }, 1000)
  }
}
// 搜索
const inputSearch = ref('')
const btnSearch = () => {
  console.log(inputSearch.value)
}
document.body.addEventListener('click', e => {
  // 点击其他区域关闭搜索
  if ((e.target as any).dataset.f === 'navigate') {
    showNavBarTag.value = false
    ;(document.querySelector('.navigate') as HTMLDivElement).style.animation = 'flipOutX 1s'
    setTimeout(() => {
      showNavBar.value = showNavBarTag.value
    }, 1000)
  }
})
onMounted(() => {})
</script>
<template lang="pug">
.layout
  //- 此处有一个bug，在开发环境中，无法触发.pug文件的热更新。
  //- 目前无法锁定是vite bug, 还是其他原因。
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
