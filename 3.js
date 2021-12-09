/*
 * @Author: Li Jian
 * @Date: 2021-12-09 14:05:32
 * @LastEditTime: 2021-12-09 17:01:06
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'

function main() {
  const objects = []

  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    40,
    canvas.width / canvas.height,
    0.1,
    1000
  )
  // scene.background = new THREE.Color('#333333')

  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)
  objects.push(solarSystem)

  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.set(10, 0, 0)
  solarSystem.add(earthOrbit)
  objects.push(earthOrbit)

  const moonOribit = new THREE.Object3D()
  moonOribit.position.set(2, 0, 0)
  earthOrbit.add(moonOribit)
  objects.push(moonOribit)

  // camera.position.set(0, 0, 50)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  let cameraHelper = new THREE.CameraHelper(camera)
  scene.add(cameraHelper)

  {
    const light = new THREE.PointLight(0xffffff, 3)
    // light.position.set()
    scene.add(light)
  }

  const radius = 1
  const widthSegments = 100
  const heightSegments = 100
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  )

  const sunMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xffff00,
  })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)
  objects.push(sunMesh)

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  })
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
  earthOrbit.add(earthMesh)
  // earthMesh.position.x = 10
  // solarSystem.add(earthMesh)
  // scene.add(earthMesh)
  objects.push(earthMesh)

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  })
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
  moonMesh.scale.set(0.5, 0.5, 0.5)
  moonOribit.add(moonMesh)
  objects.push(moonMesh)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time) {
    time *= 0.001
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    objects.forEach((object) => {
      const axes = new THREE.AxesHelper()
      axes.material.depthTest = false
      axes.renderOrder = 1
      object.add(axes)
      object.rotation.y = time
    })
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()

function main1() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })

  const fov = 40
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 150, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  {
    const color = 0xffffff
    const intensity = 3
    const light = new THREE.PointLight(color, intensity)
    scene.add(light)
  }

  const objects = []

  const radius = 1
  const widthSegments = 6
  const heightSegments = 6
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  )

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  scene.add(sunMesh)
  objects.push(sunMesh)

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  })
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
  earthMesh.position.x = 10
  sunMesh.add(earthMesh)
  objects.push(earthMesh)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    objects.forEach((obj) => {
      obj.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}
