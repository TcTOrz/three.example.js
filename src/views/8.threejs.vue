<!--
 * @Author: Li Jian
 * @Date: 2022-01-07 10:35:02
 * @LastEditTime: 2022-01-12 16:24:41
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
  makeText,
} from '@shared'

function main(): void {
  const canvas: HTMLCanvasElement | null = document.querySelector('#c8')
  if (!canvas) return
  const renderer: THREE.Renderer = new THREE.WebGLRenderer({ canvas })
  const scene: THREE.Scene = new THREE.Scene()
  scene.background = new THREE.Color('white')
  const camera: THREE.PerspectiveCamera = makePerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000,
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

  loadModel(scene, './blender/ElectricStation') // , makeFiber(0) // , makeText(canvas, camera)

  const labelContainerElem: Element | null = document.querySelector('#labels')
  const elem: HTMLDivElement = document.createElement('div')
  elem.style.fontSize = '12px'
  elem.style.width = '30px'
  elem.textContent = '进入'
  labelContainerElem?.appendChild(elem)

  const render = () => {
    requestAnimationFrame(render)

    makeText(canvas, camera, scene, elem)

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
  z-index: 0;
  top: 0;
  left: 0;
  color: white;
}
#labels > div {
  position: absolute; /* let us position them inside the container */
  left: 0; /* make their default position the top left of the container */
  top: 0;
  cursor: pointer; /* change the cursor to a hand when over us */
  font-size: large;
  user-select: none; /* don't let the text get selected */
  text-shadow:         /* create a black outline */ -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000,
    1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000;
}
#labels > div:hover {
  color: red;
}
</style>
