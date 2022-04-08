/*
 * @Author: Li Jian
 * @Date: 2022-04-08 15:35:13
 * @LastEditTime: 2022-04-08 16:06:14
 * @LastEditors: Li Jian
 * @Description: 一些按钮的控制
 */
import { ref } from 'vue'
import TWEEN from '@tweenjs/tween.js'

// 滚动距离
const length = 100
// 左右滚动
const tweenFn = (elem: HTMLDivElement, len: number) => {
  new TWEEN.Tween({
    left: elem.scrollLeft,
  })
    .to({ left: len }, 200)
    .onUpdate(obj => {
      elem.scrollLeft = obj.left
    })
    .easing(TWEEN.Easing.Linear.None)
    .start()
}
export const contentMiddle = ref(null)
export const leftArrowClick = () => {
  const elem = contentMiddle.value as unknown as HTMLDivElement
  tweenFn(elem, elem.scrollLeft - length)
}
export const rightArrowClick = () => {
  const elem = contentMiddle.value as unknown as HTMLDivElement
  tweenFn(elem, elem.scrollLeft + length)
}
