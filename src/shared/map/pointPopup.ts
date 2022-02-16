/*
 * @Author: Li Jian
 * @Date: 2022-02-14 14:10:21
 * @LastEditTime: 2022-02-16 16:02:49
 * @LastEditors: Li Jian
 * @description: point弹出框
 */
import * as THREE from 'three'
import { geoMercator, AddTween } from '@shared'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { createApp } from 'vue'
// import PointPopupApp from '@components/PointPopupApp.vue'
// import ElementPlus from '@/element-plus'
import router from '@router'

export default class PointPopup {
  instance: any
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  currentObject: THREE.Object3D
  constructor(ins: any, currentObject: THREE.Object3D) {
    this.instance = ins
    this.scene = ins.scene
    this.camera = ins.camera
    this.control = ins.control
    this.currentObject = currentObject
    this.draw()
    return this
  }
  draw() {
    const object3D = new THREE.Object3D() // 装载点弹出框
    object3D.type = 'pointPopup'
    const mercatorTrans = geoMercator()
    let position: THREE.Vector3Tuple = mercatorTrans(this.currentObject.userData.position)
    const z = 12
    position = [position[0], -position[1], z]
    const width = z - 2
    const height = z - 2
    // TODO 切换视角
    new AddTween(
      this.instance,
      new THREE.Vector3(position[0], position[1] - 20, position[2]),
      new THREE.Vector3(...position)
    )
    // this.camera.position.set(position[0], position[1] - 20, position[2])
    // this.control.target.set(...position)

    // canvas主体
    let canvas = this.drawBody()
    let mesh = this.drawMesh(canvas, position, [width, height], 'pointPopup-body')
    object3D.add(mesh)
    // canvas 跳转按钮
    canvas = this.drawJumpButton()
    mesh = this.drawMesh(
      canvas,
      [position[0], position[1] - 0.001, position[2] - 4],
      [width - 8, height - 9],
      'pointPopup-jump-button'
    )
    object3D.add(mesh)
    // canvas 关闭按钮
    canvas = this.drawCloseButton()
    mesh = this.drawMesh(
      canvas,
      [position[0] + 3, position[1] - 0.001, position[2] - 4],
      [width - 8, height - 9],
      'pointPopup-close-button'
    )
    object3D.add(mesh)

    this.scene.add(object3D)
  }
  drawMesh(
    canvas: HTMLCanvasElement,
    position: THREE.Vector3Tuple,
    size: THREE.Vector2Tuple,
    type: string
  ) {
    const texture = new THREE.CanvasTexture(canvas)
    const panel = new THREE.PlaneBufferGeometry(...size)
    const panelMate = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const panelMesh = new THREE.Mesh(panel, panelMate)
    panelMesh.position.set(...position)
    panelMesh.rotateX(Math.PI / 2)
    panelMesh.type = type
    panelMesh.userData.instance = this
    return panelMesh
  }
  drawCloseButton() {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const btnWidth = 60
    const btnHeight = 30
    const btnX = 0
    const btnY = 0
    canvas.width = btnWidth
    canvas.height = btnHeight
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.beginPath()
    ctx.moveTo(btnX, btnY)
    ctx.lineTo(btnX + btnWidth, btnY)
    ctx.lineTo(btnX + btnWidth, btnY + btnHeight)
    ctx.lineTo(btnX, btnY + btnHeight)
    ctx.lineTo(btnX, btnY)
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.lineWidth = 4
    ctx.stroke()
    const fontSize = 20
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.font = `${fontSize}px Arial`
    const text = '关闭'
    ctx.fillText(text, btnX + (btnWidth - ctx.measureText(text).width) / 2, btnY + fontSize)
    return canvas
  }
  drawJumpButton() {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const btnWidth = 60
    const btnHeight = 30
    const btnX = 0
    const btnY = 0
    canvas.width = btnWidth
    canvas.height = btnHeight
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.beginPath()
    // const btnX = (canvas.width - btnWidth) / 2
    // const btnY = canvas.height - btnHeight
    ctx.moveTo(btnX, btnY)
    ctx.lineTo(btnX + btnWidth, btnY)
    ctx.lineTo(btnX + btnWidth, btnY + btnHeight)
    ctx.lineTo(btnX, btnY + btnHeight)
    ctx.lineTo(btnX, btnY)
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.lineWidth = 4
    ctx.stroke()
    const fontSize = 20
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.font = `${fontSize}px Arial`
    const text = '跳转'
    ctx.fillText(text, btnX + (btnWidth - ctx.measureText(text).width) / 2, btnY + fontSize)
    return canvas
  }
  drawBody() {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(44, 68, 139, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.moveTo(0, 0)
    ctx.lineTo(canvas.width, 0)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.lineTo(0, 0)
    ctx.strokeStyle = 'rgba(44, 68, 139, 1)'
    ctx.lineWidth = 2
    ctx.stroke()
    // 文字
    const fontSize = 20
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.font = `${fontSize}px Arial`
    let text = '经度：' + this.currentObject.userData.position[0]
    const textWidth = ctx.measureText(text).width
    // center居中: (canvas.width - textWidth)/2 right靠右:(canvas.width - textWidth)
    ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize + 20)
    text = '纬度：' + this.currentObject.userData.position[1]
    ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize * 2 + 30)
    return canvas
  }
  jump() {
    router.push('/8')
  }
  close(id: any) {
    let object3D = this.scene.getObjectByProperty('id', id) as THREE.Object3D
    if (object3D && object3D.type !== 'pointPopup') {
      object3D = object3D.parent as THREE.Object3D
    }
    if (object3D) {
      this.scene.remove(object3D)
      THREE.Cache.clear()
    }
  }
}
