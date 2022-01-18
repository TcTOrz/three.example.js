<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-01-18 21:44:11
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
  scene.background = new THREE.Color('black')

  const camera = new THREE.PerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 5)

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)

  const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 0x156289 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

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
  function recursionProvince(ary: any, mercatorTrans: any, ret: any) {
    if (ary.length === 2 && typeof ary[0] === 'number' && typeof ary[1] === 'number') {
      ret.push(mercatorTrans(ary))
    } else if (Array.isArray(ary)) {
      ary.forEach((item: any, idx: number) => {
        ret.push([])
        recursionProvince(item, mercatorTrans, ret[idx])
      })
    }
  }

  const generateGeometry = (jsonData: any) => {
    const nation = new THREE.Object3D() // 国家
    const mercatorTrans = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0])
    // console.log(jsonData, mercatorTrans([104.0, 37.5]), mercatorTrans([105.0, 37.6]))
    // console.log(typeof jsonData)
    jsonData.features.map((d: any) => {
      const province = new THREE.Object3D() // 省
      const { properties, geometry } = d
      const { coordinates } = geometry
      const { name } = properties
      // 第一种递归，改变数组格式并进行墨卡托投影
      // const ret: any[] = []
      // recursionProvince(coordinates, mercatorTrans, ret)
      // 第二种递归，不改变数组格式并进行墨卡托投影
      const ret: any[] = []
      recursionProvince(coordinates, mercatorTrans, ret)

      console.log(name, coordinates, ret)
      // coordinates.map((arys: any[]) => {
      //   console.log(name, arys)
      //   arys.map((ary: any) => {
      //     const [x, y] = mercatorTrans(ary)
      //     console.log(x, y)
      //   })
      // })
      // const geometry2 = new THREE.BoxBufferGeometry(1, 1, 1)
      // const material2 = new THREE.MeshPhongMaterial({ color: 0x156289 })
      // const cube2 = new THREE.Mesh(geometry2, material2)
      // cube2.position.set(x, y, 0)
      // cube2.name = name
      // obj3d.add(cube2)
    })
  }
  const loader = new THREE.FileLoader()
  loader.load('/json/china.json', data => {
    const jsonData = JSON.parse(data as string)
    // console.log(jsonData, d3)
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
