/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:47:33
 * @LastEditTime: 2021-12-27 16:08:13
 * @LastEditors: Li Jian
 * @Description: 铁塔模型
 */
import * as THREE from '../node_modules/three/build/three.module.js'
// import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js'
// import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { makeLoading, onProgress } from './makeLoading.js'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import makeFiber from './makeFiber.js'

function makeTower(
  scene,
  /* mtlUrl, objUrl,*/ glbUrl,
  towers,
  scaler /*, info*/
) {
  const loader = new GLTFLoader(makeLoading())
  loader.load(
    glbUrl,
    (gltf) => {
      // gltf.scene.position.set(0, 20, 0)
      // scene.add(gltf.scene)
      // scenes<Array> 默认是有一个值的,其值为scene
      const { scene: towerScene, scenes: towerScenes } = gltf
      let moreTowerScene
      towers.map((tower, index) => {
        if (index === 0) {
          moreTowerScene = towerScene
          moreTowerScene.position.set(...tower.position)
        } else {
          moreTowerScene = towerScene.clone()
          towerScenes.push(moreTowerScene)
        }
        moreTowerScene.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              metalness: 0.5,
              roughness: 0.5,
              emissive: 0xffffff,
              emissiveIntensity: 0.5,
            })
          }
        })
        moreTowerScene.scale.set(scaler, scaler, scaler)
        moreTowerScene.position.set(...tower.position)
        const box = new THREE.Box3().setFromObject(moreTowerScene)
        const boxSize = box.getSize(new THREE.Vector3()) // 大小
        const boxCenter = box.getCenter(new THREE.Vector3()) // 中心
        moreTowerScene.children.map((_, idx) => {
          moreTowerScene.children[
            idx
          ].name = `Tower_${moreTowerScene.children[idx].name}`
        })
        moreTowerScene.userData.boxSize = boxSize
        moreTowerScene.userData.boxCenter = boxCenter
        moreTowerScene.userData.info = tower
        // 为什么是下标12,13而不是其他，需要结合blender模型查看
        moreTowerScene.userData.from = moreTowerScene.children[12].position
        moreTowerScene.userData.to = moreTowerScene.children[13].position
        scene.add(moreTowerScene)
      })
      towerScenes.map((group) => {
        makeFiber(scene, towerScenes, group)
      })
    },
    onProgress
  )
  // obj模型写法
  // const objLoader = new OBJLoader(makeLoading())
  // const mtlLoader = new MTLLoader()
  // return new Promise((resolve) => {
  //   mtlLoader.load(mtlUrl, (mtl) => {
  //     mtl.preload()
  //     objLoader.setMaterials(mtl)
  //     objLoader.load(
  //       objUrl,
  //       (obj) => {
  //         obj.scale.set(scaler, scaler, scaler)
  //         const box = new THREE.Box3().setFromObject(obj)
  //         const boxSize = box.getSize(new THREE.Vector3()).length() // 大小
  //         const boxCenter = box.getCenter(new THREE.Vector3()) // 中心

  //         obj.userData.boxSize = boxSize
  //         obj.userData.boxCenter = boxCenter
  //         obj.userData.info = info
  //         obj.userData.from = obj.children[6].geometry.boundingBox.max
  //         obj.userData.to = obj.children[7].geometry.boundingBox.max

  //         obj.position.set(...info.position)
  //         scene.add(obj)
  //         resolve(obj)
  //       },
  //       onProgress
  //     )
  //   })
  // })
}

export default makeTower
