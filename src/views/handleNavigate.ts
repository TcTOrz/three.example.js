/*
 * @Author: Li Jian
 * @Date: 2022-03-17 14:16:27
 * @LastEditTime: 2022-03-23 14:47:36
 * @LastEditors: Li Jian
 */
import { ref } from 'vue'
import { animateCss } from '@shared/animateCss'
// 切换导航栏
export let showNavBar = ref(false)
let showNavBarTag = ref(false)
export const navigate = ref(null)
export const toggleNavBar = async () => {
  showNavBarTag.value = !showNavBarTag.value
  if (showNavBarTag.value) {
    showNavBar.value = showNavBarTag.value
    animateCss(navigate.value as unknown as HTMLDivElement, 'slideInDown', 0.8)
  } else {
    await animateCss(navigate.value as unknown as HTMLDivElement, 'slideOutUp', 0.8)
    showNavBar.value = showNavBarTag.value
  }
}
document.body.addEventListener('click', async e => {
  // 点击其他区域关闭搜索
  if ((e.target as any).dataset.f === 'navigate') {
    showNavBarTag.value = false
    await animateCss(navigate.value as unknown as HTMLDivElement, 'slideOutUp', 0.8)
    showNavBar.value = showNavBarTag.value
  }
})
