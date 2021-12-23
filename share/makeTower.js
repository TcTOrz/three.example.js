/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:47:33
 * @LastEditTime: 2021-12-23 22:57:19
 * @LastEditors: Li Jian
 * @Description: 铁塔模型
 */
import * as THREE from '../node_modules/three/build/three.module.js'
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { makeLoading, onProgress } from './makeLoading.js'
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'

function makeTower(scene, mtlUrl, objUrl, glbUrl, scaler, info) {
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
              // metalness: 0.5,
              // roughness: 0.5,
              emissive: 0xffffff,
              // emissiveIntensity: 0.5,
            })
          }
        })
        gltfScene.scale.set(scaler, scaler, scaler)
        gltfScene.position.set(...info.position)

        const box = new THREE.Box3().setFromObject(gltfScene)
        const boxSize = box.getSize(new THREE.Vector3()).length() // 大小
        const boxCenter = box.getCenter(new THREE.Vector3()) // 中心
        gltfScene.children.map((_, idx) => {
          gltfScene.children[idx].name = `Tower_${gltfScene.children[idx].name}`
        })
        // console.log(boxCenter)
        gltfScene.userData.boxSize = boxSize
        gltfScene.userData.boxCenter = boxCenter
        gltfScene.userData.info = info
        gltfScene.userData.from = gltfScene.children[6].geometry.boundingBox.max
        // max: Vector3 {x: -0.8434780240058899, y: 14.21590518951416, z: -63.55470275878906}
        // min: Vector3 {x: -2.2116289138793945, y: -14.148439407348633, z: -63.94792556762695}
        // max: Vector3 {x: 2.2100329399108887, y: 14.197495460510254, z: -63.55470275878906}
        // min: Vector3 {x: 0.8418790102005005, y: -14.166850090026855, z: -63.94792556762695}

        // max: Vector3 {x: 0.06489063054323196, y: 0, z: 0.06478084623813629}
        // min: Vector3 {x: -0.06489063054323196, y: -0.9200000166893005, z: -0.06478084623813629}
        // max: Vector3 {x: 0.06489063054323196, y: 0, z: 0.06478084623813629}
        // min: Vector3 {x: -0.06489063054323196, y: -0.9200000166893005, z: -0.06478084623813629}
        gltfScene.userData.to = gltfScene.children[7].geometry.boundingBox.max
        console.log(gltfScene.position, gltfScene.children)
        scene.add(gltfScene)

        // console.log(gltfScene)
        resolve(gltfScene)
      },
      onProgress
    )
  })
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
