/*
 * @Author: Li Jian
 * @Date: 2022-03-17 11:57:37
 * @LastEditTime: 2022-03-18 16:59:23
 * @LastEditors: Li Jian
 */
import { ref } from 'vue'

// dom
export const contentLeftTop = ref(null)
export const contentLeftMiddle = ref(null)
export const contentLeftBottom = ref(null)
export const contentRightTop = ref(null)
export const contentRightMiddle = ref(null)
export const contentRightBottom = ref(null)
export const contentTop = ref(null)
export const fullScreenClicked = ref(0)

enum ChartPosition {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}

const getBoxPosition = (dom: HTMLDivElement) => {
  const domRect = dom.getBoundingClientRect()
  const top = domRect.top
  const left = domRect.left
  const width = domRect.width
  const height = domRect.height
  return { top, left, width, height }
}

const animationFn = (
  dom: HTMLDivElement,
  pos: { left: number; top: number; width: number; height: number },
  position: ChartPosition
) => {
  switch (position) {
    case ChartPosition.LEFT:
      if (pos.left > 0 || pos.left + pos.width > 0) {
        dom.style.animation = 'fadeOutLeft 1s'
        setTimeout(() => {
          dom.style.left = `${-(pos.left + pos.width)}px`
        }, 1000)
      } else {
        dom.style.left = '0'
        dom.style.animation = 'fadeInLeft 1s'
      }
      break
    case ChartPosition.RIGHT:
      if (pos.left > 0 || pos.left + pos.width > 0) {
        dom.style.animation = 'fadeOutRight 1s'
        setTimeout(() => {
          dom.style.left = `${-(pos.left + pos.width)}px`
        }, 1000)
      } else {
        dom.style.left = '0'
        dom.style.animation = 'fadeInRight 1s'
      }
      break
    case ChartPosition.TOP:
      if (pos.top > 0) {
        dom.style.animation = 'fadeOutUp 1s'
        setTimeout(() => {
          dom.style.top = `${-pos.height}px`
        }, 1000)
      } else {
        dom.style.top = `70px`
        dom.style.animation = 'fadeInDown 1s'
      }
  }
}

let isContinue = false // 一个标记位，用于判断动画是否还在进行中
export const handleFullScreen = () => {
  if (isContinue) return
  isContinue = true
  setTimeout(() => {
    isContinue = false
  }, 1300)
  fullScreenClicked.value === 1 ? (fullScreenClicked.value = 0) : (fullScreenClicked.value = 1)
  let dom = contentLeftTop.value
  let pos = getBoxPosition(dom as unknown as HTMLDivElement)
  animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.LEFT)
  dom = contentRightTop.value
  pos = getBoxPosition(dom as unknown as HTMLDivElement)
  animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.RIGHT)
  setTimeout(() => {
    let dom = contentLeftMiddle.value
    let pos = getBoxPosition(dom as unknown as HTMLDivElement)
    animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.LEFT)
    dom = contentRightMiddle.value
    pos = getBoxPosition(dom as unknown as HTMLDivElement)
    animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.RIGHT)
  }, 100)
  setTimeout(() => {
    let dom = contentLeftBottom.value
    let pos = getBoxPosition(dom as unknown as HTMLDivElement)
    animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.LEFT)
    dom = contentRightBottom.value
    pos = getBoxPosition(dom as unknown as HTMLDivElement)
    animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.RIGHT)
  }, 200)
  setTimeout(() => {
    let dom = contentTop.value
    let pos = getBoxPosition(dom as unknown as HTMLDivElement)
    animationFn(dom as unknown as HTMLDivElement, pos, ChartPosition.TOP)
  }, 300)
}
