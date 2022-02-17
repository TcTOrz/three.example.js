/*
 * @Author: Li Jian
 * @Date: 2022-02-16 15:43:12
 * @LastEditTime: 2022-02-17 09:58:52
 * @LastEditors: Li Jian
 * @description: tween动画
 */
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

export default class MakeTween {
  ins: any
  camera: THREE.PerspectiveCamera
  cameraOldPosition: THREE.Vector3
  cameraNewPosition: THREE.Vector3
  // controlNewPosition: THREE.Vector3
  constructor(ins: any, cameraNewPosition: THREE.Vector3) {
    this.ins = ins
    this.cameraOldPosition = new THREE.Vector3()
    this.cameraNewPosition = cameraNewPosition
    // this.controlNewPosition = controlNewPosition
    this.camera = ins.camera
    this.camera.getWorldPosition(this.cameraOldPosition)
    this.run()
  }
  run() {
    const tween = new TWEEN.Tween(this.cameraOldPosition)
    tween
      .to(this.cameraNewPosition, 1000)
      .onUpdate(obj => {
        this.camera.position.set(obj.x, obj.y, obj.z)
        this.ins.control.target.set(obj.x, (obj.y / 7) * 4 + 20, obj.z)
      })
      .onComplete(() => {})
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
  }
  static revover(ins: any, cameraNewPosition: THREE.Vector3) {
    const cameraOldPosition = ins.camera.position.clone()
    const tween = new TWEEN.Tween(cameraOldPosition)
    tween
      .to(cameraNewPosition, 1000)
      .onUpdate(obj => {
        ins.camera.position.set(obj.x, obj.y, obj.z)
        // calulate: camera = [0, -35, 20] control = 0, -20, 10
        ins.control.target.set(obj.x, (obj.y / 7) * 4, obj.z / 2)
      })
      .onComplete(() => {})
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
  }
}
