/*
 * @Author: Li Jian
 * @Date: 2022-02-18 14:18:57
 * @LastEditTime: 2022-04-02 16:56:51
 * @LastEditors: Li Jian
 * @Description: 站点
 */
import { Ref, ref } from 'vue'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  makePerspectiveCamera,
  resizeRendererToDisplaySize,
  loadGltfModel,
  makeDom,
  makeEvent,
  eventFn,
  makeText,
  eventKeyDown,
} from '@/shared'
import siteBg from '@assets/image/site-bg.jpg?url'
import ElectricStation from '/blender/场景/ElectricStation.gltf?url'
import Cabinet from '/blender/柜子/scene.gltf?url'
import { SiteInterface } from './type'
import _ from 'lodash'
// import './testRxjs'

export default class Site<T extends HTMLCanvasElement> implements SiteInterface {
  canvas: T
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  control!: OrbitControls
  textureLoader: THREE.TextureLoader = new THREE.TextureLoader()
  // 自定义事件变量
  events: Array<Function> = []
  // removeEvent!: Function
  // removeEvent2!: Function
  removeEvent3!: Function
  // 标志位, 用于判断是否在房间内部
  isInRoom: Ref<Boolean> = ref(false)
  cameraPosition: THREE.Vector3Tuple = [-10, 5, 5]
  elemEnter!: HTMLDivElement
  elemLeave!: HTMLDivElement
  constructor(canvas: T) {
    this.canvas = canvas
    this.init()
    this.load()
    this.event()
    this.render()
    return this
  }
  init() {
    this.initRenderer()
    this.initScene()
    this.initCamera()
    this.initLight()
    this.initControl()
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
  }
  initScene() {
    this.scene = new THREE.Scene()
    this.textureLoader.load(siteBg, texture => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
      rt.fromEquirectangularTexture(this.renderer, texture)
      this.scene.background = rt.texture
    })
  }
  initCamera() {
    this.camera = makePerspectiveCamera(
      40,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000,
      this.cameraPosition
    )
  }
  initLight() {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    this.scene.add(light)
  }
  initControl() {
    const control = (this.control = new OrbitControls(this.camera, this.canvas))
    // control.target.set(0, -20, 10)
    control.target.set(0, 0, 0)
    control.enableDamping = true
    control.dampingFactor = 0.05
  }
  async load() {
    await loadGltfModel(this.scene, ElectricStation)
    await loadGltfModel(this.scene, Cabinet)
  }
  private getIntersectedObjects(raycaster: THREE.Raycaster, mouse: THREE.Vector2, event: any) {
    mouse.x = (event.clientX / this.canvas.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / this.canvas.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, this.camera)
    const intersectedObjects = raycaster.intersectObjects(this.scene.children)
    return intersectedObjects
  }
  private onMouseMove(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return _.debounce(event => {
      const currentObj = this.getIntersectedObjects(raycaster, mouse, event)
      if (currentObj.length && currentObj[0].object.name === '房顶1001') {
        console.log(currentObj)
        // console.log('房顶')
        // ;(currentObj[0].object as any).material.emissive.setHex(0xffffff)
        ;(currentObj[0].object as any).material.transparent = true
        ;(currentObj[0].object as any).material.alphaTest = 0.1
        // ;(currentObj[0].object as any).material.depthWrite = false
        ;(currentObj[0].object as any).material.opacity = 0.1
        // ;(currentObj[0].object as any).position.y = 5
        // ;(currentObj[0].object as any).material.visible = false
        // ;(currentObj[1].object as any).material.transparent = true
        // ;(currentObj[1].object as any).material.opacity = 0.15
        // ;(currentObj[2].object as any).material.transparent = true
        // ;(currentObj[2].object as any).material.opacity = 0.15
        // ;(currentObj[3].object as any).material.transparent = true
        // ;(currentObj[3].object as any).material.opacity = 0.15
      }
    }, 0)
  }
  event() {
    this.elemEnter = makeDom({ textContent: '进入', flag: 'enter' })
    this.elemLeave = makeDom({ textContent: '离开', flag: 'leave' })
    // 需要存储到localStorage中的数据,
    // 否则静态刷新无法获取到值从而影响事件的卸载。
    // <应该只影响开发环境>
    // use removeEvent() to remove event
    const removeEvent = makeEvent(
      this.elemEnter,
      'click',
      eventFn(this.isInRoom, this.scene, this.camera, this.control, this.cameraPosition)
    )
    const removeEvent2 = makeEvent(
      this.elemLeave,
      'click',
      eventFn(this.isInRoom, this.scene, this.camera, this.control, this.cameraPosition)
    )
    this.events.push(removeEvent, removeEvent2)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const removeMouseMoveEvent = makeEvent(
      this.canvas,
      'mousemove',
      this.onMouseMove(raycaster, mouse)
    )
    this.events.push(removeMouseMoveEvent)
  }
  render() {
    requestAnimationFrame(this.render.bind(this))
    if (resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }
    makeText(this.canvas, this.camera, this.scene, this.elemEnter)
    makeText(this.canvas, this.camera, this.scene, this.elemLeave)
    TWEEN.update()
    this.control.update()
    this.renderer.render(this.scene, this.camera)
    // this.renderer.sortObjects = true
  }
  move() {
    if (this.isInRoom.value) {
      console.log('enter the room')
      this.removeEvent3 = makeEvent(window, 'keydown', eventKeyDown(this.camera, this.control))
    } else {
      // 清除掉之前的事件
      console.log('leave the room')
      this.removeEvent3 && this.removeEvent3()
    }
  }
  dispose() {
    // this.removeEvent && this.removeEvent()
    // this.removeEvent2 && this.removeEvent2()
    this.events.forEach(fn => fn())
    this.events = []
    this.removeEvent3 && this.removeEvent3()
    this.renderer.dispose()
    this.scene.children = []
  }
}
