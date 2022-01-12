/*
 * @Author: Li Jian
 * @Date: 2022-01-07 15:01:13
 * @LastEditTime: 2022-01-12 11:19:09
 * @LastEditors: Li Jian
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const makeControl = (camera: THREE.Camera, renderer: THREE.Renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.update()
  return controls
}
