/*
 * @Author: Li Jian
 * @Date: 2022-03-23 14:35:56
 * @LastEditTime: 2022-03-23 14:45:14
 * @LastEditors: Li Jian
 */
export const animateCss = (
  node: HTMLElement,
  animation: string,
  time = 1,
  prefix = 'animate__'
) => {
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    node.style.setProperty('--animate-duration', `${time}s`)
    node.classList.add(`${prefix}animated`, animationName)
    function handleAnimationEnd(event: { stopPropagation: () => void }) {
      event.stopPropagation()
      node.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}
