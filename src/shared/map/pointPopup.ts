/*
 * @Author: Li Jian
 * @Date: 2022-02-14 14:10:21
 * @LastEditTime: 2022-02-15 16:01:22
 * @LastEditors: Li Jian
 * @description: point弹出框
 */
import * as THREE from 'three'
import { geoMercator } from '@shared'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { createApp } from 'vue'
// import PointPopupApp from '@components/PointPopupApp.vue'
// import ElementPlus from '@/element-plus'
import router from '@router'

export default class PointPopup {
  // elem: HTMLDivElement
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  currentObj: any
  bounds: any // 边界检测
  constructor(ins: any, obj: any) {
    // this.elem = ins.pointPopElem
    this.scene = ins.scene
    this.camera = ins.camera
    this.control = ins.control
    this.currentObj = obj
    this.draw()
  }
  draw() {
    // 可行性不大，暂时无法实现复杂的交互逻辑
    this.drawFromCanvas()
    // 通过HTML渲染，又与3d效果背道而驰
    // this.drawFromHtml()
  }
  drawFromHtml() {
    // this.elem.style.display = 'block'
    // console.log(this.elem)
    // const appElement = document.createElement('div')
    // this.elem.appendChild(appElement)
    // const a = 'a123'
    // const app = createApp(PointPopupApp, { a })
    // app.use(ElementPlus)
    // console.log(app)
    // app.mount(appElement)
    // const mercatorTrans = geoMercator()
    // const pos = mercatorTrans(this.currentObj.userData.position)
    // const vec3 = new THREE.Vector3()
    // this.currentObj.getWorldPosition(vec3)
    // const viewWidth = window.innerWidth
    // const viewHeight = window.innerHeight
    // console.log(pos, viewWidth, viewHeight, this.currentObj, vec3);
  }
  drawFromCanvas() {
    const mercatorTrans = geoMercator()
    const canvas = this.drawCanvas()
    const texture = new THREE.CanvasTexture(canvas)
    const panel = new THREE.PlaneBufferGeometry(10, 10)
    const panelMate = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const panelMesh = new THREE.Mesh(panel, panelMate)
    const pos = mercatorTrans(this.currentObj.userData.position)
    panelMesh.position.set(pos[0], -pos[1], 12)
    panelMesh.rotateX(Math.PI / 2)
    panelMesh.type = 'pointPopup'
    panelMesh.userData.instance = this
    this.scene.add(panelMesh)

    // TODO 切换视角
    this.camera.position.set(pos[0], -pos[1] - 20, 10)
    this.control.target.set(pos[0], -pos[1], 10)
  }
  private drawCanvas() {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.width = 256
    canvas.height = 256
    // canvas.style.width = '256px'
    // canvas.style.height = '256px'
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(44, 68, 139, 0.5)'
    // ctx.beginPath()
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
    const text = 'Hello World'
    // const textWidth = ctx.measureText(text).width
    // center: (canvas.width - textWidth)/2 right:(canvas.width - textWidth)
    ctx.fillText(text, 0, fontSize)
    this.drawBtn(canvas, ctx)
    return canvas
  }
  private drawBtn(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    // 按钮
    ctx.beginPath()
    const btnWidth = 60
    const btnHeight = 30
    const btnX = (canvas.width - btnWidth) / 2
    const btnY = canvas.height - btnHeight
    ctx.moveTo(btnX, btnY)
    ctx.lineTo(btnX + btnWidth, btnY)
    ctx.lineTo(btnX + btnWidth, btnY + btnHeight)
    ctx.lineTo(btnX, btnY + btnHeight)
    ctx.lineTo(btnX, btnY)
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.lineWidth = 2
    ctx.stroke()
    const fontSize = 20
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.font = `${fontSize}px Arial`
    const text = '跳转'
    ctx.fillText(text, btnX + (btnWidth - ctx.measureText(text).width) / 2, btnY + fontSize)
  }
  jump() {
    router.push('/8')
  }
}
