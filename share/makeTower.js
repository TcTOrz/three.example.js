/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:47:33
 * @LastEditTime: 2021-12-23 09:50:58
 * @LastEditors: Li Jian
 * @Description: 铁塔模型
 */
import * as THREE from '../node_modules/three/build/three.module.js'
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { makeLoading, onProgress } from './makeLoading.js'

function makeTower(scene, mtlUrl, objUrl, scaler, info) {
  const objLoader = new OBJLoader(makeLoading())
  const mtlLoader = new MTLLoader()
  return new Promise((resolve) => {
    mtlLoader.load(mtlUrl, (mtl) => {
      mtl.preload()
      objLoader.setMaterials(mtl)
      objLoader.load(
        objUrl,
        (obj) => {
          obj.scale.set(scaler, scaler, scaler)
          const box = new THREE.Box3().setFromObject(obj)
          const boxSize = box.getSize(new THREE.Vector3()).length() // 大小
          const boxCenter = box.getCenter(new THREE.Vector3()) // 中心

          obj.userData.boxSize = boxSize
          obj.userData.boxCenter = boxCenter
          obj.userData.info = info
          obj.userData.from = obj.children[6].geometry.boundingBox.max
          obj.userData.to = obj.children[7].geometry.boundingBox.max

          obj.position.set(...info.position)
          scene.add(obj)
          resolve(obj)
        },
        onProgress
      )
    })
  })
}

export default makeTower
