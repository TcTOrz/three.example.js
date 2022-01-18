/*
 * @Author: Li Jian
 * @Date: 2022-01-07 16:17:58
 * @LastEditTime: 2022-01-18 15:06:54
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
