/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:20:16
 * @LastEditTime: 2022-02-10 16:46:23
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { makePerspectiveCamera, resizeRendererToDisplaySize, DrawMap, ProvinceName } from '@shared'
import { MapInterface } from './type'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Map implements MapInterface {
  canvas
  provinceCvs
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  control!: OrbitControls

  constructor(canvas: HTMLCanvasElement, provinceCvs: HTMLCanvasElement) {
    this.canvas = canvas
    this.provinceCvs = provinceCvs
    this.init()
    this.load()
    this.render()
    return this
  }
  init() {
    this.initRenderer() // renderer
    this.initScene() // scene
    this.initCamera() // camera
    this.initControl() // control
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true, // 抗锯齿
      alpha: true, // 透明缓冲区
    })
  }
  initScene() {
    const scene = (this.scene = new THREE.Scene())
    scene.background = new THREE.Color('black')
  }
  initCamera() {
    this.camera = makePerspectiveCamera(
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000,
      [0, 0, 50]
    )
  }
  initControl() {
    const controls = (this.control = new OrbitControls(this.camera, this.canvas))
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.rotateSpeed = 0.35
    controls.maxDistance = 50
    controls.minDistance = 20
    controls.maxPolarAngle = (Math.PI / 4) * 3
    controls.minPolarAngle = Math.PI / 2
    controls.maxAzimuthAngle = Math.PI / 4
    controls.minAzimuthAngle = -Math.PI / 4
    controls.addEventListener('change', () => {
      ProvinceName(this) // 加载省份名称
      //   // ProvinceName(this.provinceCvs, this.scene.getObjectByName('nation'), this.camera) // 加载省份名称
    })
  }
  async load() {
    await this.asyncMap() // 加载地图
    ProvinceName(this) // 加载省份名称
    // ProvinceName(this.provinceCvs, this.scene.getObjectByName('nation'), this.camera) // 加载省份名称
  }
  asyncMap() {
    const loader = new THREE.FileLoader()
    return new Promise(resolve => {
      loader.load('/json/china.json', data => {
        const jsonData = JSON.parse(data as string)
        new DrawMap(this.scene, jsonData)
        resolve(true)
      })
    })
  }
  render() {
    requestAnimationFrame(this.render.bind(this))
    if (resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.canvas
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }
    this.control.update()
    this.renderer.render(this.scene, this.camera)
  }
}

export default Map
