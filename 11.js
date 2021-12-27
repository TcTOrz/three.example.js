/*
 * @Author: Li Jian
 * @Date: 2021-12-17 09:24:48
 * @LastEditTime: 2021-12-27 11:18:43
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'

import {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  makeOrthographicCamera,
  makeThumbCamera,
  makeControls,
  makeDirectionalLight,
  makeHemisphereLight,
  makePlane,
  makeTower,
  renderThumbMap,
  renderEvents,
  renderTextInfo,
} from './share/index.js'

import Stats from './node_modules/three/examples/jsm/libs/stats.module.js'

import basic from './data/basic.js'
import user from './data/user.js'

// 设置全局值
let canvas, renderer, scene, camera, thumbCamera
// 天空颜色
let { skyColor } = basic.color
// 全局参数, 相机参数
let { fov, aspect, near, far, position } = basic.camera
// 全局参数, 地面大小
let { plainSizeWidth, plainSizeHeight } = user.plane
let { imgUrl: loaderUrl } = basic.plane
// Stats
let stats

const main = () => {
  canvas = document.querySelector(basic.canvas)
  renderer = new THREE.WebGLRenderer({ canvas })
  camera = makePerspectiveCamera(fov, aspect(canvas), near, far, position)
  scene = new THREE.Scene()
  scene.background = new THREE.Color(skyColor)
  const controls = makeControls(camera, canvas)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  // 缩略图
  thumbCamera = makeThumbCamera(
    fov,
    aspect(canvas),
    near,
    far,
    position,
    plainSizeWidth,
    plainSizeHeight,
    //'orthographic' // 正交相机
    'perspective'
  )

  // 地面
  const plane = makePlane(plainSizeWidth, plainSizeHeight, loaderUrl)
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  // 灯光
  {
    const { color, intensity, position, targetPosition } =
      basic.lights.directionalLight
    const light = makeDirectionalLight(
      color,
      intensity,
      position,
      targetPosition
    )
    scene.add(light)
    scene.add(light.target)
  }

  // 杆塔 / 光缆
  {
    const { /*mtl, obj,*/ glb, scaler } = basic.tower
    const { towers } = user
    const towersPromise = []

    makeTower(scene, /*mtl, obj,*/ glb, towers, scaler)
  }

  // test
  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x3f3f3f })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.position.set(0, 5, 0)
  scene.add(box)

  // 渲染自定义点击事件
  renderEvents(camera, scene)

  const render = (time) => {
    stats.update()

    scene.rotation.y = (-time * 0.001) / 5

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true

    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    // 缩略图渲染
    renderThumbMap(renderer, scene, camera, thumbCamera, controls)
    // 渲染文字信息
    renderTextInfo(canvas, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
