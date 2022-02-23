/*
 * @Author: Li Jian
 * @Date: 2022-02-10 14:17:30
 * @LastEditTime: 2022-02-23 15:21:25
 * @LastEditors: Li Jian
 */
import { geoMercator } from '@shared'
import * as THREE from 'three'
import { ProvinceNameInterface, MapInterface } from './type'

export default class ProvinceName implements ProvinceNameInterface {
  canvas
  data
  camera
  constructor(ins: MapInterface) {
    this.canvas = ins.provinceCvs
    this.data = ins.scene.getObjectByName('nation')
    this.camera = ins.camera
    this.draw()
  }
  draw() {
    const data = this.data
    const mercatorTrans = geoMercator()
    const canvas = this.canvas
    const width = window.innerWidth
    const height = window.innerHeight
    // important 需要指定画布大小，否则canvas显示异常！
    canvas.width = width
    canvas.height = height
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // 离屏canvas
    const offsetCanvas = document.createElement('canvas')
    offsetCanvas.width = width
    offsetCanvas.height = height
    const offsetCtx = offsetCanvas.getContext('2d')
    if (!offsetCtx) return
    offsetCtx.font = '10px'
    // offsetCtx.strokeStyle = '#000'
    offsetCtx.fillStyle = '#ccc'

    const texts: any[] = []
    data?.children.map(
      (elem: { name: any; userData: { centroid?: any; name?: any; center?: any } }) => {
        if (elem.name) {
          let { name, center } = elem.userData
          if ('centroid' in elem.userData) {
            center = elem.userData.centroid
          }
          const [x, y] = mercatorTrans(center)
          const z = 0
          const vector = new THREE.Vector3(x, -y, z)
          vector.project(this.camera)
          const left = ((vector.x + 1) / 2) * width
          const top = (-(vector.y - 1) / 2) * height
          const gap = 10 // 省名显示密度
          const text = {
            name,
            left,
            top,
            width: offsetCtx.measureText(name).width + gap,
            height: 10 + gap,
          }
          let show = true
          for (let i = 0; i < texts.length; i++) {
            if (
              (text.left + text.width < texts[i].left ||
                text.top + text.height < texts[i].top ||
                texts[i].left + texts[i].width < text.left ||
                texts[i].top + texts[i].height < text.top) &&
              -(vector.y - 1) / 2 > 0.1 &&
              (vector.x + 1) / 2 < 0.9 // 一个折中的做法，台湾等省名显示异常
            ) {
              show = true
            } else {
              show = false
              break
            }
          }
          if (show) {
            texts.push(text)
            offsetCtx.strokeText(name, left, top)
            offsetCtx.fillText(name, left, top)
          }
        }
      }
    )
    // 离屏canvas绘制到canvas中
    ctx?.drawImage(offsetCanvas, 0, 0)
  }
}
