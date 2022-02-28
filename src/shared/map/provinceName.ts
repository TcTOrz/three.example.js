/*
 * @Author: Li Jian
 * @Date: 2022-02-10 14:17:30
 * @LastEditTime: 2022-02-28 09:22:39
 * @LastEditors: Li Jian
 */
import { geoMercator } from '@shared'
import * as THREE from 'three'
import { ProvinceNameInterface, MapInterface } from './type'

export default class ProvinceName implements ProvinceNameInterface {
  ins
  canvas
  data
  camera
  group
  mercatorTrans
  constructor(ins: MapInterface) {
    this.ins = ins
    this.canvas = ins.provinceCvs
    this.data = ins.scene.getObjectByName('nation')
    this.camera = ins.camera
    this.group = new THREE.Group()
    // 清除原有的标注
    const grp = ins.scene.getObjectByName('province-name')
    grp ? ins.scene.remove(grp) : null
    this.group.name = 'province-name'
    this.mercatorTrans = geoMercator()
    ins.scene.add(this.group)
    this.mercatorTrans = geoMercator()
    // 1、这是第一种画出省名的方法，缺点是需要与外部canvas相结合，占用dom空间
    // 并且这种方法还有一些令人感到困惑的边界值需要处理。
    // this.drawFromCanvas()
    // 2、第二种方法，引用自带Sprite
    this.drawFromSprite()
  }
  private canvasToImg(text: string) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const textWidth = ctx.measureText(text).width
    const fontSize = 12
    canvas.width = textWidth
    canvas.height = fontSize * 1.5
    ctx.fillStyle = 'rgba(44, 68, 139, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#eee'
    ctx.font = `${fontSize}px`
    // center居中: (canvas.width - textWidth)/2 right靠右:(canvas.width - textWidth)
    // ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize + 20)
    ctx.fillText(text, (canvas.width - textWidth) / 2, fontSize)
    return canvas
  }
  private getPoiScale(position: THREE.Vector3, poiRect: { w: any; h: any }) {
    // 获得标注缩放大小
    if (!position) return
    const ins = this.ins
    const distance = ins.camera.position.distanceTo(position)
    const top = Math.tan(((ins.camera.fov / 2) * Math.PI) / 180) * distance //camera.fov 相机的拍摄角度
    const meterPerPixel = (2 * top) / ins.canvas.height
    const scaleX = poiRect.w * meterPerPixel
    const scaleY = poiRect.h * meterPerPixel
    return [scaleX, scaleY, 1.0]
  }
  drawFromSprite() {
    const data = this.data
    const texts: THREE.Sprite[] = []
    data?.children.map(
      (elem: { name: any; userData: { centroid?: any; name?: any; center?: any } }) => {
        if (elem.name) {
          let { name, center } = elem.userData
          if ('centroid' in elem.userData) {
            center = elem.userData.centroid
          }
          const [x, y] = this.mercatorTrans(center)
          const z = 0
          const position: THREE.Vector3Tuple = [x, -y, z]
          const canvas = this.canvasToImg(name)
          const spriteMaterial = new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(canvas),
            transparent: true,
            depthWrite: false,
          })
          const sprite = new THREE.Sprite(spriteMaterial)
          sprite.userData.width = canvas.width
          sprite.userData.height = canvas.height
          sprite.userData.name = elem.name
          sprite.userData.canvas = canvas
          sprite.position.set(...position)
          let show = true
          texts.map((s: THREE.Sprite) => {
            let vec3 = new THREE.Vector3(s.position.x, s.position.y, s.position.z)
            vec3.project(this.ins.camera)
            const x = Math.round((0.5 + vec3.x / 2) * window.innerWidth)
            const y = Math.round((0.5 - vec3.y / 2) * window.innerHeight)
            vec3 = new THREE.Vector3(...position)
            vec3.project(this.ins.camera)
            const x1 = Math.round((0.5 + vec3.x / 2) * window.innerWidth)
            const y1 = Math.round((0.5 - vec3.y / 2) * window.innerHeight)
            const i = [x, y, s.userData.width, s.userData.height]
            const ii = [x1, y1, sprite.userData.width, sprite.userData.height]
            // 标注碰撞检测
            if (
              i[0] + i[2] < ii[0] || // right < left
              i[0] > ii[0] + ii[2] || // left  > right
              i[1] + i[3] < ii[1] || // bottom > top
              i[1] > ii[1] + ii[3] // top < bottom
            ) {
              // ...
            } else {
              show = false
            }
          })
          if (show) {
            texts.push(sprite)
            const scale = this.getPoiScale(new THREE.Vector3(...position), {
              w: canvas.width,
              h: canvas.height,
            }) as THREE.Vector3Tuple
            sprite.scale.set(...scale)
            this.group.add(sprite)
          }
        }
      }
    )
  }
  drawFromCanvas() {
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
