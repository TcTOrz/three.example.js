/*
 * @Author: Li Jian
 * @Date: 2022-02-18 14:18:57
 * @LastEditTime: 2022-04-25 15:24:18
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
  compass,
} from '@/shared'
import siteBg from '@assets/image/site-bg.jpg?url'
import ElectricStation from '/blender/场景/ElectricStation.gltf?url'
import Cabinet from '/blender/柜子/scene.gltf?url'
import { SiteInterface } from './type'
import _ from 'lodash'
// import './testRxjs'
import rainBg from '@assets/image/background.jpg'

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
  cameraPosition: THREE.Vector3Tuple = [40, 30, 0]
  elemEnter!: HTMLDivElement
  elemLeave!: HTMLDivElement
  reductionStack: Array<THREE.Mesh> = []
  constructor(canvas: T) {
    this.canvas = canvas
    this.init()
    this.load()
    this.event()
    this.render()
    import.meta.env.PROD ? undefined : this.addHelper()
    return this
  }
  addHelper() {
    const axesHelper = new THREE.AxesHelper(30)
    this.scene.add(axesHelper)
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
    // control.enablePan = false
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
  //通过x,y,z指定旋转中心，obj是要旋转的对象
  changePivot(x: number, y: number, z: number, obj: THREE.Object3D<THREE.Event>) {
    let wrapper = new THREE.Object3D()
    wrapper.position.set(x, y, z)
    wrapper.add(obj)
    obj.position.set(-x, -y, -z)
    return wrapper
  }
  private onMouseMove(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return _.debounce(event => {
      this.reductionStack.forEach(mesh => {
        mesh.material = (mesh as any).oldMaterial.clone()
      })
      const currentObj = this.getIntersectedObjects(raycaster, mouse, event)
      if (currentObj.length && currentObj[0].object.name === '房顶1001') {
        ;(currentObj[0].object as any).oldMaterial = (currentObj[0].object as any).material.clone()
        // 透明
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
        })
        ;(currentObj[0].object as any).material = material
        this.reductionStack.push(currentObj[0].object as THREE.Mesh)
        // ----
        // 边框
        // const edge = new THREE.EdgesGeometry(currentObj[0].object.geometry)
        // const line = new THREE.LineSegments(
        //   edge,
        //   new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })
        // )
        // currentObj[0].object.add(line)
        // ----
        // 高亮
        // const material = new THREE.MeshBasicMaterial({
        //   color: 0xffff00,
        // })
        // ;(currentObj[0].object as any).material = material
        // this.reductionStack.push(currentObj[0].object as THREE.Mesh)
        // 材质
        // const texture = this.textureLoader.load(rainBg)
        // const material = new THREE.MeshPhongMaterial({
        //   map: texture,
        // })
        // ;(currentObj[0].object as any).material = material
        // this.reductionStack.push(currentObj[0].object as THREE.Mesh)
        // ----
        // ----
        // let center = new THREE.Box3().setFromObject(currentObj[0].object)
        // const group = new THREE.Group()
        // group.add(currentObj[0].object.clone())
        // currentObj[0].object = group
        // this.scene.add(group)
        // this.scene.add(group)
        // currentObj[0].object.children.push(group)
        console.log(currentObj[0].object)
        // currentObj[0].object.add(group)
        // currentObj[0].object.parent?.children.push(group)
        // currentObj[0].object.parent?.add(group)
        // currentObj[0].parent.add(group)
        // currentObj[0].object.translateY((center.max.y - center.min.y) / 2)
        // currentObj[0].object.translateZ((center.max.z - center.min.z) / 2)
        // console.log(currentObj[0].object, center)
        // currentObj[0].object.position.set(-7.203174591064453, 0, -7.856262683868408)
        // 移动
        // new TWEEN.Tween({
        //   x: currentObj[0].object.rotation.x,
        // })
        //   .to(
        //     {
        //       x: Math.PI / 2,
        //     },
        //     1000
        //   )
        //   .onUpdate(({ x }) => {
        //     currentObj[0].object.rotation.x = x
        //     // group.children[0].rotation.x = x
        //   })
        //   .easing(TWEEN.Easing.Cubic.InOut)
        //   .start()
        // ----
      }
    }, 0)
  }
  // private onMouseLeave(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
  //   return (event: any) => {
  //     event.stopPropagation()
  //     const currentObj = this.getIntersectedObjects(raycaster, mouse, event)
  //     if (currentObj.length && currentObj[0].object.name === '房顶1001') {
  //       console.log(currentObj)
  //       // if (currentObj[0].object.oldMaterial) {
  //       //   ;(currentObj[0].object as any).material = currentObj[0].object.oldMaterial
  //       // }
  //     }
  //   }
  // }
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
    // const removeMouseLeaveEvent = makeEvent(
    //   this.canvas,
    //   'mouseleave',
    //   this.onMouseLeave(raycaster, mouse)
    // )
    // this.events.push(removeMouseLeaveEvent)
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
    // 获取角度，指南针
    compass(this.camera)
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
