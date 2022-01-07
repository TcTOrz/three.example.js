/*
 * @Author: Li Jian
 * @Date: 2022-01-07 16:17:58
 * @LastEditTime: 2022-01-07 16:57:43
 * @LastEditors: Li Jian
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const loadModel = (scene: THREE.Scene) => {
  const loader = new GLTFLoader()
  loader.load('../../public/blender/ElectricStation(5).glb', gltf => {
    scene.add(gltf.scene)
  })
}
