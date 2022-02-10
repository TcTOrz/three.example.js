/*
 * @Author: Li Jian
 * @Date: 2022-02-10 14:17:30
 * @LastEditTime: 2022-02-10 16:53:05
 * @LastEditors: Li Jian
 */
import { geoMercator } from '@shared'
import * as THREE from 'three'

let canvas
export default function (ins: any) {
  canvas = ins.provinceCvs
  // const canvas = document.querySelector('#c14ProvinceName') as HTMLCanvasElement
  if (!canvas) return
  const data = ins.scene.getObjectByName('nation')
  const camera = ins.camera
  const mercatorTrans = geoMercator()
  const width = window.innerWidth
  const height = window.innerHeight
  const ctx = canvas.getContext('2d')
  // 离屏canvas
  const offsetCanvas = document.createElement('canvas')
  offsetCanvas.width = width
  offsetCanvas.height = height
  const offsetCtx = offsetCanvas.getContext('2d')
  if (!offsetCtx) return
  offsetCtx.font = '12px'
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
        const position = vector.project(camera)
        const left = ((vector.x + 1) / 2) * width
        const top = (-(vector.y - 1) / 2) * height
        const gap = 10 // 省名显示密度
        const text = {
          name,
          left,
          top,
          width: offsetCtx.measureText(name).width + gap,
          height: 12 + gap,
        }
        let show = true
        for (let i = 0; i < texts.length; i++) {
          if (
            text.left + text.width < texts[i].left ||
            text.top + text.height < texts[i].top ||
            texts[i].left + texts[i].width < text.left ||
            texts[i].top + texts[i].height < text.top
          ) {
            show = true
          } else {
            show = false
            break
          }
        }
        offsetCtx.strokeText('测试', 9 + Math.random() * 10, 9 + Math.random() * 10)
        offsetCtx.fillText('测试', 9 + Math.random() * 10, 9 + Math.random() * 10)
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

// export default class ProvinceName {
//   canvas
//   data
//   camera
//   constructor(ins: any) {
//     this.canvas = ins.provinceCvs
//     this.data = ins.scene.getObjectByName('nation')
//     this.camera = ins.camera
//     this.draw()
//   }
//   draw() {
//     const data = this.data
//     const mercatorTrans = geoMercator()
//     const canvas = this.canvas
//     const width = window.innerWidth
//     const height = window.innerHeight
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')
//     // 离屏canvas
//     const offsetCanvas = document.createElement('canvas')
//     offsetCanvas.width = width
//     offsetCanvas.height = height
//     const offsetCtx = offsetCanvas.getContext('2d')
//     if (!offsetCtx) return
//     offsetCtx.font = '12px'
//     // offsetCtx.strokeStyle = '#000'
//     offsetCtx.fillStyle = '#ccc'

//     const texts: any[] = []
//     data?.children.map((elem: { name: any; userData: { centroid?: any; name?: any; center?: any } }) => {
//       if (elem.name) {
//         let { name, center } = elem.userData
//         if ('centroid' in elem.userData) {
//           center = elem.userData.centroid
//         }
//         const [x, y] = mercatorTrans(center)
//         const z = 0
//         const vector = new THREE.Vector3(x, -y, z)
//         const position = vector.project(this.camera)
//         const left = ((vector.x + 1) / 2) * width
//         const top = (-(vector.y - 1) / 2) * height
//         const gap = 10 // 省名显示密度
//         const text = {
//           name,
//           left,
//           top,
//           width: offsetCtx.measureText(name).width + gap,
//           height: 12 + gap,
//         }
//         let show = true
//         for (let i = 0; i < texts.length; i++) {
//           if (
//             text.left + text.width < texts[i].left ||
//             text.top + text.height < texts[i].top ||
//             texts[i].left + texts[i].width < text.left ||
//             texts[i].top + texts[i].height < text.top
//           ) {
//             show = true
//           } else {
//             show = false
//             break
//           }
//         }
//         offsetCtx.strokeText('测试', 9, 9)
//         offsetCtx.fillText('测试',  9, 9)
//         if (show) {
//           texts.push(text)
//           offsetCtx.strokeText(name, left, top)
//           offsetCtx.fillText(name, left, top)
//         }
//       }
//     })
//     // 离屏canvas绘制到canvas中
//     ctx?.drawImage(offsetCanvas, 0, 0)
//   }
// }
