/*
 * @Author: Li Jian
 * @Date: 2022-01-07 16:17:58
 * @LastEditTime: 2022-01-12 15:17:24
 * @LastEditors: Li Jian
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// 默认为GLTFLoader
export const loadModel = (
  scene: THREE.Scene,
  url: String
  // makeFiber: ((scene: THREE.Scene, group: THREE.Group) => void) | undefined,
  // makeText: ((scene: THREE.Scene, group: THREE.Group) => void) | undefined,
) => {
  const gltfUrl = `${url}.gltf`
  const loader = new GLTFLoader()
  loader.load(gltfUrl, gltf => {
    //   gltf.scene.traverse( function ( child ) {
    //     if ( child.isMesh ) {
    //           child.material.emissive =  child.material.color;
    // child.material.emissiveMap = child.material.map ;
    //     }
    //   } );
    scene.add(gltf.scene)
    // console.log(gltf.scene)
    // makeFiber?.(scene, gltf.scene) // 渲染光缆

    // makeText?.(scene, gltf.scene) // 渲染点击文字
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
