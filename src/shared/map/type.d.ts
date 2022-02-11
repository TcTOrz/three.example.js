/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:47:23
 * @LastEditTime: 2022-02-11 10:30:35
 * @LastEditors: Li Jian
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface MapInterface {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  clock: THREE.Clock
  fileLoader: THREE.FileLoader
  init(): void
  load(): void
  render(): void
}

export interface DrawMapInterface {
  scene: THREE.Scene
  jsonData: { features: Object[]; type: string }
  draw(): void
}

export interface ProvinceNameInterface {
  canvas: HTMLCanvasElement
  data: any
  camera: THREE.PerspectiveCamera
  draw(): void
}

export interface FlyLineInterface {
  scene: THREE.Scene
  flyLine: { name?: string; info?: string; path: any }
  draw(): void
}

export interface RadarInterface {
  scene: THREE.Scene
  data: any[]
  draw(): void
}

export interface CityLightInterface {
  scene: THREE.Scene
  jsonData: any
  draw(): void
}
