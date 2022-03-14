/*
 * @Author: Li Jian
 * @Date: 2022-02-11 09:22:34
 * @LastEditTime: 2022-03-14 10:46:51
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
  flyLine: any // { name?: string; info?: string; path: any }
  constructor(ins: MapInterface, flyline: any) {
    this.scene = ins.scene
    this.flyLine = flyline
    this.draw()
  }
  drawVirtualLines2(mercator: (arg0: any) => [any, any], flylines: any) {
    // console.log(flylines)
    let mercatorPath: any[] = []
    flylines.map((elem: any, idx: number) => {
      const [startX, startY] = mercator(elem.start)
      const [endX, endY] = mercator(elem.end)
      if (idx === 0) {
        mercatorPath.push(new THREE.Vector3(startX, -startY, 2.21))
        mercatorPath.push(new THREE.Vector3(endX, -endY, 2.21))
        const mx = (mercatorPath[idx].x + mercatorPath[idx + 1].x) / 2
        const my = (mercatorPath[idx].y + mercatorPath[idx + 1].y) / 2
        let mz = Math.sqrt(elem.end[0] * elem.start[0] + elem.end[1] * elem.start[1]) / 100 + 2.21
        mercatorPath.splice(idx + 1, 0, new THREE.Vector3(mx, my, mz))
      }
      mercatorPath.push(new THREE.Vector3(endX, -endY, 2.21))
      const mx =
        (mercatorPath[mercatorPath.length - 2].x + mercatorPath[mercatorPath.length - 1].x) / 2
      const my =
        (mercatorPath[mercatorPath.length - 2].y + mercatorPath[mercatorPath.length - 1].y) / 2
      let mz = Math.sqrt(elem.end[0] * elem.start[0] + elem.end[1] * elem.start[1]) / 100 + 2.21
      mercatorPath.splice(mercatorPath.length - 1, 0, new THREE.Vector3(mx, my, mz))
    })
    mercatorPath = mercatorPath.reverse()
    const curve = new THREE.CatmullRomCurve3(mercatorPath)
    const points = curve.getPoints(500)
    const geometry = new LineGeometry()
    geometry.setPositions(points.map(item => [item.x, item.y, item.z]).flat())
    const material = new LineMaterial({
      color: 0x03045e,
      linewidth: 0,
    })
    const curveObject = new Line2(geometry, material)
    lines2.push(curveObject)
    return curve
  }
  drawLines2(mercator: (arg0: any) => [any, any], flyline: any) {
    const mercatorPath = flyline.path.map((elem: any, idx: number) => {
      const [x, y] = mercator(elem)
      if (
        (flyline.length && flyline.idx === 0 && idx === 1) ||
        (flyline.length && flyline.idx === flyline.length - 1 && idx === 0) ||
        !flyline.length
      ) {
        // 这里表示不是中间的点，两端的点
        return new THREE.Vector3(x, -y, 2.21)
      }
      return new THREE.Vector3(x, -y, 2.21)
    })
    const mx = (mercatorPath[0].x + mercatorPath[1].x) / 2
    const my = (mercatorPath[0].y + mercatorPath[1].y) / 2
    let mz =
      Math.sqrt(flyline.path[0][0] * flyline.path[1][0] + flyline.path[0][1] * flyline.path[1][1]) /
        30 +
      2.21
    if (flyline.length) {
      mz =
        Math.sqrt(
          flyline.path[0][0] * flyline.path[1][0] + flyline.path[0][1] * flyline.path[1][1]
        ) /
          100 +
        2.21
    }
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
    curveObject.userData = {
      type: 'curveLine',
      // path: flyline.path,
      // info: flyline,
      ...flyline,
    }
    curveObject.type = 'curveLine'
    lines2.push(curveObject)
    return curve
  }
  drawTheFlyLine(curve: any, flyline: any) {
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
  draw() {
    const flyline = this.flyLine
    const mercator = geoMercator()
    let curve = this.drawLines2(mercator, flyline)
    // if (flyline.length && flyline.idx === 0) {
    //   let curve = this.drawVirtualLines2(mercator, flyline.children)
    //   this.drawTheFlyLine(curve, flyline)
    // }
    this.drawTheFlyLine(curve, flyline)
    if (flyline.length) {
      // TODO 加point
    }
  }
}
