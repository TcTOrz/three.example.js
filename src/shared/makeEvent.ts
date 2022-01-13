/*
 * @Author: Li Jian
 * @Date: 2022-01-13 09:31:45
 * @LastEditTime: 2022-01-13 10:22:46
 * @LastEditors: Li Jian
 */
type TypeTuples =
  | 'click'
  | 'mouseover'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousedown'
  | 'mouseup'
  | 'dblclick'

export const makeEvent = (
  elem: HTMLDivElement,
  type: TypeTuples,
  eventFn: (ev: MouseEvent) => void
) => {
  elem.addEventListener(type, eventFn)
  return () => {
    console.log('Event has been removed!')
    elem.removeEventListener(type, eventFn)
  }
}
