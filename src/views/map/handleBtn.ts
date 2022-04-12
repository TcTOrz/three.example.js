/*
 * @Author: Li Jian
 * @Date: 2022-04-08 15:35:13
 * @LastEditTime: 2022-04-12 08:37:01
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
// 这里是滑动按钮的效果。用户体验方面的效果，可以后面再写。
export const arrowMousemove = () => {
  // let isMouseDown = false
  // ;(contentMiddle.value as unknown as HTMLDivElement).addEventListener('mousedown', e => {
  //   isMouseDown = true
  // })
  // ;(contentMiddle.value as unknown as HTMLDivElement).addEventListener('mouseup', e => {
  //   isMouseDown = false
  // })
  // ;(contentMiddle.value as unknown as HTMLDivElement).addEventListener('mousemove', e => {
  //   if (isMouseDown) {
  //     const elem = contentMiddle.value as unknown as HTMLDivElement
  //     const { clientX } = e
  //     const { left } = elem.getBoundingClientRect()
  //     const x = clientX - left
  //     const scrollLeft = elem.scrollLeft
  //     if (x < length) {
  //       tweenFn(elem, scrollLeft - x)
  //     } else if (x > length) {
  //       tweenFn(elem, scrollLeft - length)
  //     }
  //   }
  // })
}

// const { x, isOutside } = useMouseInElement(contentMiddle)
// console.log(x.value, isOutside.value)
// let oldValue = 0
// watchAtMost(
//   x,
//   (value: number) => {
//     if (!isOutside.value) {
//       if (!oldValue) {
//         oldValue = value
//       } else {
//         // const len = value - oldValue
//         // oldValue = value
//         // const elem = contentMiddle.value as unknown as HTMLDivElement
//         // tweenFn(elem, elem.scrollLeft + len)
//         if (value > oldValue) {
//           rightArrowClick()
//         } else {
//           leftArrowClick()
//         }
//       }
//     }
//   },
//   {
//     // delay: 0,
//   }
// )
