/*
 * @Author: Li Jian
 * @Date: 2022-02-21 09:50:29
 * @LastEditTime: 2022-03-09 14:34:39
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class FiberInterface {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  cameraPosition: THREE.Vector3Tuple
  textureLoader: THREE.TextureLoader
  control: OrbitControls
  mouse: THREE.Vector2
  INTERSECTED: any
  raycaster: THREE.Raycaster
  constructor(canvas: HTMLCanvasElement)
  init(): void
  initRenderer(): void
  initScene(): void
  initCamera(): void
  initLight(): void
  initControl(): void
  load(): void
  loadTower(): void
  event(): void
  render(): void
  dispose(): void
}
