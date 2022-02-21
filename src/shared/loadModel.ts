/*
 * @Author: Li Jian
 * @Date: 2022-01-07 16:17:58
 * @LastEditTime: 2022-02-21 11:31:52
 * @LastEditors: Li Jian
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { makeLoading, onProgress } from './makeLoading'
import * as THREE from 'three'

import makeFiber from './fiber/makeFiber'

//   gltf.scene.traverse( function ( child ) {
//     if ( child.isMesh ) {
//           child.material.emissive =  child.material.color;
// child.material.emissiveMap = child.material.map ;
//     }
//   } );

export const loadGltfModel = (scene: THREE.Scene, url: String, rest?: any) => {
  const gltfUrl = url as string
  const arr = gltfUrl.split('/')
  const name = arr[arr.length - 2]
  const loader = new GLTFLoader(makeLoading())
  return new Promise((resolve, reject) => {
    loader.load(
      gltfUrl,
      gltf => {
        if (name === '场景') {
          // console.log(gltf.scene);
        }
        // 机柜摆放到房子里面
        if (name === '柜子') {
          // 柜子位置大小方向的总体调整
          gltf.scene.scale.set(0.3, 0.3, 0.3)
          let group = scene.getObjectByName('房间里面点001') as THREE.Group
          const position: THREE.Vector3 = group.position
          gltf.scene.position.set(position.x, position.y, position.z)
          gltf.scene.rotation.set(0, Math.PI, 0)
          // console.log(gltf.scene);
          // 柜子细节调整
          group = gltf.scene.getObjectByName('mesh_19') as THREE.Group
          group.visible = false
          group = gltf.scene.getObjectByName('mesh_20') as THREE.Group
          group.visible = false
          // group.scale.setZ(0.5)
          // console.log(group)
        }
        // 杆塔
        if (name === '塔杆' && rest) {
          // gltf.scene.position.set(0, 20, 0)
          // scene.add(gltf.scene)
          // scenes<Array> 默认是有一个值的,其值为scene
          const { scene: towerScene, scenes: towerScenes } = gltf
          let moreTowerScene: any
          rest.map(
            (
              tower: {
                id: number
                name: string
                position: THREE.Vector3Tuple
                fiber: { from: Array<number>; to: Array<number> }
              },
              index: number
            ) => {
              if (index === 0) {
                moreTowerScene = towerScene
                moreTowerScene.position.set(...tower.position)
              } else {
                moreTowerScene = towerScene.clone()
                towerScenes.push(moreTowerScene)
              }
              moreTowerScene.traverse(
                (child: { isMesh: any; material: THREE.MeshStandardMaterial }) => {
                  if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                      color: 0xffffff,
                      metalness: 0.5,
                      roughness: 0.5,
                      emissive: 0xffffff,
                      emissiveIntensity: 0.3,
                    })
                  }
                }
              )
              moreTowerScene.scale.set(0.4, 0.4, 0.4)
              moreTowerScene.position.set(...tower.position)
              const box = new THREE.Box3().setFromObject(moreTowerScene)
              const boxSize = box.getSize(new THREE.Vector3()) // 大小
              const boxCenter = box.getCenter(new THREE.Vector3()) // 中心
              moreTowerScene.children.map((_: any, idx: string | number) => {
                moreTowerScene.children[idx].name = `Tower_${moreTowerScene.children[idx].name}`
              })
              moreTowerScene.userData.boxSize = boxSize
              moreTowerScene.userData.boxCenter = boxCenter
              moreTowerScene.userData.info = tower
              // 为什么是下标12,13而不是其他，需要结合blender模型查看
              moreTowerScene.userData.from = moreTowerScene.children[4].position
              moreTowerScene.userData.to = moreTowerScene.children[5].position
              if (index !== 0) {
                // 如果不是第一个，则需要添加到场景中，防止重复添加
                scene.add(moreTowerScene)
              }
            }
          )
          towerScenes.map(group => {
            makeFiber(scene, towerScenes, group)
          })
        }
        scene.add(gltf.scene)
      },
      onProgress(resolve)
    )
  })
}

// 默认为GLTFLoader
export const loadModel = (scene: THREE.Scene, url: String) => {
  const gltfUrl = `${url}.gltf`
  const loader = new GLTFLoader(makeLoading())
  return new Promise((resolve, reject) => {
    loader.load(
      gltfUrl,
      gltf => {
        if (url === './blender/场景/ElectricStation') {
          // console.log(gltf.scene);
        }
        // 机柜摆放到房子里面
        if (url === './blender/柜子/scene') {
          // 柜子位置大小方向的总体调整
          gltf.scene.scale.set(0.3, 0.3, 0.3)
          let group = scene.getObjectByName('房间里面点001') as THREE.Group
          const position: THREE.Vector3 = group.position
          gltf.scene.position.set(position.x, position.y, position.z)
          gltf.scene.rotation.set(0, Math.PI, 0)
          // console.log(gltf.scene);
          // 柜子细节调整
          group = gltf.scene.getObjectByName('mesh_19') as THREE.Group
          group.visible = false
          group = gltf.scene.getObjectByName('mesh_20') as THREE.Group
          group.visible = false
          // group.scale.setZ(0.5)
          // console.log(group)
        }
        scene.add(gltf.scene)
      },
      onProgress(resolve)
    )
  })
}

// FBXLoader
export const loadModelFromFbx = (scene: THREE.Scene, url: String) => {
  const fbxUrl = `${url}.fbx`
  const fbxLoader = new FBXLoader()
  fbxLoader.load(fbxUrl, fbx => {
    scene.add(fbx)
    console.log(fbx)
  })
}

// OBJLoader
export const loadModelFromObj = (scene: THREE.Scene, url: String) => {
  const mtlUrl = `${url}.mtl`
  const objUrl = `${url}.obj`
  const objLoader = new OBJLoader()
  const mtlLoader = new MTLLoader()
  mtlLoader.load(mtlUrl, materials => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load(objUrl, object => {
      scene.add(object)
    })
  })
}
