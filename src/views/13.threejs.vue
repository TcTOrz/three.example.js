<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-01-19 19:51:58
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue-demi'
import { resizeRendererToDisplaySize } from '@shared'
import * as d3 from 'd3'
// import chinaJson from '@assets/json/china.json'

// console.log(chinaJson)

let canvas: HTMLCanvasElement
let renderer: THREE.Renderer
let scene: THREE.Scene
onMounted(() => {
  canvas = document.querySelector('#c13') as HTMLCanvasElement
  if (!canvas) return
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  scene = new THREE.Scene()
  // scene.background = new THREE.Color('black')

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 50)

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)

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

  function drawProvince(data: any[], properties: any, province: THREE.Object3D<THREE.Event>) {
    function addMesh(shape: THREE.Shape | THREE.Shape[] | undefined) {
      const extrudeSettings = {
        depth: 2,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      const mesh = new THREE.Mesh(geometry, material)
      return mesh
    }
    // 可以内嵌到dataLoop函数中，虽然浪费了一些性能，但是这样比较清晰，更好理解
    function addLine(obj: THREE.Object3D<THREE.Event>, d: any[]) {
      d.map((item, index) => {
        const points: THREE.Vector3[] = []
        item.map((i: number[][], idx: number) => {
          points.push(new THREE.Vector3(i[index][0], -i[index][1], 2.21))
        })
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color: 0x000000 })
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

  const generateGeometry = (jsonData: { features: any[] }) => {
    const nation = new THREE.Object3D() // 国家
    const mercatorTrans = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0])
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
  }
  const loader = new THREE.FileLoader()
  loader.load('/json/china.json', data => {
    const jsonData = JSON.parse(data as string)
    generateGeometry(jsonData)
  })

  const render = () => {
    requestAnimationFrame(render)
    controls.update()

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
canvas#c13(style="width: 100vw; height: 100vh;")
</template>
