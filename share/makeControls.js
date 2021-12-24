/*
 * @Author: Li Jian
 * @Date: 2021-12-17 14:23:47
 * @LastEditTime: 2021-12-24 16:19:56
 * @LastEditors: Li Jian
 * @Description: 自带控制器
 */
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'

export default function makeControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 0, 0)
  controls.maxDistance = 200 // 视野距离
  // 垂直角度
  controls.maxPolarAngle = Math.PI / 3
  controls.minPolarAngle = -Math.PI / 3
  // 水平旋转角度
  // controls.maxAzimuthAngle = Math.PI / 2
  // controls.minAzimuthAngle = -Math.PI / 3

  controls.enableDamping = true // 阻尼
  controls.dampingFactor = 0.05 // 阻尼系数
  // controls.screenSpacePanning = true // 允许平移

  controls.update()
  return controls
}
