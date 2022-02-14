/*
 * @Author: Li Jian
 * @Date: 2022-02-14 09:39:47
 * @LastEditTime: 2022-02-14 11:34:34
 * @LastEditors: Li Jian
 * @description: 点UI
 */
import { geoMercator } from '@shared'
import _ from 'lodash'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { PointInterface } from './type'

export default class Point implements PointInterface {
  scene: THREE.Scene
  data: any[]
  constructor(ins: any, data: any[]) {
    this.scene = ins.scene
    this.data = data
    this.draw()
  }
  draw() {
    const data = _.cloneDeep(this.data)
    const mercator = geoMercator()
    data.map((elem: any) => {
      const pos = mercator(elem.position)
      const height = 3
      const position = {
        x: pos[0],
        y: -pos[1],
        z: 2.21 + height / 2,
      }
      const radius = 1
      const radialSegments = 32
      const geometry = new THREE.ConeBufferGeometry(radius, height, radialSegments)
      const material = new THREE.MeshPhongMaterial({
        color: 0x90e0ef,
        shininess: 50,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(position.x, position.y, position.z)
      mesh.rotateX(-Math.PI / 2)
      mesh.type = 'point'
      mesh.userData = elem
      this.scene.add(mesh)
      this.createTween(position, mesh, height)
    })
  }
  createTween(position: any, mesh: THREE.Mesh, height: number) {
    new TWEEN.Tween({
      x: position.x,
      y: position.y,
      z: position.z,
    })
      .to(
        {
          x: position.x,
          y: position.y,
          z: position.z + height / 2,
        },
        Math.random() * 300 + 500
      ) // 随机延时任意时间(800ms)，防止动画重叠
      .onUpdate(object => {
        mesh.position.set(object.x, object.y, object.z)
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        this.createTween1(position, mesh, height)
      })
  }
  createTween1(position: any, mesh: THREE.Mesh, height: number) {
    new TWEEN.Tween({
      x: position.x,
      y: position.y,
      z: position.z + height / 2,
    })
      .to(
        {
          x: position.x,
          y: position.y,
          z: position.z,
        },
        Math.random() * 300 + 300
      ) // 随机延时任意时间(600ms)，防止动画重叠
      .onUpdate(object => {
        mesh.position.set(object.x, object.y, object.z)
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        this.createTween(position, mesh, height)
      })
  }
}
