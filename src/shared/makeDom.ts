/*
 * @Author: Li Jian
 * @Date: 2022-01-13 09:34:50
 * @LastEditTime: 2022-01-13 16:25:20
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
  if (!labelContainerElem) {
    labelContainerElem = document.querySelector('#labels')
  }
  const elem: HTMLDivElement = document.createElement('div')
  elem.style.fontSize = '12px'
  elem.style.width = '30px'
  elem.textContent = textContent
  elem.dataset.flag = flag
  labelContainerElem?.appendChild(elem)
  return elem
}
