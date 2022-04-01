/*
 * @Author: Li Jian
 * @Date: 2022-03-31 10:43:37
 * @LastEditTime: 2022-03-31 16:31:51
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { geoMercator } from '@shared'

export default class DrawNewMap {
  scene: THREE.Scene
  nation: any
  // nationMap: any
  constructor(scene: THREE.Scene, nation: any /*nationMap: any*/) {
    this.scene = scene
    this.nation = nation
    // this.nationMap = nationMap
    this.draw()
  }
  private getProterties(obj: any) {
    return obj.collection.geometries[0].properties
  }
  private addShape(d: any) {
    const shapes: any[] = []
    d.map((item: any, index: number) => {
      let shape = new THREE.Shape()
      item.map((i: any, idx: number) => {
        if (idx === 0) {
          shape.moveTo(i[0], -i[1])
        } else {
          shape.lineTo(i[0], -i[1])
        }
      })
      shapes.push(shape)
    })
    return shapes
  }
  private addMesh(shape: THREE.Shape | THREE.Shape[] | undefined) {
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
  private addLine(obj: THREE.Object3D<THREE.Event>, d: any[]) {
    d.map((item, index) => {
      const points: THREE.Vector3[] = []
      item.map((i: any, idx: number) => {
        points.push(new THREE.Vector3(i[0], -i[1], 2))
      })
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0x445f8f })
      )
      obj.add(line)
    })
  }
  draw() {
    const nation = this.nation
    // const nationMap = this.nationMap
    // 首先画出中国轮廓
    if (!nation.parent) {
      const { payload } = nation
      const proterties = this.getProterties(payload.objects)
      const centroid = proterties.centroid
      const mercatorTrans = geoMercator(centroid)
      if (!payload.mercator) {
        payload.mercator = []
        // 存储转换后的位置坐标
        payload.arcs.map((item: Array<Array<number>>) => {
          const ary: Array<Array<number>> = []
          item.map(it => {
            ary.push(mercatorTrans(it))
          })
          payload.mercator.push(ary)
        })
      }
      const grp = new THREE.Group()
      // let shape = new THREE.Shape()
      const shapes = this.addShape(payload.mercator)
      this.addLine(grp, payload.mercator)
      shapes.map(shape => {
        const mesh = this.addMesh(shape)
        // this.addLine(mesh, payload.mercator)
        grp.add(mesh)
      })
      this.scene.add(grp)
    }
    // console.log(this.nation, this.nationMap)
  }
}
