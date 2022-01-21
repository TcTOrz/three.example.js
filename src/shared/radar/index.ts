/*
 * @Author: Li Jian
 * @Date: 2022-01-21 15:52:25
 * @LastEditTime: 2022-01-21 16:35:51
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'

import Radar from './radar'

// const radarData = [
//   {
//     position: {
//       x: 666,
//       y: 22,
//       z: 0,
//     },
//     radius: 150,
//     color: '#ff0000',
//     opacity: 0.5,
//     speed: 2,
//   },
//   {
//     position: {
//       x: -666,
//       y: 25,
//       z: 202,
//     },
//     radius: 320,
//     color: '#efad35',
//     opacity: 0.6,
//     speed: 1,
//   },
// ]
class RadarController {
  radarData: any
  group: THREE.Group
  effectGroup: THREE.Group
  time: { value: number }
  constructor(radarData: any) {
    this.radarData = radarData
    this.group = new THREE.Group()

    this.effectGroup = new THREE.Group()

    this.group.add(this.effectGroup)

    this.time = {
      value: 0,
    }

    this.init()
  }

  init() {
    // 加载扫描效果
    this.radarData.forEach(
      (data: {
        radius?: 50 | undefined
        color?: '#fff' | undefined
        speed?: 1 | undefined
        opacity?: 1 | undefined
        angle?: number | undefined
        position?: { x: number; y: number; z: number } | undefined
        rotation?: { x: number; y: number; z: number } | undefined
      }) => {
        const mesh = Radar(data)
        mesh.material.uniforms.time = this.time
        this.effectGroup.add(mesh)
      }
    )
  }

  animate = (dt: number) => {
    if (dt > 1) return false
    this.time.value += dt
  }
}

export default RadarController
