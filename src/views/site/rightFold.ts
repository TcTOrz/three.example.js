/*
 * @Author: Li Jian
 * @Date: 2022-04-21 09:11:44
 * @LastEditTime: 2022-04-21 16:14:47
 * @LastEditors: Li Jian
 */
import { Ref, ref } from 'vue'
import { MaybeElementRef, useElementSize } from '@vueuse/core'

export const baseInfo = ref(null)
export const baseInfoIcon = ref(null)
export const baseInfoTitle = ref(null)
export const baseInfoArrow = ref(null)
export const baseInfoExpand = ref(null)
export const managerInfo = ref(null)
export const businessInfo = ref(null)

const collapseOrExpandFn = (el: MaybeElementRef) => {
  const { width, height } = useElementSize(el)
  setTimeout(() => {
    ;(baseInfo.value as unknown as HTMLElement).style.height = ''
    ;(managerInfo.value as unknown as HTMLElement).style.height = ''
    ;(businessInfo.value as unknown as HTMLElement).style.height = ''
    if (height.value < 50) {
      ;(el as Ref).value.style.display = ''
      // ;(el as Ref).value.style.height = '250px'
      // ;(el as Ref).value.children[0].style.visibility = 'hidden'
      // ;(el as Ref).value.children[1].style.visibility = 'hidden'
      // ;(el as Ref).value.children[2].style.transform = 'rotate(180deg)'
      // ;((el as Ref).value as unknown as HTMLElement).style.transform = 'rotate(180deg)'
    } else {
      ;(el as Ref).value.style.display = 'none'
      // ;(el as Ref).value.style.height = ''
      // ;(el as Ref).value.children[0].style.visibility = 'visible'
      // ;(el as Ref).value.children[1].style.visibility = 'visible'
      // ;(el as Ref).value.children[2].style.transform = 'rotate(0deg)'
      // ;((el as Ref).value as unknown as HTMLElement).style.transform = 'rotate(0deg)'
    }
  })
}
export const baseInfoClick = () => {
  collapseOrExpandFn(baseInfo)
}
export const managerInfoClick = () => {
  collapseOrExpandFn(managerInfo)
}
export const businessInfoClick = () => {
  collapseOrExpandFn(businessInfo)
}
