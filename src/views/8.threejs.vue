<!--
 * @Author: Li Jian
 * @Date: 2022-01-07 10:35:02
 * @LastEditTime: 2022-01-17 15:48:25
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
  // makeKeyControl,
  // makeFiber,
  makeText,
  makeDom,
  makeEvent,
  eventFn,
  eventKeyDown,
} from '@shared'
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { onBeforeRouteLeave } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let canvas: HTMLCanvasElement
let renderer: THREE.Renderer
let scene: THREE.Scene
// 相机初始位置变量定义
const cameraPosition: THREE.Vector3Tuple = [-10, 5, 5]
let camera: THREE.PerspectiveCamera
let controls: OrbitControls
// 自定义事件变量
let removeEvent: Function, removeEvent2: Function, removeEvent3: Function
// 标志位, 用于判断是否在房间内部
const isInRoom = ref(false)

async function main() {
  canvas = document.querySelector('#c8') as HTMLCanvasElement
  if (!canvas) return
  renderer = new THREE.WebGLRenderer({ canvas })
  scene = new THREE.Scene()
  scene.background = new THREE.Color('white')
  camera = makePerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000,
    cameraPosition
  )

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  const stats = new (Stats as any)()
  document.body.appendChild(stats.dom)

  await loadModel(scene, './blender/场景/ElectricStation')
  // await loadModel(scene, './blender/柜子/scene')

  controls = makeControl(camera, renderer)

  const elemEnter: HTMLDivElement = makeDom({ textContent: '进入', flag: 'enter' })
  const elemLeave: HTMLDivElement = makeDom({ textContent: '离开', flag: 'leave' })

  // 需要存储到localStorage中的数据,
  // 否则静态刷新无法获取到值从而影响事件的卸载。
  // <应该只影响开发环境>
  // use removeEvent() to remove event
  removeEvent = makeEvent(
    elemEnter,
    'click',
    eventFn(isInRoom, scene, camera, controls, cameraPosition)
  )
  removeEvent2 = makeEvent(
    elemLeave,
    'click',
    eventFn(isInRoom, scene, camera, controls, cameraPosition)
  )

  const render = () => {
    requestAnimationFrame(render)

    stats.update()

    makeText(canvas, camera, scene, elemEnter)
    makeText(canvas, camera, scene, elemLeave)

    controls.update()

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

watchEffect(() => {
  if (isInRoom.value) {
    console.log('enter the room')
    removeEvent3 = makeEvent(window, 'keydown', eventKeyDown(camera, controls))
  } else {
    // 清除掉之前的事件
    console.log('leave the room')
    removeEvent3 && removeEvent3()
  }
})

onBeforeRouteLeave(() => {
  console.log('before leave')
  removeEvent && removeEvent()
  removeEvent2 && removeEvent2()
  removeEvent3 && removeEvent3()
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
