<!--
 * @Author: Li Jian
 * @Date: 2022-01-18 15:20:36
 * @LastEditTime: 2022-01-18 15:34:57
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue-demi'
import { resizeRendererToDisplaySize } from '@shared'

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

  const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 0x156289 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)

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
