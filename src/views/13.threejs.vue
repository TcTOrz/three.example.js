<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-01-20 20:30:54
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue-demi'
import { resizeRendererToDisplaySize } from '@shared'
import * as d3 from 'd3'
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
    addText(scene.getObjectByName('nation')) // 省名称
  }

  // const raycaster = new THREE.Raycaster()
  // const mouse = new THREE.Vector2()
  // function onMouseMove(event: { clientX: number; clientY: number }) {
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  //   console.log(mouse)
  // }
  // window.addEventListener('click', onMouseMove, false)

  const loader = new THREE.FileLoader()
  loader.load('/json/china.json', data => {
    const jsonData = JSON.parse(data as string)
    generateGeometry(jsonData)
  })

  const render = () => {
    requestAnimationFrame(render)
    controls.update()

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
