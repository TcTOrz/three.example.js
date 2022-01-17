/*
 * @Author: Li Jian
 * @Date: 2022-01-07 15:01:13
 * @LastEditTime: 2022-01-17 15:55:16
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const makeControl = (camera: THREE.Camera, renderer: THREE.Renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.update()
  return controls
}

export const makeKeyControl = (
  camera: THREE.Camera,
  controls: OrbitControls,
  keys: { [key: string]: boolean }
) => {
  const playerDirection = new THREE.Vector3()
  const getForwardVector = () => {
    camera.getWorldDirection(playerDirection)
    playerDirection.normalize()
    return playerDirection
  }
  const getSideVector = () => {
    camera.getWorldDirection(playerDirection)
    playerDirection.normalize()
    playerDirection.setY(1)
    playerDirection.cross(camera.up)
    return playerDirection
  }
  if (keys.w) {
    keys.w = false // 防止按键连续触发
    // getForwardVector().multiplyScalar(0.1)
    getForwardVector().multiply(new THREE.Vector3(0.1, 0, 0.1))
  } else if (keys.a) {
    keys.a = false
    // getSideVector().multiplyScalar(-0.1)
    getSideVector().multiply(new THREE.Vector3(-0.1, 0, -0.1))
  } else if (keys.s) {
    keys.s = false
    // getForwardVector().multiplyScalar(-0.1)
    getForwardVector().multiply(new THREE.Vector3(-0.1, 0, -0.1))
  } else if (keys.d) {
    keys.d = false
    // getSideVector().multiplyScalar(0.1)
    getSideVector().multiply(new THREE.Vector3(0.1, 0, 0.1))
  }
  camera.position.add(playerDirection)
  controls.target.add(playerDirection)
}
