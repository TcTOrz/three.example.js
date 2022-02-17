/*
 * @Author: Li Jian
 * @Date: 2022-02-17 14:50:47
 * @LastEditTime: 2022-02-17 15:00:54
 * @LastEditors: Li Jian
 */
import { MapInterface } from './map/type'

export interface MakeTweenInterface {
  ins: MapInterface
  camera: THREE.PerspectiveCamera
  cameraOldPosition: THREE.Vector3
  cameraNewPosition: THREE.Vector3
  run(): void
}
