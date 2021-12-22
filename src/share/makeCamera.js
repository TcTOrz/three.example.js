/*
 * @Author: Li Jian
 * @Date: 2021-12-17 10:00:22
 * @LastEditTime: 2021-12-22 22:18:18
 * @LastEditors: Li Jian
 * @Description: 摄像机
 */
import * as THREE from 'three/build/three.module.js'

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
function makeOrthographicCamera(left, right, top, bottom, near, far) {
  const camera = new THREE.OrthographicCamera(
    left,
    right,
    top,
    bottom,
    near,
    far
  )
  return camera
}

// 缩略图相机
// 默认为透视相机,也可以传最后一个参数变为正交相机
function makeThumbCamera(
  fov = 40,
  aspect = 2,
  near = 0.1,
  far = 100,
  position = [0, 10, 20],
  width = 200,
  height = 100,
  type = 'perspective'
) {
  if (type === 'perspective') {
    return makePerspectiveCamera(fov, aspect, near, far, position)
  }
  return makeOrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    near,
    far
  )
}

export { makePerspectiveCamera, makeOrthographicCamera, makeThumbCamera }
