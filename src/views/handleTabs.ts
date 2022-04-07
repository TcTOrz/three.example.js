/*
 * @Author: Li Jian
 * @Date: 2022-04-07 16:07:40
 * @LastEditTime: 2022-04-07 16:38:01
 * @LastEditors: Li Jian
 */
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from 'vue-router'

// router.before

export const activeName = ref('map')
export const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab.paneName, event)
  // activeName.value = tab.paneName as string
}
export const removeTab = (targetName: string) => {}
export const editableTabs = ref([
  {
    label: '首页',
    name: 'map',
  },
  {
    label: '通信站全景',
    name: 'site',
  },
])
