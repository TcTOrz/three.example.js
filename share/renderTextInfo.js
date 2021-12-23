/*
 * @Author: Li Jian
 * @Date: 2021-12-23 11:19:21
 * @LastEditTime: 2021-12-23 14:07:46
 * @LastEditors: Li Jian
 * @Description: 渲染文本数据
 */
import * as THREE from '../node_modules/three/build/three.module.js'
import { INTERSECTED } from './index.js'

function renderTextInfo(canvas, camera) {
  const centerV = new THREE.Vector3()
  if (INTERSECTED) {
    const labels = document.querySelector('#labels')
    const elem = document.createElement('div')
    if (INTERSECTED.name === 'Tower') {
      // 显示塔杆信息
      elem.textContent = INTERSECTED.parent.userData.info.name
      const children = labels.children
      if (children.length > 0) {
        ;[...children].forEach((element) => {
          element.remove()
        })
      }
      labels.appendChild(elem)
      // 获取塔杆中间位置
      new THREE.Box3().setFromObject(INTERSECTED).getCenter(centerV)
      centerV.project(camera)
      const x = (centerV.x * 0.5 + 0.5) * canvas.clientWidth
      const y = (centerV.y * -0.5 + 0.5) * canvas.clientHeight
      elem.style.transform = `translate(50%, 50%) translate(${x}px, ${y}px)`
      elem.addEventListener('mousedown', (event) => {
        event.stopPropagation()
        event.preventDefault()
        alert(JSON.stringify(INTERSECTED.parent.userData.info))
      })
    }
    if (INTERSECTED.name === 'Fiber') {
      // 显示电缆信息
      elem.textContent = '光缆' // INTERSECTED.userData.info.name --- 写死了
      const children = labels.children
      if (children.length > 0) {
        ;[...children].forEach((element) => {
          element.remove()
        })
      }
      labels.appendChild(elem)
      // 获取电缆中间位置
      new THREE.Box3().setFromObject(INTERSECTED).getCenter(centerV)
      centerV.project(camera)
      const x = (centerV.x * 0.5 + 0.5) * canvas.clientWidth
      const y = (centerV.y * -0.5 + 0.5) * canvas.clientHeight
      elem.style.transform = `translate(50%, 50%) translate(${x}px, ${y}px)`
      elem.addEventListener('mousedown', (event) => {
        event.stopPropagation()
        event.preventDefault()
        alert('未细化')
      })
    }
  }
}

export default renderTextInfo
