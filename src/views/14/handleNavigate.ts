/*
 * @Author: Li Jian
 * @Date: 2022-03-17 14:16:27
 * @LastEditTime: 2022-03-17 14:27:13
 * @LastEditors: Li Jian
 */
import { ref } from 'vue'
// 切换导航栏
export let showNavBar = ref(false)
let showNavBarTag = ref(false)
export const navigate = ref(null)
export const toggleNavBar = () => {
  showNavBarTag.value = !showNavBarTag.value
  if (showNavBarTag.value) {
    showNavBar.value = showNavBarTag.value
    ;(navigate.value as unknown as HTMLDivElement).style.animation = 'flipInX 1s'
  } else {
    ;(navigate.value as unknown as HTMLDivElement).style.animation = 'flipOutX 1s'
    setTimeout(() => {
      showNavBar.value = showNavBarTag.value
    }, 1000)
  }
}
document.body.addEventListener('click', e => {
  // 点击其他区域关闭搜索
  if ((e.target as any).dataset.f === 'navigate') {
    showNavBarTag.value = false
    ;(navigate.value as unknown as HTMLDivElement).style.animation = 'flipOutX 1s'
    setTimeout(() => {
      showNavBar.value = showNavBarTag.value
    }, 1000)
  }
})
