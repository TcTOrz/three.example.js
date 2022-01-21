<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-01-21 16:49:23
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue-demi'
import { resizeRendererToDisplaySize, makeEvent, FlyLine, RadarController } from '@shared'
import * as d3 from 'd3'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
// import chinaJson from '@assets/json/china.json'

let canvas: HTMLCanvasElement
let renderer: THREE.Renderer
let scene: THREE.Scene
onMounted(() => {
  canvas = document.querySelector('#c13') as HTMLCanvasElement
  if (!canvas) return
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  scene = new THREE.Scene()
  scene.background = new THREE.Color('black')

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
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.rotateSpeed = 0.35

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
  function addFlyline(scene: THREE.Scene, path: any[]) {
    const mercatorPath = path.map((elem: any) => {
      const [x, y] = geoMercator()(elem)
      return new THREE.Vector3(x, -y, 2.21)
    })
    const mx = (mercatorPath[0].x + mercatorPath[1].x) / 2
    const my = (mercatorPath[0].y + mercatorPath[1].y) / 2
    // const mz = Math.random() * 10 + 2.21
    const mz = Math.sqrt(path[0][0] * path[1][0] + path[0][1] * path[1][1]) / 30 + 2.21
    mercatorPath.splice(1, 0, new THREE.Vector3(mx, my, mz))
    // console.log(mercatorPath)
    const curve = new THREE.CatmullRomCurve3(mercatorPath)
    const points = curve.getPoints(50)
    const geometry = new LineGeometry()
    geometry.setPositions(points.map(item => [item.x, item.y, item.z]).flat())
    const material = new LineMaterial({
      color: 0x0000cc,
      linewidth: 0.002,
    })
    const curveObject = new Line2(geometry, material)
    scene.add(curveObject)
    // @ts-ignore
    let flyLine = new FlyLine(curve, {
      color: 0x00ffff,
      segFlag: true,
    })
    scene.add(flyLine)
    flyLines.push(flyLine)
  }

  function addCustomTexture(scene: THREE.Scene, textures: { type: string; position: number[] }[]) {
    //
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
    // console.log(data)
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
      nation.add(province)
    })
    scene.add(nation)
    // -省名称-
    addText(scene.getObjectByName('nation'))
    // -飞线-
    let paths = [
      [
        [121.48941, 31.40527],
        [91.13775, 29.65262],
      ],
      [
        [121.48941, 31.40527],
        [116.23128, 40.22077],
      ],
      [
        [121.48941, 31.40527],
        [113.6401, 34.72468],
      ],
      [
        [121.48941, 31.40527],
        [113.88308, 22.55329],
      ],
      [
        [121.48941, 31.40527],
        [81.32416, 43.91689],
      ],
      [
        [121.48941, 31.40527],
        [126.95717, 45.54774],
      ],
      [
        [121.48941, 31.40527],
        [112.29162, 3.981086],
      ],
    ]
    paths.map(path => {
      addFlyline(scene, path)
    })
    // -标志贴图-未完成-
    const textures = [
      {
        type: '',
        position: [121.48941, 31.40527],
      },
    ]
    addCustomTexture(scene, textures)
    // -雷达-
    const radarData = [
      {
        position: [121.48941, 31.40527],
        radius: 4,
        color: '#0000ff',
        opacity: 1,
        speed: 2,
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
    ]
    radar = addRadar(scene, radarData)
  }

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  // TODO
  function onMouseMove(raycaster: THREE.Raycaster, mouse: THREE.Vector2) {
    return function (event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersectedObjects = raycaster.intersectObjects(scene.children)

      console.log(intersectedObjects)
      if (intersectedObjects.length) {
        // intersectedObjects[0].object.material.emissive.setHex(0xffffff)
      }
    }
  }
  // @ts-ignore
  // const removeEvent = makeEvent(window, 'click', onMouseMove(raycaster, mouse))

  const loader = new THREE.FileLoader()
  loader.load('/json/china.json', data => {
    const jsonData = JSON.parse(data as string)
    generateGeometry(jsonData)
  })

  const clock = new THREE.Clock()
  const render = () => {
    const dt = clock.getDelta()
    requestAnimationFrame(render)
    controls.update()

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
</template>
