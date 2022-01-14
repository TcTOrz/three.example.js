/*
 * @Author: Li Jian
 * @Date: 2022-01-07 16:17:58
 * @LastEditTime: 2022-01-14 15:48:24
 * @LastEditors: Li Jian
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { makeLoading, onProgress } from './makeLoading'

//   gltf.scene.traverse( function ( child ) {
//     if ( child.isMesh ) {
//           child.material.emissive =  child.material.color;
// child.material.emissiveMap = child.material.map ;
//     }
//   } );
// 默认为GLTFLoader
export const loadModel = (scene: THREE.Scene, url: String) => {
  const gltfUrl = `${url}.gltf`
  const loader = new GLTFLoader(makeLoading())
  return new Promise((resolve, reject) => {
    loader.load(
      gltfUrl,
      gltf => {
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
