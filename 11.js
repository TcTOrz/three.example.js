/*
 * @Author: Li Jian
 * @Date: 2021-12-17 09:24:48
 * @LastEditTime: 2021-12-17 16:35:11
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
// import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js'

import {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  makeControls,
  makeDirectionalLight,
  makeHemisphereLight,
  makePlane,
  makeTower,
} from './share/index.js'

// 设置全局值
let canvas, renderer, scene, camera

// 全局参数, 相机参数
let fov = 70,
  aspect = (canvas) => canvas.width / canvas.height,
  near = 0.1,
  far = 1000,
  position = [0, 10, 20]

// 全局参数, 地面大小
let plainSizeWidth = 200,
  plainSizeHeight = 100,
  loaderUrl = '../static/images/checker.png'

const main = () => {
  canvas = document.querySelector('#c')
  renderer = new THREE.WebGLRenderer({ canvas })
  camera = makePerspectiveCamera(fov, aspect(canvas), near, far, position)
  scene = new THREE.Scene()
  scene.background = new THREE.Color('black')
  const controls = makeControls(camera, canvas)

  // 地面
  const plane = makePlane(plainSizeWidth, plainSizeHeight, loaderUrl)
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  // 灯光
  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = makeHemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }
  {
    const color = 0xffffff
    const intensity = 1
    const light = makeDirectionalLight(color, intensity, [0, 10, 0], [-5, 0, 0])
    scene.add(light)
    scene.add(light.target)
  }

  makeTower(
    scene,
    '../blender/tower/corset-power-transmission-tower.mtl',
    '../blender/tower/corset-power-transmission-tower.obj'
  )

  const render = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
