/*
 * @Author: Li Jian
 * @Date: 2022-04-07 16:07:40
 * @LastEditTime: 2022-04-08 11:03:23
 * @LastEditors: Li Jian
 */
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from '@router'

// 初始化tabs标签
type Meta = { title: string; needTab: boolean }
const tabs: Array<{ label: string; name: string }> = []
router.options.routes.forEach(route => {
  const meta = route.meta as Meta
  if (meta.needTab) {
    tabs.push({ label: meta.title, name: route.name as string })
  }
})
// 当前选中tab
export const activeName = ref('map')
export const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  router.push(tab.paneName as string)
}
export const removeTab = (targetName: string) => {
  if (targetName === 'map') return
  if (targetName === activeName.value) {
    const index = tabs.findIndex(tab => tab.name === targetName)
    if (index === 0) {
      activeName.value = tabs[0].name
    } else {
      activeName.value = tabs[index - 1].name
    }
    router.push(activeName.value)
  }
  editableTabs.value.splice(
    editableTabs.value.findIndex(tab => tab.name === targetName),
    1
  )
}
export const editableTabs = ref(tabs)
// router解析钩子
router.beforeResolve(async to => {
  const idx = editableTabs.value.findIndex(tab => tab.name === to.name)
  if (idx === -1) {
    editableTabs.value.push({ label: to.meta.title as string, name: to.name as string })
  }
  activeName.value = to.name as string
})
