/*
 * @Author: Li Jian
 * @Date: 2022-03-31 08:57:23
 * @LastEditTime: 2022-03-31 09:13:04
 * @LastEditors: Li Jian
 * @Description: 滚动标签栏
 */
import { ref } from 'vue'
import router from '@router'
import { useTitle, useIntervalFn } from '@vueuse/core'

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
