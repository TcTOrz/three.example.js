/*
 * @Author: Li Jian
 * @Date: 2022-02-14 09:39:47
 * @LastEditTime: 2022-03-22 16:03:24
 * @LastEditors: Li Jian
 * @description: 点UI
 */
import { geoMercator } from '@shared'
import _ from 'lodash'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { PointInterface, MapInterface } from './type'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import SiteUrl from '/blender/Icon/ESicon.gltf?url'

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
    let group = new THREE.Group()
    const loader = new GLTFLoader()
    const height = 1.5
    loader.load(SiteUrl, gltf => {
      const model = gltf.scene
      model.scale.set(15, 15, 15)
      model.rotateX(Math.PI / 2)
      data.map((elem: any) => {
        const pos = mercator(elem.position)
        // const g = model.clone() as THREE.Group
        const g = model.clone() as THREE.Group
        const position = {
          x: pos[0],
          y: -pos[1],
          z: 2.21 + height / 2,
        } as THREE.Vector3
        g.position.set(position.x, position.y, position.z)
        const color = elem.color
        g.children.map((child: any, idx: number) => {
          if (child.material) {
            // note: 这里材质也需要clone一份，否则会导致材质问题。
            // @ts-ignore
            // child.material = model.children[idx].material.clone()
            // child.material.emissive = new THREE.Color(color)
            child.material = new THREE.MeshPhongMaterial({
              side: THREE.DoubleSide,
              color,
              emissive: new THREE.Color(color),
              emissiveIntensity: 0.2,
              shininess: 50,
            })
          }
        })
        // @ts-ignore
        g.type = 'point'
        g.userData = elem
        group.add(g)
        this.createTweenFromCone(position, g, height)
      })
      group.name = 'point-group'
      this.scene.add(group)
    })
    // data.map((elem: any) => {
    //   const pos = mercator(elem.position)
    //   const height = 1.5 // 3
    //   const position = {
    //     x: pos[0],
    //     y: -pos[1],
    //     z: 2.21 + height / 2,
    //   } as THREE.Vector3
    //   const radius = 0.5 // 1
    //   const radialSegments = 32
    //   const geometry = new THREE.ConeBufferGeometry(radius, height, radialSegments)
    //   const material = new THREE.MeshPhongMaterial({
    //     color: elem.color, // 0x90e0ef,
    //     shininess: 50,
    //   })
    //   const mesh = new THREE.Mesh(geometry, material)
    //   mesh.position.set(position.x, position.y, position.z)
    //   mesh.rotateX(-Math.PI / 2)
    //   mesh.type = 'point'
    //   mesh.userData = elem
    //   group.add(mesh)
    //   this.createTweenFromCone(position, mesh, height)
    // })
    // group.name = 'point-group'
    // this.scene.add(group)
    // 画圆环
    group = new THREE.Group()
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
      group.add(mesh)
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
      group.add(mesh)
    })
    group.name = 'point-circle-group'
    this.scene.add(group)
  }
  createTweenFromCone(position: THREE.Vector3, mesh: THREE.Mesh | THREE.Group, height: number) {
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
