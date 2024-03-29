/*
 * @Author: Li Jian
 * @Date: 2022-02-10 10:20:16
 * @LastEditTime: 2022-04-13 15:34:03
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import {
  makePerspectiveCamera,
  resizeRendererToDisplaySize,
  // DrawMap,
  AddProvinceName,
  AddFlyLine,
  flyLines,
  lines2,
  AddRadar,
  radar,
  AddCityLight,
  makeEvent,
  popup,
  popInstance,
  AddPoint,
  AddPointPopup,
  AddLinePopup,
  SweepEffectShader,
} from '@shared'
import { MapInterface } from './type'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import _ from 'lodash'
import TWEEN from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import rainBg from '@assets/image/star.png'
import { httpMap } from '@axios/api'

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
  recoverStates: Map<Object, Function>
  events: Array<Function> = []
  removeChangeProvinceNameControl!: Function
  stats: Stats = new (Stats as any)()
  insSweepShader!: SweepEffectShader
  pointAndFlylineData!: any // 存储点和飞线数据
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
    import.meta.env.PROD ? undefined : this.addHelper()
    return this
  }
  addHelper() {
    const axesHelper = new THREE.AxesHelper(30)
    this.scene.add(axesHelper)
    // const gridHelper = new THREE.GridHelper(100, 10)
    // this.scene.add(gridHelper)
    document.querySelector('#stats')?.appendChild(this.stats.dom)
  }
  init() {
    this.initRenderer() // renderer
    this.initScene() // scene
    this.initBackground() // background
    this.initCamera() // camera
    this.initLight() // light
    this.initControl() // control
  }
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true, // 抗锯齿
      alpha: true, // 透明缓冲区
      // 这里不加会出现Unable to clone WebGL context as it has preserveDrawingBuffer=false的警告
      // 可能是由于html2canvas引起，暂未验证。
      preserveDrawingBuffer: true, // 保存绘图缓冲区
    })
  }
  initScene() {
    this.scene = new THREE.Scene()
  }
  initBackground() {
    // this.scene.background = new THREE.Color(0x020924)
    this.scene.background = new THREE.Color(0x000000)
    const positions = []
    const colors = []
    const geometry = new THREE.BufferGeometry()
    const texture = new THREE.TextureLoader().load(rainBg)
    for (let i = 0; i < 500; i++) {
      const vertex = new THREE.Vector3()
      vertex.x = (Math.random() - 0.5) * this.canvas.clientWidth
      vertex.y = (Math.random() - 0.5) * this.canvas.clientHeight
      vertex.z = (Math.random() - 0.5) * this.canvas.clientHeight
      positions.push(vertex.x, vertex.y, vertex.z)
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55)
      colors.push(color.r, color.g, color.b)
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const starsMaterial = new THREE.PointsMaterial({
      map: texture,
      transparent: true,
      size: Math.random() * 20,
      // size: Math.random(),
      vertexColors: true,
      opacity: 1,
      depthWrite: false,
    })
    const stars = new THREE.Points(geometry, starsMaterial)
    stars.rotation.x = -Math.PI / 2
    stars.name = 'background-stars'
    this.scene.add(stars)
  }
  initCamera() {
    this.camera = makePerspectiveCamera(
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000,
      [0, -35, 20]
      // [0, -45, 45]
    )
  }
  initLight() {
    const group = new THREE.Group()
    const light = new THREE.DirectionalLight(0xb1e1ff, 1)
    light.position.set(1, 1, 2)
    light.target.position.set(0, 0, 0)
    group.add(light)
    const light1 = new THREE.DirectionalLight(0xb1e1ff, 1)
    light1.position.set(-1, -1, -2)
    light1.target.position.set(0, 0, 0)
    group.add(light1)
    const light2 = new THREE.PointLight(0x00ff00, 100, 25)
    light2.position.set(-20, 0, 10)
    group.add(light2)
    if (!import.meta.env.PROD) {
      const helper = new THREE.PointLightHelper(light2)
      this.scene.add(helper)
    }
    group.name = 'light-group'
    this.scene.add(group)
  }
  initControl() {
    const control = (this.control = new OrbitControls(this.camera, this.canvas))
    control.target.set(0, -20, 10)
    // control.target.set(0, 0, 0)
    control.enableDamping = true
    control.dampingFactor = 0.05
    control.rotateSpeed = 0.35
    control.maxDistance = 50
    control.minDistance = 5
    control.maxPolarAngle = Math.PI // (Math.PI / 4) * 3
    control.minPolarAngle = Math.PI / 2
    control.maxAzimuthAngle = Math.PI / 4
    control.minAzimuthAngle = -Math.PI / 4
  }
  async load() {
    // await this.asyncNewMap()
    // return
    await this.asyncMap() // 加载地图
    // 后期可能重写: 参照 - https://threejs.org/manual/#en/align-html-elements-to-3d
    this.asyncProvinceName() // 加载省份名称
    // this.asyncFlyLine() // 加载飞线
    this.asyncRadarAndPoint() // 加载雷达和点
    // this.asyncCityLight() // 加载城市灯光
    setTimeout(() => {
      // 由于首次加载会出现卡顿，所以延时两秒执行
      this.asyncSweepShader() // 加载扫光
    }, 2000)
  }
  private asyncSweepShader() {
    this.insSweepShader = new SweepEffectShader(this)
  }
  private async asyncCityLight() {
    // this.fileLoader.load('/json/chinalocation.json', data => {
    // 灯光相关的数据取自于
    // https://mapv.baidu.com/gl/examples/editor.html#point-china.html
    // const jsonData = JSON.parse(data as string)
    const chinalocationJson = (await import('@assets/json/chinalocation.json')).default
    new AddCityLight(this, chinalocationJson)
  }
  private async asyncRadarAndPoint() {
    // 后台加载数据
    const ret = await httpMap.getPointAndFlyline()
    this.pointAndFlylineData = ret.data

    const handleData = () => {
      const data: any[] = []
      this.pointAndFlylineData.map((item: any) => {
        let position = item.start
        data.push({
          position,
          color: 0x00ff00,
          ...item,
          station: item.startStation,
        })
        position = item.end
        data.push({
          position,
          color: 0xffff00,
          ...item,
          station: item.endStation,
        })
      })
      return data
    }
    // const pointData = await httpMap.getPoint({})
    // const radarData = pointData.data
    const data: any[] = handleData()
    new AddRadar(this, data)
    new AddPoint(this, data)

    this.asyncFlyLine() // 加载飞线
  }
  private async asyncFlyLine() {
    // ------rewrite start----
    const data = this.pointAndFlylineData
    data.forEach((item: any) => {
      let path = [item.end, item.start]
      let length = item.children.length
      length
        ? item.children.forEach((child: any, idx: number) => {
            path = [child.end, child.start]
            new AddFlyLine(this, {
              path,
              length,
              idx,
              cableId: child.cableId,
              cableName: child.cableName,
              toStation: child.toStation,
              children: item.children,
            })
          })
        : new AddFlyLine(this, {
            path,
            length,
            idx: 0,
            cableId: item.cableId,
            cableName: item.cableName,
            startStation: item.startStation,
            endStation: item.endStation,
            lineId: item.lineId,
            lineName: item.lineName,
          })
    })
    // ------rewrite end------

    // 后台加载数据
    // const flyLineData = await httpMap.getFlyline({})
    // const data = flyLineData.data
    // data.forEach((flyline: any) => {
    //   new AddFlyLine(this, flyline)
    // })
    let group = new THREE.Group()
    group.name = 'fly-line-group'
    this.scene.add(group)
    lines2.forEach(line => {
      group.add(line)
    })
    flyLines.forEach(flyline => {
      group.add(flyline)
    })
  }
  private asyncProvinceName() {
    new AddProvinceName(this)
  }
  private asyncNewMap() {
    const MapInstance = import('@shared/map/drawNewMap')
    const ChinaJson = import('@assets/json/feat/china.json')
    // const ChinaMap = import('@assets/json/feat/chinaMap.json')
    // console.log(performance.now())
    return Promise.all([MapInstance, ChinaJson /*, ChinaMap*/]).then(res => {
      const [Map, chinaJson /*, chinaMap*/] = res
      // console.log(performance.now())
      const map = new Map.default(this.scene, chinaJson /*, chinaMap*/)
      // this.scene.add(map)
    })
  }
  private asyncMap() {
    const MapInstance = import('@shared/map/drawMap')
    const ChinaJson = import('@assets/json/china.json')
    return Promise.all([MapInstance, ChinaJson]).then(res => {
      const [Map, chinaJson] = res
      new Map.default(this.scene, chinaJson)
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
    let removeChangeProvinceNameControl = (this.removeChangeProvinceNameControl = makeEvent(
      this.control,
      'change',
      this.onProvinceNameChange()
    ))
    let removeMoveEvent = makeEvent(this.canvas, 'mousemove', this.onMouseMove(raycaster, mouse))
    let removeClickEvent = makeEvent(this.canvas, 'click', this.onMouseClick(raycaster, mouse))
    let removeResizeEvent = makeEvent(window, 'resize', this.onResize())
    this.events.push(
      removeChangeProvinceNameControl,
      removeMoveEvent,
      removeClickEvent,
      removeResizeEvent
    )
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
        o0.type === 'curveLine' || // 飞线-分段
        o0.type === 'radar' || // 雷达
        o0.type === 'point' || // 点
        new RegExp('pointOrLinePopup-*').test(o0.type) // 点弹窗
      ) {
        currentObj = o0
      } else {
        const o1 = o0.parent
        if (
          // o1?.type === 'province' ||
          o1?.type === 'flyline' ||
          o0?.type === 'curveLine' ||
          o1?.type === 'radar' ||
          o1?.type === 'point' ||
          new RegExp('pointOrLinePopup-*').test(o1?.type as string)
        ) {
          currentObj = o1
          if (o1?.type === 'flyline') {
            currentObj = intersectedObjects[1].object
          }
        } else {
          const o2 = o1?.parent
          if (
            // o2?.type === 'province' ||
            o2?.type === 'flyline' ||
            o2?.type === 'radar' ||
            o2?.type === 'point' ||
            new RegExp('pointOrLinePopup-*').test(o2?.type as string)
          ) {
            currentObj = o2
          }
        }
      }
    }
    return currentObj
  }
  private onResize() {
    return _.debounce(() => {
      this.asyncProvinceName()
    }, 20)
  }
  private onMouseClick(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return (event: any) => {
      const currentObj = this.getIntersectedObjects(raycaster, mouse, event)
      if (currentObj && currentObj.type === 'point') {
        // 点弹出框
        new AddPointPopup(this, currentObj)
      } //else if (currentObj && currentObj.type === 'flyline') {
      // 飞线弹出框
      // const [[slong, slat], [elong, elat]] = currentObj.userData.path
      // currentObj.userData.position = [
      //   _.round((slong + elong) / 2, 5),
      //   _.round((slat + elat) / 2, 5),
      // ]
      // new AddLinePopup(this, currentObj)
      //}
      else if (currentObj && currentObj.type === 'curveLine') {
        // 飞线段弹出框
        const [[slong, slat], [elong, elat]] = currentObj.userData.path
        currentObj.userData.position = [
          _.round((slong + elong) / 2, 5),
          _.round((slat + elat) / 2, 5),
        ]
        new AddLinePopup(this, currentObj)
      } else if (currentObj && new RegExp('pointOrLinePopup-*').test(currentObj.type)) {
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
        if (currentObj && currentObj.type === 'province') {
          // console.log(currentObj);
        }
        if (currentObj && currentObj.type === 'flyline') {
          popup(event, popElem, currentObj.userData)
        }
        if (currentObj && currentObj.type === 'curveLine') {
          popup(event, popElem, currentObj.userData)
        }
        if (currentObj && currentObj.type === 'point') {
          event.path[0].style.cursor = 'pointer'
          if (currentObj instanceof THREE.Mesh) {
            currentObj.userData.point = {
              color: currentObj.material.color.getHex(),
            }
            this.addRecoverState(currentObj, () => {
              currentObj.material.color.setHex(currentObj.userData.point.color)
            })
            currentObj.material.color = new THREE.Color('#00796a')
          }
        }
      },
      0
    )
  }
  private onProvinceNameChange() {
    return _.debounce(() => {
      this.asyncProvinceName()
    }, 20)
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
    this.insSweepShader && this.insSweepShader.animate(dt)
    import.meta.env.PROD ? undefined : this.stats.update()
  }
  toggleRenderer() {
    // 切换部分渲染 - radar/citytLight/provinceName/sweepEffectShader
    // radar
    const radar = this.scene.getObjectByName('radar-group') as THREE.Group
    radar.visible = !radar.visible
    // cityLight
    // const cityLight = this.scene.getObjectByName('city-light') as THREE.Group
    // cityLight.visible = !cityLight.visible
    // provinceName
    const provinceName = this.scene.getObjectByName('province-name') as THREE.Group
    provinceName.visible = !provinceName.visible
    if (provinceName.visible) {
      this.removeChangeProvinceNameControl = makeEvent(
        this.control,
        'change',
        this.onProvinceNameChange()
      )
    } else {
      this.removeChangeProvinceNameControl()
    }
    // 扫光特效
    this.insSweepShader && this.insSweepShader.toggle()
  }
  toggleSite() {
    // 切换站点
    console.log(this.scene)
    const site = this.scene.getObjectByName('point-group') as THREE.Group
    site.visible = !site.visible
    const radar = this.scene.getObjectByName('radar-group') as THREE.Group
    radar.visible = !radar.visible
    // const point = this.scene.getObjectByName('point-circle-group') as THREE.Group
    // point.visible = !point.visible
  }
  toggleCable() {
    // 切换飞线
    const flyline = this.scene.getObjectByName('fly-line-group') as THREE.Group
    flyline.visible = !flyline.visible
  }
  dispose() {
    // 销毁
    this.events.forEach(f => f()) // 销毁事件
    this.events = []
    // 销毁飞线
    flyLines.forEach(flyline => {
      flyline.dispose()
    })
    // 销毁线
    lines2.forEach(line => {
      line.geometry.dispose()
      line.material.dispose()
      line.parent && line.parent.remove(line)
    })
    // 销毁雷达
    this.scene.getObjectByName('radar-group')?.children[0].children.forEach((child: any) => {
      child.geometry.dispose()
      child.material.dispose()
      child.parent && child.parent.remove(child)
    })
    // 销毁小圆点
    this.scene.getObjectByName('point-circle-group')?.children.forEach((child: any) => {
      child.geometry.dispose()
      child.material.dispose()
      child.parent && child.parent.remove(child)
    })
    // 销毁点
    this.scene.getObjectByName('point-group')?.children.forEach((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        child.material.dispose()
        child.parent && child.parent.remove(child)
      }
    })
    // 销毁省名
    this.scene.getObjectByName('province-name')?.children.forEach((child: any) => {
      child.geometry.dispose()
      child.material.dispose()
      child.parent && child.parent.remove(child)
    })

    this.renderer.dispose()
    this.scene.children = []
  }
  private zoomMap(vec3: THREE.Vector3) {
    const playerDirection = new THREE.Vector3()
    const getForwardVector = () => {
      this.camera.getWorldDirection(playerDirection)
      playerDirection.normalize()
      return playerDirection
    }
    const tween = new TWEEN.Tween({
      camera: _.cloneDeep(this.camera.position),
      control: _.cloneDeep(this.control.target),
    })
    getForwardVector().multiply(vec3)
    const cameraPosition = _.cloneDeep(this.camera.position)
    const controlTarget = _.cloneDeep(this.control.target)
    const newCameraPosition = cameraPosition.add(playerDirection)
    const newControlTarget = controlTarget.add(playerDirection)
    tween
      .to({ camera: newCameraPosition, control: newControlTarget }, 800)
      .onUpdate(object => {
        this.camera.position.set(object.camera.x, object.camera.y, object.camera.z)
        this.control.target.set(object.control.x, object.control.y, object.control.z)
      })
      .easing(TWEEN.Easing.Quadratic.In)
      .start()
  }
  zoomIn() {
    if (this.camera.position.y < -31) {
      this.zoomMap(new THREE.Vector3(0, 5, 5))
    }
  }
  zoomOut() {
    if (this.camera.position.y > -43) {
      this.zoomMap(new THREE.Vector3(0, -5, -5))
    }
  }
}
