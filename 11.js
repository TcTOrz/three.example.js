/*
 * @Author: Li Jian
 * @Date: 2021-12-17 09:24:48
 * @LastEditTime: 2021-12-20 16:31:03
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
// import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js'

import {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  makeThumbCamera,
  makeControls,
  makeDirectionalLight,
  makeHemisphereLight,
  makePlane,
  makeTower,
  renderThumbMap,
  makeFiber,
} from './share/index.js'

// 设置全局值
let canvas, renderer, scene, camera, thumbCamera

// 天空颜色
let skyColor = 0xb5c8db

// 全局参数, 相机参数
let fov = 70,
  aspect = (canvas) => canvas.width / canvas.height,
  near = 0.1,
  far = 1000,
  position = [0, 70, 50]

// 全局参数, 地面大小
let plainSizeWidth = 300,
  plainSizeHeight = 200,
  // loaderUrl = '../static/images/checker.png'
  loaderUrl = '../static/images/grass.jpg'

const main = () => {
  canvas = document.querySelector('#c')
  renderer = new THREE.WebGLRenderer({ canvas })
  camera = makePerspectiveCamera(fov, aspect(canvas), near, far, position)
  scene = new THREE.Scene()
  scene.background = new THREE.Color(skyColor)
  const controls = makeControls(camera, canvas)

  // 缩略图
  thumbCamera = makeThumbCamera(
    fov,
    aspect(canvas),
    near,
    far,
    position,
    plainSizeWidth,
    plainSizeHeight,
    'perspective'
  )

  // 地面
  const plane = makePlane(plainSizeWidth, plainSizeHeight, loaderUrl)
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  // 灯光
  // {
  //   const skyColor = 0xb1e1ff // light blue
  //   const groundColor = 0xb97a20 // brownish orange
  //   const intensity = 1
  //   const light = makeHemisphereLight(skyColor, groundColor, intensity)
  //   scene.add(light)
  // }
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
    '../blender/tower/corset-power-transmission-tower.obj',
    [0, 0, 0]
  )
  makeTower(
    scene,
    '../blender/tower/corset-power-transmission-tower.mtl',
    '../blender/tower/corset-power-transmission-tower.obj',
    [50, 0, 0]
  )

  // 光缆
  makeFiber(scene)

  const render = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    // 缩略图渲染
    renderThumbMap(renderer, scene, camera, thumbCamera, controls)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
