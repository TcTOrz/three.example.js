<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-01-19 15:46:57
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

  // const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  // const material = new THREE.MeshPhongMaterial({ color: 0x156289 })
  // const cube = new THREE.Mesh(geometry, material)
  // scene.add(cube)

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

  function drawProvince(data: any, properties: any, province: any) {
    function addMesh(shape: any) {
      const extrudeSettings = {
        depth: 2,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      const mesh = new THREE.Mesh(geometry, material)
      return mesh
    }
    function dataLoop(shape: any, d: any) {
      d.map((item: any, index: number) => {
        item.map((i: any, idx: number) => {
          if (idx === 0) {
            shape.moveTo(i[index][0], -i[index][1])
          }
          shape.lineTo(i[index][0], -i[index][1])
        })
      })
    }
    // 一般数组嵌套就两种情况，没必要写递归，但是写法丑了点
    // 不是数组说明就以整块地，是数组说明有飞地。
    if (!Array.isArray(data[0][0][0][0])) {
      let shape = new THREE.Shape()
      dataLoop(shape, data)
      const mesh = addMesh(shape)
      province.add(mesh)
    } else {
      const obj = new THREE.Object3D()
      data.map((d: any, i: number) => {
        let shape = new THREE.Shape()
        dataLoop(shape, d)
        const mesh = addMesh(shape)
        obj.add(mesh)
      })
      province.add(obj)
    }

    // if (properties.name === '内蒙古自治区') {
    //   let shape = new THREE.Shape()
    //   data.map((item: any, index: number) => {
    //     item.map((i: any, idx: number) => {
    //       if (idx === 0) {
    //         shape.moveTo(i[index][0], -i[index][1])
    //       }
    //       shape.lineTo(i[index][0], -i[index][1])
    //     })
    //   })
    //   const mesh = addMesh(shape)
    //   province.add(mesh)
    // } else {
    //   const obj = new THREE.Object3D()
    //   data.map((d: any, i: number) => {
    //     let shape = new THREE.Shape()
    //     d.map((dd: any, ii: number) => {
    //       dd.map((ddd: any, iii: number) => {
    //         if (iii === 0) {
    //           shape.moveTo(ddd[ii][0], -ddd[ii][1])
    //         }
    //         shape.lineTo(ddd[ii][0], -ddd[ii][1])
    //       })
    //     })
    //     const mesh = addMesh(shape)
    //     obj.add(mesh)
    //   })
    //   province.add(obj)
    // }
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

      // console.log(name, ret)
      // if (name === '台湾省') {
      // 先只画江西省试试
      drawProvince(ret, properties, province)
      // province.add(mesh)
      // }

      nation.add(province)
    })
    scene.add(nation)
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
