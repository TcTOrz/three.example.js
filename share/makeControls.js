/*
 * @Author: Li Jian
 * @Date: 2021-12-17 14:23:47
 * @LastEditTime: 2021-12-21 09:42:06
 * @LastEditors: Li Jian
 * @Description: 自带控制器
 */
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'

export default function makeControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 0, 0)
  controls.update()
  return controls
}
