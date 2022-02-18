/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:20:16
 * @LastEditTime: 2022-02-18 16:33:55
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
  makeEvent,
  popup,
  popInstance,
  AddPoint,
  AddPointPopup,
} from '@shared'
import { MapInterface } from './type'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import _ from 'lodash'
import TWEEN from '@tweenjs/tween.js'
import chinaJson from '@assets/json/china.json'
import chinalocationJson from '@assets/json/chinalocation.json'

export default class CustomMap<T extends HTMLCanvasElement, Q extends HTMLDivElement>
  implements MapInterface
{
  canvas: T
  provinceCvs: T
  popElem: Q
  // pointPopElem
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  control!: OrbitControls
  clock: THREE.Clock
  // fileLoader: THREE.FileLoader
  recoverStates: Map<Object, Function>
  constructor(canvas: T, provinceCvs: T, popElem: Q) {
    this.canvas = canvas
    this.provinceCvs = provinceCvs
    this.popElem = popElem
    // this.pointPopElem = pointPopElem
    this.clock = new THREE.Clock()
    // this.fileLoader = new THREE.FileLoader()
    this.recoverStates = new Map()
    this.init()
    this.load()
    this.event()
    this.render()
  }
  init() {
    this.initRenderer() // renderer
    this.initScene() // scene
    this.initCamera() // camera
    this.initLight() // light
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
      [0, -35, 20]
    )
  }
  initLight() {
    const light = new THREE.DirectionalLight(0xb1e1ff, 1)
    light.position.set(1, 1, 2)
    light.target.position.set(0, 0, 0)
    this.scene.add(light)
    const light1 = new THREE.DirectionalLight(0xb1e1ff, 1)
    light1.position.set(-1, -1, -2)
    light1.target.position.set(0, 0, 0)
    this.scene.add(light1)
  }
  initControl() {
    const control = (this.control = new OrbitControls(this.camera, this.canvas))
    control.target.set(0, -20, 10)
    // control.target.set(0, 0, 0)
    control.enableDamping = true
    control.dampingFactor = 0.05
    control.rotateSpeed = 0.35
    control.maxDistance = 50
    control.minDistance = 20
    control.maxPolarAngle = Math.PI // (Math.PI / 4) * 3
    control.minPolarAngle = Math.PI / 2
    control.maxAzimuthAngle = Math.PI / 4
    control.minAzimuthAngle = -Math.PI / 4
  }
  async load() {
    await this.asyncMap() // 加载地图
    // 后期可能重写: 参照 - https://threejs.org/manual/#en/align-html-elements-to-3d
    this.asyncProvinceName() // 加载省份名称
    this.asyncFlyLine() // 加载飞线
    this.asyncRadarAndPoint() // 加载雷达和点
    this.asyncCityLight() // 加载城市灯光
  }
  private asyncCityLight() {
    // this.fileLoader.load('/json/chinalocation.json', data => {
    // 灯光相关的数据取自于
    // https://mapv.baidu.com/gl/examples/editor.html#point-china.html
    // const jsonData = JSON.parse(data as string)
    new AddCityLight(this, chinalocationJson)
    // })
  }
  private asyncRadarAndPoint() {
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
    new AddPoint(this, radarData)
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
  private asyncProvinceName() {
    new AddProvinceName(this)
  }
  private asyncMap() {
    return new Promise(resolve => {
      // this.fileLoader.load('/json/china.json', data => {
      // const jsonData = JSON.parse(data as string)
      new DrawMap(this.scene, chinaJson)
      resolve(true)
      // })
    })
  }
  addRecoverState(obj: Object, func: Function) {
    // 恢复状态保存
    this.recoverStates.set(obj, func)
  }
  recoverState() {
    // 恢复状态
    this.recoverStates.forEach(f => {
      f()
    })
  }
  event() {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let removeChangeControl = makeEvent(this.control, 'change', this.onMouseChange())
    let removeMoveEvent = makeEvent(this.canvas, 'mousemove', this.onMouseMove(raycaster, mouse))
    let removeClickEvent = makeEvent(this.canvas, 'click', this.onMouseClick(raycaster, mouse))
  }
  private getIntersectedObjects(raycaster: THREE.Raycaster, mouse: THREE.Vector2, event: any) {
    // (0 ~ 1) * 2 - 1 => -1 ~ 1
    mouse.x = (event.clientX / this.canvas.clientWidth) * 2 - 1
    // (-1 ~ 0) * 2 + 1 => -1 ~ 1 mouse.y = -mouse.y
    mouse.y = -(event.clientY / this.canvas.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, this.camera) // mouse must range from -1 to 1
    const intersectedObjects = raycaster.intersectObjects(this.scene.children)
    let currentObj: any
    if (intersectedObjects.length) {
      const o0 = intersectedObjects[0].object
      if (
        /* o0.type === 'province' || */
        o0.type === 'flyline' || // 飞线
        o0.type === 'radar' || // 雷达
        o0.type === 'point' || // 点
        new RegExp('pointPopup-*').test(o0.type) // 点弹窗
      ) {
        currentObj = o0
      } else {
        const o1 = o0.parent
        if (
          /* o1?.type === 'province' || */
          o1?.type === 'flyline' ||
          o1?.type === 'radar' ||
          o1?.type === 'point' ||
          new RegExp('pointPopup-*').test(o1?.type as string)
        ) {
          currentObj = o1
        } else {
          const o2 = o1?.parent
          if (
            /* o2?.type === 'province' || */
            o2?.type === 'flyline' ||
            o2?.type === 'radar' ||
            o2?.type === 'point' ||
            new RegExp('pointPopup-*').test(o2?.type as string)
          ) {
            currentObj = o2
          }
        }
      }
    }
    return currentObj
  }
  private onMouseClick(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return (event: any) => {
      const currentObj = this.getIntersectedObjects(raycaster, mouse, event)
      if (currentObj && currentObj.type === 'point') {
        new AddPointPopup(this, currentObj)
      } else if (currentObj && new RegExp('pointPopup-*').test(currentObj.type)) {
        const type = currentObj.type.split('-')[1]
        if (type === 'jump') {
          currentObj.userData.instance.jump() // jump
        }
        if (type === 'close') {
          currentObj.userData.instance.close(this, currentObj.uuid) // close
        }
      }
    }
  }
  private onMouseMove(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return _.debounce(
      (event: { clientX: number; clientY: number; path: { style: { cursor: string } }[] }) => {
        event.path[0].style.cursor = ''
        const popElem = this.popElem
        if (!popElem) return
        this.recoverState() // 恢复初始状态
        const currentObj = this.getIntersectedObjects(raycaster, mouse, event)
        // if (popInstance) popInstance.hide()
        if (currentObj && currentObj.type === 'flyline') {
          popup(event, popElem, currentObj.userData)
        }
        if (currentObj && currentObj.type === 'point') {
          event.path[0].style.cursor = 'pointer'
          currentObj.userData.point = {
            color: currentObj.material.color.getHex(),
          }
          this.addRecoverState(currentObj, () => {
            currentObj.material.color.setHex(currentObj.userData.point.color)
          })
          currentObj.material.color = new THREE.Color('#00796a')
        }
      },
      0
    )
  }
  private onMouseChange() {
    return () => {
      this.asyncProvinceName()
    }
  }
  render() {
    requestAnimationFrame(this.render.bind(this))
    TWEEN.update()
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
