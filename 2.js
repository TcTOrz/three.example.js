/*
 * @Author: Li Jian
 * @Date: 2021-12-08 15:13:35
 * @LastEditTime: 2021-12-09 11:34:01
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js'

class MyThree {
  constructor() {
    this.renderer = null
    this.canvas = null
    this.camera = null
    this.scene = null
    this.light = null

    this.spread = 15 // 初始化模型的位置
    this.objects = []

    this.init()
  }

  init() {
    this.initRenderer() // 初始化渲染器
    this.initCamera() // 初始化相机
    this.initScene() // 初始化场景
    this.initLight() // 初始化光源
    // this.initMesh() // 初始化模型
  }

  // obj => Object3D
  addObject(x, y, obj) {
    obj.position.set(x * this.spread, y * this.spread, 0)
    this.scene.add(obj)
    this.objects.push(obj)
  }

  // 材质
  createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide, // 双面显示，性能相对较差
    })

    const hue = Math.random()
    material.color.setHSL(hue, 1, 0.5)
    return material
  }

  // 几何体
  addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, this.createMaterial())
    this.addObject(x, y, mesh)
  }

  // 各种Geometry
  // theFirstGeometry() {
  //   const geometry = new THREE.BoxGeometry(30, 30, 30)
  //   return geometry
  // }
  // 各种Material
  // theFirstMaterial(color) {
  //   const material = new THREE.MeshPhongMaterial({ color })
  //   return material
  // }
  // initMesh() {
  //   const geometry = this.theFirstGeometry()
  //   const material = this.theFirstMaterial('#ff0000')
  //   this.cube = new THREE.Mesh(geometry, material)
  //   this.scene.add(this.cube)
  //   this.renderer.render(this.scene, this.camera)
  // }

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
    // this.cube.rotation.x = time
    // this.cube.rotation.y = time
    this.objects.forEach((obj) => {
      obj.rotation.x = time
      obj.rotation.y = time
    })
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

const my = new MyThree()

const handle = async (ins) => {
  ins.addSolidGeometry(-2, 2, new THREE.BoxGeometry(8, 8, 8))
  ins.addSolidGeometry(0, 2, new THREE.CircleGeometry(8, 12))
  ins.addSolidGeometry(2, 2, new THREE.CircleGeometry(8, 12, 0, Math.PI * 1.5))
  ins.addSolidGeometry(-2, 0, new THREE.DodecahedronGeometry(8, 1))

  const loader = new FontLoader()
  function loadFont(url) {
    return new Promise((resolve, reject) => {
      loader.load(url, resolve, undefined, reject)
    })
  }

  const font = await loadFont(
    './node_modules/three/examples/fonts/helvetiker_regular.typeface.json'
  )
  const geometry = new TextGeometry('three.js', {
    font: font,
    size: 3.0,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.3,
    bevelSegments: 5,
  })
  ins.addSolidGeometry(0, 0, geometry)

  const mesh = new THREE.Mesh(geometry, ins.createMaterial())
  geometry.computeBoundingBox()
  geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1)
  const parent = new THREE.Object3D()
  parent.add(mesh)
  ins.addObject(2, 0, parent)

  ins.renderer.render(my.scene, my.camera)
}

window.addEventListener('resize', () => {
  my.init()
  handle(my)
})

handle(my)

requestAnimationFrame(my.render.bind(my))
