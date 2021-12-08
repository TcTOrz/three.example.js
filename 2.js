/*
 * @Author: Li Jian
 * @Date: 2021-12-08 15:13:35
 * @LastEditTime: 2021-12-08 16:34:10
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'

class MyThree {
  constructor() {
    this.renderer = null
    this.canvas = null
    this.camera = null
    this.scene = null
    this.light = null
    this.init()
  }

  init() {
    this.initRenderer() // 初始化渲染器
    this.initCamera() // 初始化相机
    this.initScene() // 初始化场景
    this.initLight() // 初始化光源
    this.initMesh() // 初始化模型
  }

  // 各种Geometry
  theFirstGeometry() {
    const geometry = new THREE.BoxGeometry(30, 30, 30)
    return geometry
  }

  // 各种Material
  theFirstMaterial(color) {
    const material = new THREE.MeshPhongMaterial({ color })
    return material
  }

  initMesh() {
    const geometry = this.theFirstGeometry()
    const material = this.theFirstMaterial('#ff0000')
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.renderer.render(this.scene, this.camera)
  }

  initLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 1)
    this.light.position.set(0, 0, 50)
    this.scene.add(this.light)
  }

  initScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xaaaaaa)
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      40,
      this.canvas.clientWidth / this.canvas.clientHeight,
      1,
      1000
    )
    this.camera.position.set(0, 0, 120)
  }

  initRenderer() {
    this.canvas = document.querySelector('#c')
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.canvas = this.renderer.domElement
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // document.body.appendChild(this.canvas)
  }

  resizeRendererToDisplaySize() {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    const needResize =
      this.canvas.width !== width || this.canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  render(time) {
    time *= 0.001
    // if (this.resizeRendererToDisplaySize(this.renderer)) {
    //   this.camera.updateProjectionMatrix()
    // }
    this.cube.rotation.x = time
    this.cube.rotation.y = time
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

const my = new MyThree()
requestAnimationFrame(my.render.bind(my))

window.addEventListener('resize', () => {
  my.init()
})
