/*
 * @Author: Li Jian
 * @Date: 2022-02-14 14:10:21
 * @LastEditTime: 2022-04-14 09:45:26
 * @LastEditors: Li Jian
 * @description: point弹出框
 */
import * as THREE from 'three'
import { geoMercator, AddTween } from '@shared'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import router from '@router'
import { PointPopInterface, MapInterface } from './type'
import html2canvas from 'html2canvas'
import { createApp } from 'vue'
import PointPopupApp from '@components/PointPopupApp.vue'

export default class PointPopup implements PointPopInterface {
  instance: MapInterface
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  currentObject: THREE.Object3D
  constructor(ins: MapInterface, currentObject: THREE.Object3D) {
    this.instance = ins
    this.scene = ins.scene
    this.camera = ins.camera
    this.control = ins.control
    this.currentObject = currentObject
    this.draw()
  }
  async draw() {
    if (!this.deduplication()) return // 去重
    const object3D = new THREE.Object3D() // 装载点弹出框
    object3D.type = 'pointOrLinePopup'
    object3D.userData.cameraOldPosition = this.camera.position.clone() // 记录摄像机原始位置
    object3D.userData.controlOldPosition = this.control.target.clone() // 记录控制器原始位置
    object3D.userData.pointObject = this.currentObject
    const mercatorTrans = geoMercator()
    let position: THREE.Vector3Tuple = mercatorTrans(this.currentObject.userData.position)
    const z = 10
    // 位置偏右2.5，偏下1，为了适配弹出框
    position = [position[0] + 2.5, -position[1], z - 1]
    // 宽高比2/1，与512/256对应
    const width = z * 1.4
    const height = z * 0.7
    // 切换视角
    new AddTween(
      this.instance,
      new THREE.Vector3(position[0], position[1] - 20, position[2]),
      new THREE.Vector3(position[0], position[1], position[2])
    )
    // canvas主体
    let canvas = await this.drawBody()
    let mesh = this.drawMesh(canvas, position, [width, height], 'pointOrLinePopup-body')
    object3D.add(mesh)
    // canvas 跳转按钮
    // canvas = this.drawJumpButton()
    // mesh = this.drawMesh(
    //   canvas,
    //   [position[0], position[1] - 0.001, position[2] - 4],
    //   [width - 8, height - 9],
    //   'pointOrLinePopup-jump-button'
    // )
    // object3D.add(mesh)
    // canvas 关闭按钮
    // canvas = this.drawCloseButton()
    // mesh = this.drawMesh(
    //   canvas,
    //   [position[0] + 3, position[1] - 0.001, position[2] - 4],
    //   [width - 8, height - 9],
    //   'pointOrLinePopup-close-button'
    // )
    // object3D.add(mesh)
    // 关闭按钮
    canvas = this.drawVirtual()
    // 下面的数值目前都是写死的，这样做并不好，需要改进(6.5, 3, 1, 1)
    mesh = this.drawMesh(
      canvas,
      [position[0] + 6.5, position[1] - 0.001, position[2] + 3], // 位置
      [1, 1], // 宽高
      'pointOrLinePopup-close-button'
    )
    object3D.add(mesh)
    // 大标题跳转按钮
    canvas = this.drawVirtual()
    mesh = this.drawMesh(
      canvas,
      [position[0] - 3, position[1] - 0.001, position[2] + 2.5], // 位置
      [7, 1], // 宽高
      'pointOrLinePopup-jump-button'
    )
    object3D.add(mesh)
    this.scene.add(object3D)
  }
  deduplication() {
    // 去重，防止同一个点弹出多个框
    const obj = this.scene.children.find(item => item.type === 'pointOrLinePopup')
    if (obj?.userData.pointObject.uuid === this.currentObject.uuid) return false
    return true
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
  drawVirtual() {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    // const width = 1
    // const height = 1
    // canvas.width = width
    // canvas.height = height
    // const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // ctx.fillStyle = 'rgba(255,255,255,0.4)'
    // ctx.fillRect(0, 0, width, height)
    return canvas
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
  async drawBody() {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.width = 512
    canvas.height = 256
    // console.log(canvas)
    // canvas.width = 512
    // canvas.height = 256
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'rgba(44, 68, 139, 0.5)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.moveTo(0, 0)
    // ctx.lineTo(canvas.width, 0)
    // ctx.lineTo(canvas.width, canvas.height)
    // ctx.lineTo(0, canvas.height)
    // ctx.lineTo(0, 0)
    // ctx.strokeStyle = 'rgba(44, 68, 139, 1)'
    // ctx.lineWidth = 2
    // ctx.stroke()
    // // 文字
    // const fontSize = 20
    // ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    // ctx.font = `${fontSize}px Arial`
    // let text = `经度： ${this.currentObject.userData.position[0]}`
    // const textWidth = ctx.measureText(text).width
    // // center居中: (canvas.width - textWidth)/2 right靠右:(canvas.width - textWidth)
    // ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize + 20)
    // text = `纬度： ${this.currentObject.userData.position[1]}`
    // ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize * 2 + 30)
    // text = `站名：${this.currentObject.userData.station}`
    // ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize * 3 + 40)

    const app = createApp(PointPopupApp)
    const elem = document.createElement('div')
    // 必须添加到dom中才能显示
    document.body.appendChild(elem)
    app.mount(elem)
    await html2canvas(elem, {
      canvas,
      scale: 1,
      backgroundColor: 'rgba(100, 255, 255, 0)',
    })
    return canvas
  }
  jump() {
    // this.instance.dispose()
    router.push('/site') // point
    // window.open(router.resolve('/site').href)
  }
  close(ins: MapInterface, uuid: any) {
    let object3D = this.scene.getObjectByProperty('uuid', uuid) as THREE.Object3D
    if (object3D && object3D.type !== 'pointOrLinePopup') {
      object3D = object3D.parent as THREE.Object3D
    }
    if (object3D) {
      this.scene.remove(object3D)
      THREE.Cache.clear()
    }
    AddTween.recover(ins, object3D.userData.cameraOldPosition, object3D.userData.controlOldPosition)
  }
}
