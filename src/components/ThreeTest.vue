<!--
 * @Author: Li Jian
 * @Date: 2022-01-04 20:10:14
 * @LastEditTime: 2022-01-04 20:26:09
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
onMounted(() => {
  function main() {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({ canvas })
    const scene = new THREE.Scene()

    const fov = 75
    const aspect = 2 // canvas.width / canvas.height
    const near = 0.1
    const far = 100
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    // 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。
    camera.position.set(0, 0, 2)

    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    {
      const light = new THREE.DirectionalLight(0xffffff)
      const intensity = 1
      light.position.set(0, 0, 2)
      scene.add(light)
    }

    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 0, 0)
    controls.maxDistance = 200 // 视野距离
    // 垂直角度
    controls.maxPolarAngle = Math.PI / 3
    controls.minPolarAngle = -Math.PI / 3
    // 水平旋转角度
    // controls.maxAzimuthAngle = Math.PI / 2
    // controls.minAzimuthAngle = -Math.PI / 3
    controls.update()

    const animate = (time) => {
      time *= 0.001
      cube.rotation.x = time
      cube.rotation.y = time
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  main()
})
</script>

<template>
  <canvas
    id="c"
    width="600"
    height="300"
    style="width: 600px; height: 300px"
  ></canvas>
</template>

<style>
#c {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
