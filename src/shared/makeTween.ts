/*
 * @Author: Li Jian
 * @Date: 2022-02-16 15:43:12
 * @LastEditTime: 2022-02-16 16:35:39
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
  controlNewPosition: THREE.Vector3
  constructor(ins: any, cameraNewPosition: THREE.Vector3, controlNewPosition: THREE.Vector3) {
    this.ins = ins
    this.cameraOldPosition = new THREE.Vector3()
    this.cameraNewPosition = cameraNewPosition
    this.controlNewPosition = controlNewPosition
    this.camera = ins.camera
    this.camera.getWorldPosition(this.cameraOldPosition)
    this.run()
  }
  run() {
    // this.ins.control.target.set(this.controlNewPosition.x, this.controlNewPosition.y, this.controlNewPosition.z)
    // const tween =  new TWEEN.Tween(this.cameraOldPosition)
    // tween.to({ x: 0, y: 0, z: 50 }, 500)
    // tween.onUpdate((obj) => {
    //   // this.ins.control.target.set(this.controlNewPosition.x, this.controlNewPosition.y, this.controlNewPosition.z)
    //   this.camera.position.set(obj.x, obj.y, obj.z)
    // })
    // tween.onComplete(() => {
    const tween = new TWEEN.Tween(this.cameraOldPosition)
    tween.to(this.cameraNewPosition, 1000)
    tween.onUpdate(obj => {
      this.camera.position.set(obj.x, obj.y, obj.z)
      this.ins.control.target.set(obj.x, obj.y + 20, obj.z)
    })
    tween.onComplete(() => {})
    tween.easing(TWEEN.Easing.Cubic.Out)
    tween.start()
    // })
    // tween.easing(TWEEN.Easing.Cubic.InOut)
    // tween.start()
    // console.log(this.cameraOldPosition);
    // const tween =  new TWEEN.Tween(this.cameraOldPosition)
    // tween.to(this.cameraNewPosition, 1000)
    // tween.onUpdate((obj) => {
    //   this.ins.control.target.set(this.controlNewPosition.x, this.controlNewPosition.y, this.controlNewPosition.z)
    //   this.camera.position.set(obj.x, obj.y, obj.z)
    // })
    // tween.onComplete(() => {

    // })
    // tween.easing(TWEEN.Easing.Cubic.InOut)
    // tween.start()
  }
}
