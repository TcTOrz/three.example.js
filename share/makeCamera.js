/*
 * @Author: Li Jian
 * @Date: 2021-12-17 10:00:22
 * @LastEditTime: 2021-12-17 10:05:21
 * @LastEditors: Li Jian
 * @Description: 摄像机
 */
import * as THREE from '../node_modules/three/build/three.module.js'

// 透视相机
function makePerspectiveCamera(
  fov = 40,
  aspect = 2,
  near = 0.1,
  far = 100,
  position = [0, 10, 20]
) {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(...position)
  return camera
}

// 正交相机
function makeOrthographicCamera() {}

export { makePerspectiveCamera, makeOrthographicCamera }
