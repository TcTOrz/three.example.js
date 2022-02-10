<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-02-10 16:51:54
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createApp, onMounted } from 'vue-demi'
import { resizeRendererToDisplaySize, makeEvent, FlyLine, RadarController } from '@shared'
import * as d3 from 'd3'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import ElementPlus from '@/element-plus'
import Popup from '@components/Popup.vue'
import TWEEN from '@tweenjs/tween.js'

let canvas: HTMLCanvasElement
let renderer: THREE.Renderer
let scene: THREE.Scene
onMounted(() => {
  canvas = document.querySelector('#c13') as HTMLCanvasElement
  if (!canvas) return
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  scene = new THREE.Scene()
  scene.background = new THREE.Color('black')
  // const rotateX = -Math.PI / 4
  // scene.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotateX)

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 50)

  {
    // const skyColor = 0xb1e1ff // light blue
    // const groundColor = 0xb97a20 // brownish orange
    // const intensity = 1
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    // scene.add(light)
  }

  const controls = new OrbitControls(camera, renderer.domElement)
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
    addText(scene.getObjectByName('nation')) // 省名称
  })

  // 辅助
  function buildAuxSystem() {
    const axesHelper = new THREE.AxesHelper(2000)
    scene.add(axesHelper)
    // 红色r的线是x轴
    // 绿色g的线是y轴
    // 蓝色b的线是z轴
    let gridHelper = new THREE.GridHelper(600, 60)
    scene.add(gridHelper)
  }
  // buildAuxSystem()

  // 打平数组
  // function recursionProvince(ary: any, mercatorTrans: any, ret: any[]) {
  //   if (ary.length === 2 && typeof ary[0] === 'number' && typeof ary[1] === 'number') {
  //     ret.push(mercatorTrans(ary))
  //   } else if (Array.isArray(ary)) {
  //     ary.forEach((item: any) => {
  //       recursionProvince(item, mercatorTrans, ret)
  //     })
  //   }
  // }

  // 原样返回数组
  function recursionProvince(ary: any[], mercatorTrans: (arg0: any) => any, ret: any[]) {
    if (ary.length === 2 && typeof ary[0] === 'number' && typeof ary[1] === 'number') {
      ret.push(mercatorTrans(ary))
    } else if (Array.isArray(ary)) {
      ary.forEach((item: any, idx: number) => {
        ret.push([])
        recursionProvince(item, mercatorTrans, ret[idx])
      })
    }
  }

  // 墨卡托坐标转换
  function geoMercator(
    center: number[] = [104.0, 37.5],
    scale: number = 80,
    translate: number[] = [0, 0]
  ) {
    return d3.geoMercator().center(center).scale(scale).translate(translate)
  }

  function drawProvince(data: any[], properties: any, province: THREE.Object3D<THREE.Event>) {
    function addMesh(shape: THREE.Shape | THREE.Shape[] | undefined) {
      const extrudeSettings = {
        depth: 2,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const material = new THREE.MeshPhongMaterial({
        color: 0x2c448b,
        transparent: true,
        opacity: 0.3,
        emissive: 0x2c448b,
      })
      const mesh = new THREE.Mesh(geometry, material)
      return mesh
    }
    // 可以内嵌到dataLoop函数中，虽然浪费了一些性能，但是这样比较清晰，更好理解
    function addLine(obj: THREE.Object3D<THREE.Event>, d: any[]) {
      d.map((item, index) => {
        const points: THREE.Vector3[] = []
        item.map((i: number[][], idx: number) => {
          points.push(new THREE.Vector3(i[index][0], -i[index][1], 2))
        })
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color: 0x445f8f })
        )
        obj.add(line)
      })
    }
    function dataLoop(shape: THREE.Shape, d: any[]) {
      d.map((item, index) => {
        item.map((i: number[][], idx: number) => {
          if (idx === 0) {
            shape.moveTo(i[index][0], -i[index][1])
          }
          shape.lineTo(i[index][0], -i[index][1])
        })
      })
    }
    // 一般数组嵌套就两种情况，没必要写递归，但是写法丑了点
    // 不是数组说明就以整块地，是数组说明有飞地。
    // 内蒙古自治区没有飞地
    if (!Array.isArray(data[0][0][0][0])) {
      let shape = new THREE.Shape()
      dataLoop(shape, data)
      const mesh = addMesh(shape)
      addLine(province, data)
      province.add(mesh)
      province.name = properties.name
      province.userData = properties
    } else {
      const obj = new THREE.Object3D()
      data.map(d => {
        let shape = new THREE.Shape()
        dataLoop(shape, d)
        const mesh = addMesh(shape)
        addLine(obj, d)
        obj.add(mesh)
      })
      province.add(obj)
      province.name = properties.name
      province.userData = properties
    }
  }

  function addText(data: THREE.Object3D<THREE.Event> | undefined) {
    const mercatorTrans = geoMercator()
    const width = window.innerWidth
    const height = window.innerHeight
    const canvas = document.querySelector('#provinceName') as HTMLCanvasElement
    if (!canvas) return
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    // 离屏canvas
    const offsetCanvas = document.createElement('canvas')
    offsetCanvas.width = width
    offsetCanvas.height = height
    const offsetCtx = offsetCanvas.getContext('2d')
    if (!offsetCtx) return
    offsetCtx.font = '12px'
    // offsetCtx.strokeStyle = '#000'
    offsetCtx.fillStyle = '#ccc'

    const texts: any[] = []
    data?.children.map(elem => {
      if (elem.name) {
        let { name, center } = elem.userData
        if ('centroid' in elem.userData) {
          center = elem.userData.centroid
        }
        const [x, y] = mercatorTrans(center)
        const z = 0
        const vector = new THREE.Vector3(x, -y, z)
        const position = vector.project(camera)
        const left = ((vector.x + 1) / 2) * width
        const top = (-(vector.y - 1) / 2) * height
        const gap = 10 // 省名显示密度
        const text = {
          name,
          left,
          top,
          width: offsetCtx.measureText(name).width + gap,
          height: 12 + gap,
        }
        let show = true
        for (let i = 0; i < texts.length; i++) {
          if (
            text.left + text.width < texts[i].left ||
            text.top + text.height < texts[i].top ||
            texts[i].left + texts[i].width < text.left ||
            texts[i].top + texts[i].height < text.top
          ) {
            show = true
          } else {
            show = false
            break
          }
        }
        offsetCtx.strokeText('测试', 9 + Math.random() * 10, 9 + Math.random() * 10)
        offsetCtx.fillText('测试', 9 + Math.random() * 10, 9 + Math.random() * 10)
        if (show) {
          texts.push(text)
          offsetCtx.strokeText(name, left, top)
          offsetCtx.fillText(name, left, top)
        }
      }
    })
    // 离屏canvas绘制到canvas中
    ctx?.drawImage(offsetCanvas, 0, 0)
  }

  let flyLines: FlyLine[] = []
  function addFlyline(scene: THREE.Scene, paths: { name?: string; info?: string; path: any }) {
    const mercatorPath = paths.path.map((elem: any) => {
      const [x, y] = geoMercator()(elem)
      return new THREE.Vector3(x, -y, 2.21)
    })
    const mx = (mercatorPath[0].x + mercatorPath[1].x) / 2
    const my = (mercatorPath[0].y + mercatorPath[1].y) / 2
    // const mz = Math.random() * 10 + 2.21
    const mz =
      Math.sqrt(paths.path[0][0] * paths.path[1][0] + paths.path[0][1] * paths.path[1][1]) / 30 +
      2.21
    mercatorPath.splice(1, 0, new THREE.Vector3(mx, my, mz))
    const curve = new THREE.CatmullRomCurve3(mercatorPath)
    const points = curve.getPoints(50)
    const geometry = new LineGeometry()
    geometry.setPositions(points.map(item => [item.x, item.y, item.z]).flat())
    const material = new LineMaterial({
      color: 0x03045e,
      linewidth: 0.002,
    })
    const curveObject = new Line2(geometry, material)
    scene.add(curveObject)
    // @ts-ignore
    let flyLine = new FlyLine(curve, {
      color: 0x90e0ef,
      segFlag: true,
    })
    scene.add(flyLine)
    flyLine.userData = {
      type: 'flyline',
      path: paths.path,
      info: paths.info,
      name: paths.name,
    }
    flyLine.type = 'flyline'
    flyLines.push(flyLine)
  }

  function addRadar(scene: THREE.Scene, data: any[]) {
    data.map((elem: any) => {
      const pos = geoMercator()(elem.position)
      elem.position = {
        x: pos[0],
        y: -pos[1],
        z: 2.21,
      }
    })
    // @ts-ignore
    const radar = new RadarController(data)
    scene.add(radar.group)
    return radar
  }

  let radar: { animate: (arg0: number) => void }
  const generateGeometry = (jsonData: { features: any[] }) => {
    const nation = new THREE.Object3D() // 国家
    nation.name = 'nation'
    const mercatorTrans = geoMercator()
    jsonData.features.map(d => {
      const province = new THREE.Object3D() // 省
      const { properties, geometry } = d
      const { coordinates } = geometry
      // const { name } = properties
      // 第一种递归，改变数组格式并进行墨卡托投影
      // const ret: any[] = []
      // recursionProvince(coordinates, mercatorTrans, ret)
      // 第二种递归，不改变数组格式并进行墨卡托投影
      const ret: never[] = []
      recursionProvince(coordinates, mercatorTrans, ret)
      drawProvince(ret, properties, province)
      province.type = 'province'
      nation.add(province)
    })
    scene.add(nation)
    // -省名称-
    addText(scene.getObjectByName('nation'))
    // -飞线-
    let paths = [
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
    paths.map(path => {
      addFlyline(scene, path)
    })
    // -雷达-
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
    radar = addRadar(scene, radarData)
  }

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  function onMouseMove(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return function (event: {
      clientX: number
      clientY: number
      path: { style: { cursor: string } }[]
    }) {
      event.path[0].style.cursor = ''
      const popElem = document.querySelector('#popInfo') as HTMLDivElement
      if (popElem.children.length) {
        Array.from(popElem.children).map(elem => {
          elem.remove()
        })
      }
      // (0 ~ 1) * 2 - 1 => -1 ~ 1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      // (-1 ~ 0) * 2 + 1 => -1 ~ 1 mouse.y = -mouse.y
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera) // mouse must range from -1 to 1
      const intersectedObjects = raycaster.intersectObjects(scene.children)
      let currentObj: any
      // 这里if嵌套有些丑陋，但是目前可以接受
      if (intersectedObjects.length) {
        const o0 = intersectedObjects[0].object
        if (o0.type === 'province' || o0.type === 'flyline') {
          currentObj = o0
        } else {
          const o1 = o0.parent
          if (o1?.type === 'province' || o1?.type === 'flyline') {
            currentObj = o1
          } else {
            const o2 = o1?.parent
            if (o2?.type === 'province' || o2?.type === 'flyline') {
              currentObj = o2
            }
          }
        }
        // intersectedObjects[0].object.material.emissive.setHex(0xffffff)
      }
      if (currentObj) {
        let parDom
        if (currentObj.type === 'flyline') {
          event.path[0].style.cursor = 'pointer'

          parDom = document.createElement('div')
          parDom.style.color = 'white'
          parDom.style.cursor = 'pointer'
          parDom.style.position = 'absolute'
          parDom.style.left = `${event.clientX}px`
          parDom.style.top = `${event.clientY}px`

          popElem.appendChild(parDom)

          const popupApp = createApp(Popup, { data: currentObj.userData, el: parDom })
          popupApp.use(ElementPlus)
          popupApp.mount(parDom)
        }
      }
    }
  }

  function onclick(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    const hideLayer = (scene: THREE.Scene, doms: HTMLDivElement[], events: any[]) => {
      // 隐藏图层
      scene.visible = false
      doms.forEach(dom => {
        dom?.classList.add('hide')
      })
      events.map(event => {
        event()
      })
    }
    const showLayer = (scene: THREE.Scene, doms: HTMLDivElement[]) => {
      // 显示图层
      scene.visible = true
      doms.forEach(dom => {
        dom?.classList.remove('hide')
      })
      // 特例-后期需要改进
      removeMoveEvent = makeEvent(window, 'mousemove', onMouseMove(raycaster, mouse))
      removeClickEvent = makeEvent(window, 'click', onclick(raycaster, mouse))
    }
    return function (event: any) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersectedObjects = raycaster.intersectObjects(scene.children)
      let currentObj
      if (intersectedObjects.length) {
        const o0 = intersectedObjects[0].object
        if (o0.type === 'province' || o0.type === 'flyline') {
          currentObj = o0
        } else {
          const o1 = o0.parent
          if (o1?.type === 'province' || o1?.type === 'flyline') {
            currentObj = o1
          } else {
            const o2 = o1?.parent
            if (o2?.type === 'province' || o2?.type === 'flyline') {
              currentObj = o2
            }
          }
        }
      }
      if (currentObj && currentObj.type === 'flyline') {
        const oldPos = new THREE.Vector3()
        camera.getWorldPosition(oldPos)
        // console.log(oldPos, event, mouse, currentObj)
        new TWEEN.Tween({ x: oldPos.x, y: oldPos.y, z: oldPos.z })
          .to({ x: 0, y: 0, z: 0.01 }, 1000)
          .onUpdate(object => {
            camera.position.set(object.x, object.y, object.z)
          })
          .onComplete(() => {
            // hideLayer(
            //   scene,
            //   [document.querySelector('#provinceName') as HTMLDivElement],
            //   [removeMoveEvent, removeClickEvent]
            // )
            // new layer
            // let geometry = new THREE.BoxGeometry(1, 1, 1)
            // let material = new THREE.MeshBasicMaterial({ color: 0xff0f0f })
            // let cube = new THREE.Mesh(geometry, material)
            // cube.position.set(0, 0, -3)
            // scene.add(cube)
          })
          .easing(TWEEN.Easing.Cubic.InOut)
          .start()

        // hideLayer(
        //   scene,
        //   [document.querySelector('#provinceName') as HTMLDivElement],
        //   [removeMoveEvent, removeClickEvent]
        // )
        // setTimeout(() => {
        //   showLayer(scene, [document.querySelector('#provinceName') as HTMLDivElement])
        // }, 5000)
        // TODO 加载新的场景
        // ...
      }
    }
  }

  // @ts-ignore
  // const removeEvent = makeEvent(window, 'click', onMouseMove(raycaster, mouse))
  let removeMoveEvent = makeEvent(window, 'mousemove', onMouseMove(raycaster, mouse))
  let removeClickEvent = makeEvent(window, 'click', onclick(raycaster, mouse))

  const loader = new THREE.FileLoader()
  loader.load('/json/china.json', data => {
    const jsonData = JSON.parse(data as string)
    generateGeometry(jsonData)
  })

  // 城市亮光效果
  loader.load('/json/chinalocation.json', data => {
    // https://mapv.baidu.com/gl/examples/editor.html#point-china.html
    const jsonData = JSON.parse(data as string)
    const postions: number[] = []
    const colors: number[] = []
    const data2 = jsonData[2]
    const mercatorTrans = geoMercator()
    data2.map((v: { geoCoord: Array<number> }) => {
      const data = v.geoCoord
      const [x, y] = mercatorTrans(data)
      postions.push(x, -y, 1)
      colors.push(255, 255, 0)
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(postions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeBoundingSphere()
    const material = new THREE.PointsMaterial({ size: 0.01, vertexColors: true })
    const points = new THREE.Points(geometry, material)
    scene.add(points)
  })

  const clock = new THREE.Clock()
  const render = () => {
    const dt = clock.getDelta()
    requestAnimationFrame(render)
    controls.update()

    TWEEN.update()

    radar && radar.animate(dt)

    // @ts-ignore
    if (flyLines.length) {
      flyLines.map((f: { update: () => void }) => {
        f.update()
      })
    }

    // 检测鼠标点击
    // raycaster.setFromCamera(mouse, camera)
    // const intersectedObjects = raycaster.intersectObjects(scene.children)
    // console.log(intersectedObjects)

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)
  }

  render()
})
</script>

<template lang="pug">
canvas#c13(style="width: 100vw; height: 100vh;  position:relative;")
canvas#provinceName(style="pointer-events:none; z-index: 0; width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;")
#popInfo(style="display: inline;")
</template>

<style>
.hide {
  display: none;
}
</style>
