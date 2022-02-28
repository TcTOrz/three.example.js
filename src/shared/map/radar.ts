/*
 * @Author: Li Jian
 * @Date: 2022-02-11 09:52:16
 * @LastEditTime: 2022-02-28 08:59:19
 * @LastEditors: Li Jian
 */
import { geoMercator, RadarController } from '@shared'
import { RadarInterface, MapInterface } from './type'
import _ from 'lodash'

export let radar: RadarController

export default class Radar implements RadarInterface {
  scene: THREE.Scene
  data: any[]
  constructor(ins: MapInterface, data: any[]) {
    this.scene = ins.scene
    this.data = data
    this.draw()
  }
  draw() {
    const data = _.cloneDeep(this.data)
    const mercator = geoMercator()
    data.map((elem: any) => {
      const pos = mercator(elem.position)
      elem.position = {
        x: pos[0],
        y: -pos[1],
        z: 2.21,
      }
    })
    radar = new RadarController(data)
    radar.group.name = 'radar-group'
    this.scene.add(radar.group)
  }
}
