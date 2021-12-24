/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:47:33
 * @LastEditTime: 2021-12-24 11:10:17
 * @LastEditors: Li Jian
 * @Description: 铁塔模型
 */
import * as THREE from '../node_modules/three/build/three.module.js'
// import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js'
// import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { makeLoading, onProgress } from './makeLoading.js'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'

function makeTower(scene, /* mtlUrl, objUrl,*/ glbUrl, scaler, info) {
  const loader = new GLTFLoader(makeLoading())
  return new Promise((resolve, reject) => {
    loader.load(
      glbUrl,
      (gltf) => {
        const { scene: gltfScene } = gltf
        gltfScene.traverse((child) => {
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
        gltfScene.scale.set(scaler, scaler, scaler)
        gltfScene.position.set(...info.position)

        const box = new THREE.Box3().setFromObject(gltfScene)
        const boxSize = box.getSize(new THREE.Vector3()) // 大小
        const boxCenter = box.getCenter(new THREE.Vector3()) // 中心
        gltfScene.children.map((_, idx) => {
          gltfScene.children[idx].name = `Tower_${gltfScene.children[idx].name}`
        })
        gltfScene.userData.boxSize = boxSize
        gltfScene.userData.boxCenter = boxCenter
        gltfScene.userData.info = info
        // 为什么是下标12,13而不是其他，需要结合blender模型查看
        gltfScene.userData.from = gltfScene.children[12].position
        gltfScene.userData.to = gltfScene.children[13].position
        scene.add(gltfScene)

        resolve(gltfScene)
      },
      onProgress
    )
  })
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
