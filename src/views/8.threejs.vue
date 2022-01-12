<!--
 * @Author: Li Jian
 * @Date: 2022-01-07 10:35:02
 * @LastEditTime: 2022-01-12 11:28:52
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'
import * as THREE from 'three'
import {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  makeDirectionalLight,
  makeAmbientLight,
  makeHemisphereLight,
  loadModel,
  makeControl,
  makeFiber,
} from '@shared'

function main(): void {
  const canvas: HTMLCanvasElement | null = document.querySelector('#c8')
  if (!canvas) return
  const renderer: THREE.Renderer = new THREE.WebGLRenderer({ canvas })
  const scene: THREE.Scene = new THREE.Scene()
  scene.background = new THREE.Color('white')
  const camera: THREE.PerspectiveCamera = makePerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    10000,
    [0, 10, 20]
  )

  const controls = makeControl(camera, renderer)

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  // {
  //   const color = 0xffffff
  //   const intensity = 1
  //   const light = new THREE.DirectionalLight(color, intensity)
  //   light.position.set(5, 10, 5)
  //   scene.add(light)
  //   scene.add(light.target)
  // }
  // {
  //   const color = 0xffffff
  //   const intensity = 1
  //   const light = new THREE.DirectionalLight(color, intensity)
  //   light.position.set(-5, -10, -5)
  //   scene.add(light)
  //   scene.add(light.target)
  // }

  // const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)
  // const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
  // const mesh: THREE.Mesh = new THREE.Mesh(geometry, material)
  // scene.add(mesh)
  loadModel(scene, './blender/ElectricStation', makeFiber(0))

  const render = () => {
    requestAnimationFrame(render)

    controls.update()

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    // mesh.rotation.x += 0.01
    // mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  requestAnimationFrame(render)
}

onMounted(() => {
  main()
})
</script>

<template lang="pug">
#container
  canvas#c8
  #labels
</template>

<style>
#container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#c8 {
  width: 100%;
  height: 100%;
  display: block;
}
#labels {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}
</style>
