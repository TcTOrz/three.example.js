<!--
 * @Author: Li Jian
 * @Date: 2022-01-04 20:06:27
 * @LastEditTime: 2022-03-28 16:57:22
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { toggleNavBar, navigate, showNavBar } from './views/handleNavigate' // 导航栏控制
import { useTitle, useIntervalFn } from '@vueuse/core'
import router from '@router'

const pauseTitle = ref()
// const resumeTitle = ref()
const isActiveTitle = ref()
router.afterEach(to => {
  if (isActiveTitle.value) {
    pauseTitle.value()
  }
  const title = useTitle(`${to.meta.title}-电力通信数字孪生智能辅助决策系统      `)
  const fn = () => {
    title.value = title.value?.substring(1) + (title.value as string)[0]
  }
  const { pause, resume, isActive } = useIntervalFn(fn, 500)
  pauseTitle.value = pause
  // resumeTitle.value = resume
  isActiveTitle.value = isActive.value
})

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
