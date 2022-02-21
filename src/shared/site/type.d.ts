/*
 * @Author: Li Jian
 * @Date: 2022-02-21 08:46:24
 * @LastEditTime: 2022-02-21 08:50:20
 * @LastEditors: Li Jian
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ref } from 'vue'

export interface SiteInterface {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  textureLoader: THREE.TextureLoader
  // 自定义事件变量
  removeEvent: Function
  removeEvent2: Function
  removeEvent3: Function
  // 标志位, 用于判断是否在房间内部
  isInRoom: Ref<Boolean>
  cameraPosition: THREE.Vector3Tuple
  elemEnter: HTMLDivElement
  elemLeave: HTMLDivElement
  move(): void
}
