/*
 * @Author: Li Jian
 * @Date: 2022-02-10 11:11:10
 * @LastEditTime: 2022-03-31 09:29:31
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { DrawMapInterface } from './type'
import { geoMercator } from '@shared'

export default class DrawMap implements DrawMapInterface {
  scene: THREE.Scene
  jsonData: { features: any[]; type: string }
  constructor(scene: THREE.Scene, jsonData: { features: any[]; type: string }) {
    this.scene = scene
    this.jsonData = jsonData
    this.draw()
    return this
  }
  recursionProvince(ary: any[], mercatorTrans: (arg0: any) => any, ret: any[]) {
    if (ary.length === 2 && typeof ary[0] === 'number' && typeof ary[1] === 'number') {
      ret.push(mercatorTrans(ary))
    } else if (Array.isArray(ary)) {
      ary.forEach((item: any, idx: number) => {
        ret.push([])
        this.recursionProvince.call(this, item, mercatorTrans, ret[idx])
      })
    }
  }
  drawProvince(data: any[], properties: any, province: THREE.Object3D<THREE.Event>) {
    function addMesh(shape: THREE.Shape | THREE.Shape[] | undefined) {
      const extrudeSettings = {
        depth: 2,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const material = new THREE.MeshPhongMaterial({
        color: 0x2c448b,
        transparent: true,
        opacity: 0.3,
        emissive: 0x2c448b,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(geometry, material)
      return mesh
    }
    // 可以内嵌到dataLoop函数中，虽然浪费了一些性能，但是这样比较清晰，更好理解
    function addLine(obj: THREE.Object3D<THREE.Event>, d: any[]) {
      d.map((item, index) => {
        const points: THREE.Vector3[] = []
        item.map((i: number[][], idx: number) => {
          points.push(new THREE.Vector3(i[index][0], -i[index][1], 2))
        })
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color: 0x445f8f })
        )
        obj.add(line)
      })
    }
    function dataLoop(shape: THREE.Shape, d: any[]) {
      d.map((item, index) => {
        item.map((i: number[][], idx: number) => {
          if (idx === 0) {
            shape.moveTo(i[index][0], -i[index][1])
          }
          shape.lineTo(i[index][0], -i[index][1])
        })
      })
    }
    // 一般数组嵌套就两种情况，没必要写递归，但是写法丑了点
    // 不是数组说明就以整块地，是数组说明有飞地。
    // 内蒙古自治区没有飞地
    if (!Array.isArray(data[0][0][0][0])) {
      let shape = new THREE.Shape()
      dataLoop(shape, data)
      const mesh = addMesh(shape)
      addLine(province, data)
      province.add(mesh)
      province.name = properties.name
      province.userData = properties
    } else {
      const obj = new THREE.Object3D()
      data.map(d => {
        let shape = new THREE.Shape()
        dataLoop(shape, d)
        const mesh = addMesh(shape)
        addLine(obj, d)
        obj.add(mesh)
      })
      province.add(obj)
      province.name = properties.name
      province.userData = properties
    }
  }
  draw() {
    const nation = new THREE.Group() // 国家
    nation.name = 'nation'
    const mercatorTrans = geoMercator()
    this.jsonData.features.forEach(feature => {
      const province = new THREE.Object3D() // 省
      const { geometry, properties } = feature
      const { coordinates } = geometry
      const ret: never[] = []
      // 经纬度转换成墨卡托
      this.recursionProvince(coordinates, mercatorTrans, ret)
      this.drawProvince(ret, properties, province)
      province.type = 'province'
      nation.add(province)
    })
    this.scene.add(nation)
  }
}
