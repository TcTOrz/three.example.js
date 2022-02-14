/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:47:23
 * @LastEditTime: 2022-02-14 11:10:12
 * @LastEditors: Li Jian
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/** 基础地图 */
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

/** 地图 */
export interface DrawMapInterface {
  scene: THREE.Scene
  jsonData: { features: Object[]; type: string }
  draw(): void
}

/** 省名 */
export interface ProvinceNameInterface {
  canvas: HTMLCanvasElement
  data: any
  camera: THREE.PerspectiveCamera
  draw(): void
}

/** 飞线 */
export interface FlyLineInterface {
  scene: THREE.Scene
  flyLine: { name?: string; info?: string; path: any }
  draw(): void
}

/** 雷达 */
export interface RadarInterface {
  scene: THREE.Scene
  data: any[]
  draw(): void
}

/** 城市光 */
export interface CityLightInterface {
  scene: THREE.Scene
  jsonData: any
  draw(): void
}

/** 点 */
export interface PointInterface {
  scene: THREE.Scene
  data: any[]
  draw(): void
}
