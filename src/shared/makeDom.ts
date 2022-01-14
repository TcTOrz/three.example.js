/*
 * @Author: Li Jian
 * @Date: 2022-01-13 09:34:50
 * @LastEditTime: 2022-01-14 14:15:49
 * @LastEditors: Li Jian
 */
let labelContainerElem: Element | null
export const makeDom = ({
  textContent,
  flag,
}: {
  textContent: string | null
  flag: string | undefined
}) => {
  // bugfix: 这里不能加if，需要考虑到路由切换的时候，这里的DOM并没有清除
  // if (!labelContainerElem) {
  labelContainerElem = document.querySelector('#labels')
  // }
  const elem: HTMLDivElement = document.createElement('div')
  elem.style.fontSize = '12px'
  elem.style.width = '30px'
  elem.textContent = textContent
  elem.dataset.flag = flag
  labelContainerElem?.appendChild(elem)
  return elem
}
