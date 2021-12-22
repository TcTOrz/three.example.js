/*
 * @Author: Li Jian
 * @Date: 2021-12-17 09:24:48
 * @LastEditTime: 2021-12-22 22:20:28
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'

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
  makeFiber,
  renderEvents,
} from './share/index.js'

import basic from '../data/basic.js'
import user from '../data/user.js'

// 设置全局值
let canvas, renderer, scene, camera, thumbCamera
// 天空颜色
let { skyColor } = basic.color
// 全局参数, 相机参数
let { fov, aspect, near, far, position } = basic.camera
// 全局参数, 地面大小
let { plainSizeWidth, plainSizeHeight } = user.plane
let { imgUrl: loaderUrl } = basic.plane

const main = () => {
  canvas = document.querySelector(basic.canvas)
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
    'orthographic' // 正交相机
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
    const { mtl, obj, scaler } = basic.tower
    const { towers } = user
    const towersPromise = []
    // const loadManager = new THREE.LoadingManager()

    towers.map((info) => {
      towersPromise.push(makeTower(scene, mtl, obj, scaler, info))
    })

    // loadManager.onLoad = () => {
    Promise.all(towersPromise)
      .then((groups) => {
        // 光缆
        groups.map((group) => {
          makeFiber(scene, groups, group)
        })
      })
      .catch((err) => {
        console.log('杆塔', err)
      })
    // }

    // const loadingElem = document.querySelector('#loading')
    // const progressBarElem = loadingElem.querySelector('.progressbar')
    // loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    //   const progress = itemsLoaded / itemsTotal
    //   // loadingElem.style.display = 'none'
    //   console.log(progress, urlOfLastItemLoaded, itemsLoaded, itemsTotal)
    // }
    // loadManager.onStart = () => {
    //   // progressBarElem.style.transform = `scaleX(0)`
    //   console.log('开始')
    // }
    // loadManager.onEnd = () => {
    //   loadingElem.style.display = 'none'
    // }
  }

  // test
  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x3f3f3f })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.position.set(0, 5, 0)
  scene.add(box)

  // 渲染自定义点击事件
  renderEvents(camera, scene)

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
