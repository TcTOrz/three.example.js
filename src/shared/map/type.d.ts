/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:47:23
 * @LastEditTime: 2022-02-23 16:42:37
 * @LastEditors: Li Jian
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/** 基础地图 */
export interface MapInterface {
  canvas: HTMLCanvasElement
  provinceCvs: HTMLCanvasElement
  popElem: HTMLDivElement
  // pointPopElem: HTMLDivElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  clock: THREE.Clock
  events: Array<Function>
  // fileLoader: THREE.FileLoader
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

/** 点弹出框 */
export interface PointPopInterface {
  instance: any
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  currentObject: THREE.Object3D
  draw(): void
  deduplication(): boolean
  drawMesh(
    canvas: HTMLCanvasElement,
    position: THREE.Vector3Tuple,
    size: THREE.Vector2Tuple,
    type: string
  ): THREE.Mesh
  drawCloseButton(): HTMLCanvasElement
  drawJumpButton(): HTMLCanvasElement
  drawBody(): HTMLCanvasElement
  jump(): void
  close(ins: MapInterface, uuid: any): void
}

/** 线弹出框 */
export interface LinePopupInterface extends PointPopInterface {
  jump(): void
}
