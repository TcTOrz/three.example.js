/*
 * @Author: Li Jian
 * @Date: 2022-02-11 10:17:13
 * @LastEditTime: 2022-02-17 14:37:40
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { geoMercator } from '@shared'
import { CityLightInterface, MapInterface } from './type'

export default class CityLight implements CityLightInterface {
  scene: THREE.Scene
  jsonData: any
  constructor(ins: MapInterface, jsonData: any) {
    this.scene = ins.scene
    this.jsonData = jsonData
    this.draw()
  }
  draw() {
    const jsonData = this.jsonData
    const postions: number[] = []
    const colors: number[] = []
    const data2 = jsonData[2]
    const mercatorTrans = geoMercator()
    data2.map((v: { geoCoord: Array<number> }) => {
      const data = v.geoCoord
      const [x, y] = mercatorTrans(data)
      postions.push(x, -y, 1)
      colors.push(255, 255, 0)
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(postions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeBoundingSphere()
    const material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true })
    const points = new THREE.Points(geometry, material)
    this.scene.add(points)
  }
}
