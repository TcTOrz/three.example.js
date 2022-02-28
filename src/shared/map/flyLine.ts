/*
 * @Author: Li Jian
 * @Date: 2022-02-11 09:22:34
 * @LastEditTime: 2022-02-28 10:05:42
 * @LastEditors: Li Jian
 * @Description: 加载飞线
 */
import { geoMercator, FlyLine as TheFlyLine } from '@shared'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { FlyLineInterface, MapInterface } from './type'

export const flyLines: TheFlyLine[] = []
export const lines2: Line2[] = []

export default class FlyLine implements FlyLineInterface {
  scene: THREE.Scene
  flyLine: { name?: string; info?: string; path: any }
  constructor(ins: MapInterface, flyline: { name?: string; info?: string; path: any }) {
    this.scene = ins.scene
    this.flyLine = flyline
    this.draw()
  }
  draw() {
    const flyline = this.flyLine
    const scene = this.scene
    const mercator = geoMercator()
    const mercatorPath = this.flyLine.path.map((elem: any) => {
      const [x, y] = mercator(elem)
      return new THREE.Vector3(x, -y, 2.21)
    })
    const mx = (mercatorPath[0].x + mercatorPath[1].x) / 2
    const my = (mercatorPath[0].y + mercatorPath[1].y) / 2
    const mz =
      Math.sqrt(flyline.path[0][0] * flyline.path[1][0] + flyline.path[0][1] * flyline.path[1][1]) /
        30 +
      2.21
    mercatorPath.splice(1, 0, new THREE.Vector3(mx, my, mz))
    const curve = new THREE.CatmullRomCurve3(mercatorPath)
    const points = curve.getPoints(50)
    const geometry = new LineGeometry()
    geometry.setPositions(points.map(item => [item.x, item.y, item.z]).flat())
    const material = new LineMaterial({
      color: 0x03045e,
      linewidth: 0.002,
    })
    const curveObject = new Line2(geometry, material)
    lines2.push(curveObject)
    // @ts-ignore
    let flyLine = new TheFlyLine(curve, {
      color: 0x90e0ef,
      segFlag: true,
    })
    flyLine.userData = {
      type: 'flyline',
      path: flyline.path,
      info: flyline.info,
      name: flyline.name,
    }
    flyLine.type = 'flyline'
    flyLines.push(flyLine)
  }
}
