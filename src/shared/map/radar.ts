/*
 * @Author: Li Jian
 * @Date: 2022-02-11 09:52:16
 * @LastEditTime: 2022-02-11 10:29:58
 * @LastEditors: Li Jian
 */
import { geoMercator, RadarController } from '@shared'
import { RadarInterface } from './type'

export let radar: RadarController

export default class Radar implements RadarInterface {
  scene: THREE.Scene
  data: any[]
  constructor(ins: any, data: any[]) {
    this.scene = ins.scene
    this.data = data
    this.draw()
  }
  draw() {
    const data = this.data
    const mercator = geoMercator()
    data.map((elem: any) => {
      const pos = mercator(elem.position)
      elem.position = {
        x: pos[0],
        y: -pos[1],
        z: 2.21,
      }
    })
    // @ts-ignore
    radar = new RadarController(data)
    this.scene.add(radar.group)
  }
}
