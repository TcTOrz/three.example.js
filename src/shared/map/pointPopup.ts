/*
 * @Author: Li Jian
 * @Date: 2022-02-14 14:10:21
 * @LastEditTime: 2022-02-14 16:16:38
 * @LastEditors: Li Jian
 * @description: point弹出框
 */
import * as THREE from 'three'
import { geoMercator } from '@shared'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class PointPopup {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  control: OrbitControls
  currentObj: any
  constructor(ins: any, obj: any) {
    this.scene = ins.scene
    this.camera = ins.camera
    this.control = ins.control
    this.currentObj = obj
    this.draw()
  }
  draw() {
    const mercatorTrans = geoMercator()
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.width = 128
    canvas.height = 128
    canvas.style.width = '128px'
    canvas.style.height = '128px'
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'rgba(44, 62, 80, 0.5)'
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.textAlign = 'center'
    ctx.font = '12px Arial'
    // ctx.fillStyle = '#fff'
    ctx.fillStyle = '#000'
    ctx.fillText('测试1111', 30, 30)
    ctx.fillText('测试2222', 30, 60)

    let texture = new THREE.CanvasTexture(canvas)
    let panel1 = new THREE.PlaneBufferGeometry(10, 10)
    let panelMate1 = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    let panelMesh1 = new THREE.Mesh(panel1, panelMate1)
    const pos = mercatorTrans(this.currentObj.userData.position)
    panelMesh1.position.set(pos[0], -pos[1], 12)
    panelMesh1.rotateX(Math.PI / 2)
    this.scene.add(panelMesh1)

    this.camera.position.set(pos[0], -pos[1] - 20, 10)
    this.control.target.set(pos[0], -pos[1], 10)
  }
}
