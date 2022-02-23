/*
 * @Author: Li Jian
 * @Date: 2022-02-16 15:43:12
 * @LastEditTime: 2022-02-23 12:04:52
 * @LastEditors: Li Jian
 * @description: tween动画
 */
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import { MakeTweenInterface } from './type'
import { MapInterface } from './map/type'

export default class MakeTween implements MakeTweenInterface {
  ins: MapInterface
  camera: THREE.PerspectiveCamera
  cameraOldPosition: THREE.Vector3
  cameraNewPosition: THREE.Vector3
  controlNewPosition: THREE.Vector3
  controlOldPosition: THREE.Vector3
  constructor(ins: any, cameraNewPosition: THREE.Vector3, controlNewPosition: THREE.Vector3) {
    this.ins = ins
    this.cameraOldPosition = new THREE.Vector3()
    this.cameraNewPosition = cameraNewPosition
    this.controlNewPosition = controlNewPosition
    this.controlOldPosition = ins.control.target.clone()
    this.camera = ins.camera
    this.camera.getWorldPosition(this.cameraOldPosition)
    this.run()
  }
  run() {
    const tween = new TWEEN.Tween({
      camera: this.cameraOldPosition,
      control: this.controlOldPosition,
    })
    tween
      .to({ camera: this.cameraNewPosition, control: this.controlNewPosition }, 800)
      .onUpdate(object => {
        this.camera.position.set(object.camera.x, object.camera.y, object.camera.z)
        this.ins.control.target.set(object.control.x, object.control.y, object.control.z)
      })
      .onComplete(() => {})
      .easing(TWEEN.Easing.Quadratic.In)
      .start()
  }
  static recover(
    ins: MapInterface,
    cameraNewPosition: THREE.Vector3,
    controlNewPosition: THREE.Vector3
  ) {
    const cameraOldPosition = ins.camera.position.clone()
    const controlOldPosition = ins.control.target.clone()
    const tween = new TWEEN.Tween({
      camera: cameraOldPosition,
      control: controlOldPosition,
    })
    tween
      .to({ camera: cameraNewPosition, control: controlNewPosition }, 1000)
      .onUpdate(obj => {
        ins.camera.position.set(obj.camera.x, obj.camera.y, obj.camera.z)
        ins.control.target.set(obj.control.x, obj.control.y, obj.control.z)
      })
      .onComplete(() => {})
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
  }
}
