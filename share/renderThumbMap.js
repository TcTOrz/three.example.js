/*
 * @Author: Li Jian
 * @Date: 2021-12-20 10:05:31
 * @LastEditTime: 2021-12-20 14:02:23
 * @LastEditors: Li Jian
 */
import * as THREE from '../node_modules/three/build/three.module.js'
function renderThumbMap(renderer, scene, camera, smallMapCamera, controls) {
  const width = window.innerWidth
  const height = window.innerHeight
  // const smallWidth = width / 3
  // const smallHeight = height / 3
  const smallWidth = 150
  const smallHeight = 120

  const outer = document.querySelector('#thumbLine')
  if (outer) {
    outer.style.width = smallWidth + 'px'
    outer.style.height = smallHeight + 'px'
  }

  const x = width - smallWidth
  const y = height - smallHeight
  renderer.clearDepth()
  renderer.setScissorTest(true)

  renderer.setScissor(x, y, smallWidth, smallHeight)
  renderer.setViewport(x, y, smallWidth, smallHeight)
  // 摄像机为Y轴正上方往下(xz)面看
  smallMapCamera.position.set(0, camera.position.y, 0)
  smallMapCamera.lookAt(-camera.position.x, 0, -camera.position.z)
  // 获取控制器垂直偏移角度，并计算获取正下方x轴需要旋转的值
  smallMapCamera.rotateX(-controls.getPolarAngle())
  // 当canmera为<<透视相机>>才可生效
  smallMapCamera.position.set(0, controls.getDistance(), 0)
  renderer.render(scene, smallMapCamera)
  renderer.setScissorTest(false)
}

export default renderThumbMap
