/*
 * @Author: Li Jian
 * @Date: 2022-01-07 11:34:45
 * @LastEditTime: 2022-01-07 12:04:21
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'

type Vector3Tuple = THREE.Vector3Tuple

// 透视相机
export const makePerspectiveCamera = (
  fov = 75,
  aspect = 1,
  near = 0.1,
  far = 1000,
  position: Vector3Tuple = [0, 0, 0]
) => {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(...position)
  return camera
}
