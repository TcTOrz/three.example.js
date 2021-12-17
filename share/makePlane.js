/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:03:40
 * @LastEditTime: 2021-12-17 15:16:08
 * @LastEditors: Li Jian
 * @Description: 创建平面
 */
import * as THREE from '../node_modules/three/build/three.module.js'

function makePlane(width, height, loaderUrl) {
  const loader = new THREE.TextureLoader()
  const texture = loader.load(loaderUrl)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.magFilter = THREE.NearestFilter
  const repeatsWidth = width / 2
  const repeatsHeight = height / 2
  texture.repeat.set(repeatsWidth, repeatsHeight)
  const planeGeometry = new THREE.PlaneBufferGeometry(width, height)
  const planeMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  return plane
}

export default makePlane
