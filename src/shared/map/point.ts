/*
 * @Author: Li Jian
 * @Date: 2022-02-14 09:39:47
 * @LastEditTime: 2022-02-22 14:49:53
 * @LastEditors: Li Jian
 * @description: 点UI
 */
import { geoMercator } from '@shared'
import _ from 'lodash'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { PointInterface, MapInterface } from './type'

export default class Point implements PointInterface {
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
    // 画锥形体
    data.map((elem: any) => {
      const pos = mercator(elem.position)
      const height = 3
      const position = {
        x: pos[0],
        y: -pos[1],
        z: 2.21 + height / 2,
      } as THREE.Vector3
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
      this.createTweenFromCone(position, mesh, height)
    })
    // 画圆环
    data.map((elem: any) => {
      const pos = mercator(elem.position)
      const position = {
        x: pos[0],
        y: -pos[1],
        z: 2.21,
      } as THREE.Vector3
      let geometry: THREE.CircleBufferGeometry | THREE.RingBufferGeometry =
        new THREE.CircleBufferGeometry(0.4, 200)
      let material = new THREE.MeshPhongMaterial({
        color: 0x90e0ef,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      })
      let mesh: THREE.Mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(position.x, position.y, position.z)
      this.scene.add(mesh)
      geometry = new THREE.RingBufferGeometry(0.4, 0.6, 50)
      material = new THREE.MeshPhongMaterial({
        color: 0x90e0ef,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
      mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(position.x, position.y, position.z)
      this.createTweenFromCircle(mesh)
      this.scene.add(mesh)
    })
  }
  createTweenFromCone(position: THREE.Vector3, mesh: THREE.Mesh, height: number) {
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
        // this.createTweenFromCone1(position, mesh, height)
      })
      .repeat(Infinity)
      .yoyo(true)
  }
  createTweenFromCircle(mesh: THREE.Mesh) {
    new TWEEN.Tween({
      x: mesh.scale.x,
      y: mesh.scale.y,
      z: mesh.scale.z,
    })
      .to(
        {
          x: mesh.scale.x * 1.3,
          y: mesh.scale.y * 1.3,
          z: mesh.scale.z * 1.3,
        },
        800
      )
      .onUpdate(object => {
        mesh.scale.set(object.x, object.y, object.z)
        // @ts-ignore
        mesh.material.opacity = 1.5 - object.z
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        // this.createTweenFromCircle1(mesh)
      })
      .repeat(Infinity)
      .yoyo(true)
  }
}
