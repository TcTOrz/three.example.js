import * as THREE from './node_modules/three/build/three.module.js'

let cubes, renderer, scene, camera

// 将渲染器的大小设置为和窗口一致
const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

// window.addEventListener(
//   'resize',
//   () => {
//     if (resizeRendererToDisplaySize(renderer)) {
//       const canvas = renderer.domElement
//       camera.aspect = canvas.clientWidth / canvas.clientHeight
//       camera.updateProjectionMatrix()
//     }
//   },
//   false
// )

const makeInstance = (color, x) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = x
  // scene.add(cube)
  return cube
}

const main = () => {
  const canvas = document.querySelector('#c')
  // 创建一个webgl渲染器
  renderer = new THREE.WebGLRenderer({ canvas })
  // 创建一个透视相机
  camera = new THREE.PerspectiveCamera(
    75, // **垂直**方向75度视角
    canvas.clientWidth / canvas.clientHeight,
    // 2 / 1, // 画布宽高比**不是页面宽高比**
    0.1, // 近裁面位置
    5 // 远裁面位置
  )
  camera.position.z = 2 // 摄像机默认是往z轴负方向看，可能在原点的放置的东西看不清，所以往上移(z正方向)一点。
  // 创建一个场景
  scene = new THREE.Scene()
  // 创建一个立方体(几何体)
  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // 创建一个材质
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
  // 创建一个网格
  // cube = new THREE.Mesh(geometry, material)

  cubes = [
    makeInstance(0x44aa88, 0),
    makeInstance(0x8844aa, -2),
    makeInstance(0xaa8844, 2),
  ]
  // console.log(cubes)
  // 将立方体添加到场景中
  cubes.forEach((cube) => scene.add(cube))
  // scene.add(cube)
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)

  // 将摄像机和场景传递到渲染器
  renderer.render(scene, camera)
}

main()

const render = (time) => {
  time *= 0.001 // 时间变成秒

  // 执行一圈的弧度为2π, 所以一圈大概需要6.28s
  // 一弧度等于180°, Math.PI / 180
  // cube.rotation.x = time
  // cube.rotation.y = time
  cubes.forEach((cube, idx) => {
    cube.rotation.x = time * (idx * 0.1 + 1)
    cube.rotation.y = time * (idx * 0.1 + 1)
  })

  // cube.rotation.x = 360 * (Math.PI / 180)
  // cube.rotation.y = 45

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  // 解决图形变形的问题
  // const canvas = renderer.domElement
  // camera.aspect = canvas.clientWidth / canvas.clientHeight
  // camera.updateProjectionMatrix()

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
requestAnimationFrame(render)
