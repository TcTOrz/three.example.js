/*
 * @Author: Li Jian
 * @Date: 2022-02-21 15:09:08
 * @LastEditTime: 2022-04-07 16:22:56
 * @LastEditors: Li Jian
 */
import { AddPointPopup as PointPopup } from '@shared'
import router from '@router'
import { MapInterface, LinePopupInterface } from './type'

export default class LinePopup extends PointPopup implements LinePopupInterface {
  instance: MapInterface
  constructor(ins: MapInterface, currentObject: THREE.Object3D) {
    super(ins, currentObject)
    this.instance = ins
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
    let text = `经度： ${this.currentObject.userData.position[0]}`
    const textWidth = ctx.measureText(text).width
    // center居中: (canvas.width - textWidth)/2 right靠右:(canvas.width - textWidth)
    ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize + 20)
    text = `纬度： ${this.currentObject.userData.position[1]}`
    ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize * 2 + 30)
    text = `to: ${this.currentObject.userData.toStation}`
    ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize * 3 + 40)
    // text = `站名：${this.currentObject.userData.station}`
    // ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize * 3 + 40)
    return canvas
  }
  jump() {
    // this.instance.dispose()
    router.push('/fiber') // fiber
    // window.open(router.resolve('/fiber').href)
  }
}
