<!--
 * @Author: Li Jian
 * @Date: 2022-01-04 20:06:27
 * @LastEditTime: 2022-04-06 15:37:04
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { toggleNavBar, navigate, showNavBar } from './views/handleNavigate' // 导航栏控制
import './views/handleTitle' // 标签标题名控制
import { theme } from './views/handleTheme' // 主题控制

// 昵称
const nickname = ref('张三')
// 搜索
const inputSearch = ref('')
const btnSearch = () => {
  console.log(inputSearch.value)
}
// onBeforeMount(() => {
//   console.log(router.currentRoute.value)
//   if (router.currentRoute.value.path === '/map') {
//     const internalInstance = getCurrentInstance()
//     internalInstance?.appContext.config.globalProperties.$loading.show()
//   }
// })
</script>
<template lang="pug">
.layout
  //- 此处有一个bug，在开发环境中，无法触发.pug文件的热更新。
  //- 目前无法锁定是vite bug(github issue未找到有人提这个bug), 还是其他原因。
  include ./views/Header
  router-view
  //- 导航栏
  include ./views/Navigate
</template>
<style lang="scss" scoped>
$width: v-bind('theme.width');
@import './views/App';
</style>
