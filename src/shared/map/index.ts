/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:20:16
 * @LastEditTime: 2022-02-11 10:32:22
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import {
  makePerspectiveCamera,
  resizeRendererToDisplaySize,
  DrawMap,
  AddProvinceName,
  AddFlyLine,
  flyLines,
  AddRadar,
  radar,
  AddCityLight,
} from '@shared'
import { MapInterface } from './type'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Map implements MapInterface {
  canvas
  provinceCvs
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  control!: OrbitControls
  clock: THREE.Clock
  fileLoader: THREE.FileLoader
  constructor(canvas: HTMLCanvasElement, provinceCvs: HTMLCanvasElement) {
    this.canvas = canvas
    this.provinceCvs = provinceCvs
    this.clock = new THREE.Clock()
    this.fileLoader = new THREE.FileLoader()
    this.init()
    this.load()
    this.event()
    this.render()
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
      new AddProvinceName(this) // 加载省份名称
    })
  }
  async load() {
    await this.asyncMap() // 加载地图
    new AddProvinceName(this) // 加载省份名称
    this.asyncFlyLine() // 加载飞线
    this.asyncRadar() // 加载雷达
    this.asyncCityLight() // 加载城市灯光
  }
  private asyncCityLight() {
    this.fileLoader.load('/json/chinalocation.json', data => {
      // 灯光相关的数据取自于
      // https://mapv.baidu.com/gl/examples/editor.html#point-china.html
      const jsonData = JSON.parse(data as string)
      new AddCityLight(this, jsonData)
    })
  }
  private asyncRadar() {
    // 后台加载数据
    const radarData = [
      {
        position: [121.48941, 31.40527],
        radius: 4,
        color: '#0000ff',
        opacity: 1,
        speed: 4,
      },
      {
        position: [91.13775, 29.65262],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
      {
        position: [116.23128, 40.22077],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
      {
        position: [113.6401, 34.72468],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
      {
        position: [113.88308, 22.55329],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
      {
        position: [81.32416, 43.91689],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
      {
        position: [126.95717, 45.54774],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
      {
        position: [112.29162, 3.981086],
        radius: 3,
        color: '#ff0000',
        opacity: 0.5,
        speed: 2,
      },
    ]
    new AddRadar(this, radarData)
  }
  private asyncFlyLine() {
    // 后台加载数据
    const flylines = [
      {
        name: '光缆0',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [91.13775, 29.65262],
        ],
      },
      {
        name: '光缆1',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [116.23128, 40.22077],
        ],
      },
      {
        name: '光缆2',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [113.6401, 34.72468],
        ],
      },
      {
        name: '光缆3',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [113.88308, 22.55329],
        ],
      },
      {
        name: '光缆4',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [81.32416, 43.91689],
        ],
      },
      {
        name: '光缆5',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [126.95717, 45.54774],
        ],
      },
      {
        name: '光缆6',
        info: '一些测试信息',
        path: [
          [121.48941, 31.40527],
          [112.29162, 3.981086],
        ],
      },
    ]
    flylines.forEach(flyline => {
      new AddFlyLine(this, flyline)
    })
  }
  private asyncMap() {
    return new Promise(resolve => {
      this.fileLoader.load('/json/china.json', data => {
        const jsonData = JSON.parse(data as string)
        new DrawMap(this.scene, jsonData)
        resolve(true)
      })
    })
  }
  event() {}
  render() {
    requestAnimationFrame(this.render.bind(this))
    if (resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.canvas
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }
    this.control.update()
    flyLines.length &&
      flyLines.map(f => {
        f.update()
      })
    const dt = this.clock.getDelta()
    radar && radar.animate(dt)
    this.renderer.render(this.scene, this.camera)
  }
}
