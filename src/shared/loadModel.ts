/*
 * @Author: Li Jian
 * @Date: 2022-01-07 16:17:58
 * @LastEditTime: 2022-01-10 16:02:41
 * @LastEditors: Li Jian
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const loadModel = (scene: THREE.Scene) => {
  const loader = new GLTFLoader()
  loader.load('./blender/ElectricStation.gltf', gltf => {
    //   gltf.scene.traverse( function ( child ) {
    //     if ( child.isMesh ) {
    //           child.material.emissive =  child.material.color;
    // child.material.emissiveMap = child.material.map ;
    //     }
    //   } );
    scene.add(gltf.scene)
    console.log(gltf)
  })

  // const fbxLoader = new FBXLoader()
  // fbxLoader.load('./blender/ElectricStation.fbx', fbx => {
  // //   fbx.traverse( function ( child ) {
  // //     if ( child.isMesh ) {
  // //           child.material.emissive =  child.material.color;
  // // child.material.emissiveMap = child.material.map ;
  // //     }
  // //   } );
  //   scene.add(fbx)
  //   console.log(fbx);
  // })

  // const objLoader = new OBJLoader()
  // const mtlLoader = new MTLLoader()
  // mtlLoader.load('./blender/ElectricStation.mtl', materials => {
  //   materials.preload()
  //   objLoader.setMaterials(materials)
  //   objLoader.load('./blender/ElectricStation.obj', object => {
  //     scene.add(object)
  //   })
  // })
}
