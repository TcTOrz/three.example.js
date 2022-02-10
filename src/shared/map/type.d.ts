/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:47:23
 * @LastEditTime: 2022-02-10 11:21:11
 * @LastEditors: Li Jian
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface MapInterface {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  init(): void
  load(): void
  render(): void
}

export interface DrawMapInterface {
  scene: THREE.Scene
  jsonData: { features: Object[]; type: string }
  draw(): void
}
