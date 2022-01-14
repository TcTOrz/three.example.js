<!--
 * @Author: Li Jian
 * @Date: 2022-01-07 10:35:02
 * @LastEditTime: 2022-01-14 16:26:13
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'
import * as THREE from 'three'
import {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  // makeDirectionalLight,
  // makeAmbientLight,
  // makeHemisphereLight,
  loadModel,
  makeControl,
  // makeFiber,
  makeText,
  makeDom,
  makeEvent,
} from '@shared'
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import Stats from 'three/examples/jsm/libs/stats.module'

async function main() {
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
    [-10, 5, 5]
  )

  // const flyControls = new FlyControls(camera, renderer.domElement)
  // flyControls.movementSpeed = 1000
  // flyControls.domElement = renderer.domElement
  // flyControls.rollSpeed = Math.PI / 24
  // flyControls.autoForward = false
  // flyControls.dragToLook = false

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

  // const helper = new THREE.CameraHelper(camera)
  // scene.add(helper)
  const stats = new (Stats as any)()
  document.body.appendChild(stats.dom)

  await loadModel(scene, './blender/场景/ElectricStation') // , makeFiber(0) // , makeText(canvas, camera)
  await loadModel(scene, './blender/柜子/scene')

  const controls = makeControl(camera, renderer)

  const elemEnter: HTMLDivElement = makeDom({ textContent: '进入', flag: 'enter' })
  const elemLeave: HTMLDivElement = makeDom({ textContent: '离开', flag: 'leave' })

  const eventFn = (e: MouseEvent) => {
    if ((e.target as HTMLInputElement).dataset.flag === 'enter') {
      const group = scene.getObjectByName('ElectricHut') as THREE.Group
      /**
       * 摄像机位置与控制器位置不能一样，否则控制器无法控制
       * 这里纠结了半天，摄像机的视角是控制器的范围，控制器的拖动范围是摄像机的视角
       */
      camera.position.set(
        group.position.x + 0.1, // 摄像机x位置加0.1的目的是与controls的位置区分开
        group.position.y + 1, // 摄像机与controls的y位置加1使其居中
        group.position.z
      )
      controls.target.set(group.position.x, group.position.y + 1, group.position.z)
    } else if ((e.target as HTMLInputElement).dataset.flag === 'leave') {
      camera.position.set(0, 10, 20)
      controls.target.set(0, 0, 0)
    }
  }

  // use removeEvent() to remove event
  const removeEvent = makeEvent(elemEnter, 'click', eventFn)
  const removeEvent2 = makeEvent(elemLeave, 'click', eventFn)

  const render = () => {
    requestAnimationFrame(render)

    stats.update()

    makeText(canvas, camera, scene, elemEnter)
    makeText(canvas, camera, scene, elemLeave)

    controls.update()

    // flyControls.update(0.1)

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

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
#loading
  .progress
    .url
    .img
      .progressbar
      .progress-number
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
#loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* display: flex; */
  display: none;
  justify-content: center;
  align-items: center;
}
#loading .progress {
  /* display: flex; */
  margin: 1.5em;
  border: 1px solid green;
  width: 50vw;
  /* align-items: center; */
}
#loading .progress .url {
  font-size: 12px;
  color: green;
}
#loading .progress .img {
  display: flex;
  width: inherit;
  align-items: center;
}
#loading .progressbar {
  width: inherit;
  margin: 2px;
  background: green;
  height: 1em;
  transform-origin: top left;
  transform: scaleX(0);
}
#loading .progress-number {
  /* margin: 0.5em; */
  font-size: 1.5em;
  font-weight: bold;
  color: green;
}
</style>
