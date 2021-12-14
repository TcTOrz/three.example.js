/*
 * @Author: Li Jian
 * @Date: 2021-12-14 08:31:33
 * @LastEditTime: 2021-12-14 22:00:01
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
// import { CinematicCamera } from './node_modules/three/examples/jsm/cameras/CinematicCamera.js'

// 摄像机
const makeCamera = (canvas, fov = 40) => {
  const aspect = canvas.width / canvas.height
  const near = 0.1
  const far = 100
  return new THREE.PerspectiveCamera(fov, aspect, near, far)
  // return new CinematicCamera(fov, aspect, near, far)
}

// 光源
const makeLight = (scene, color, intensity) => {
  {
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 20, 0)
    scene.add(light)
  }

  {
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(10, 20, 20)
    scene.add(light)
    light.castShadow = true
    light.receiveShadow = true
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048

    const d = 50
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d
    light.shadow.camera.far = 50
    light.shadow.bias = 0.001
    light.shadow.near = 1
  }
}

// 控制器
const makeControls = (camera, canvas) => {
  const controls = new OrbitControls(camera, canvas)
  // controls.target.set(0, 5, 0)
  controls.enableDamping = true
}

// 雾
const makeFog = (scene) => {
  {
    const near = 1
    const far = 100
    const color = 'white'
    scene.fog = new THREE.Fog(color, near, far)
    scene.background = new THREE.Color(color)
  }
}

// 尺寸自适应
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

// 地面网格
const makeGroundMesh = (scene) => {
  const groundGeometry = new THREE.PlaneBufferGeometry(50, 50)
  const groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(groundGeometry, groundMaterial)
  mesh.rotation.x = Math.PI / -2
  mesh.receiveShadow = true
  scene.add(mesh)
}

// 房屋
// { width, height }: 房屋宽高
// { x, z }: 房屋坐标
const makeHouseMesh = (scene, { width, height }, { x, z }) => {
  const house = new THREE.Object3D()
  scene.add(house)
  const houseBodyGeometry = new THREE.CylinderBufferGeometry(
    width,
    width,
    height,
    32
  )
  const houseBodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x00fff0,
  })
  const houseMesh = new THREE.Mesh(houseBodyGeometry, houseBodyMaterial)
  houseMesh.castShadow = true
  houseMesh.receiveShadow = true
  houseMesh.position.set(x, height / 2, z)
  house.add(houseMesh)
  const houseRoofGeometry = new THREE.ConeBufferGeometry(width, height, 32)
  const houseRoofMaterial = new THREE.MeshPhongMaterial({
    color: 0x00fff0,
  })
  const houseRoofMesh = new THREE.Mesh(houseRoofGeometry, houseRoofMaterial)
  houseRoofMesh.position.set(x, (height / 2) * 3, z)
  houseRoofMesh.castShadow = true
  houseRoofMesh.receiveShadow = true
  house.add(houseRoofMesh)
}

// 围墙
const makeFence = (scene, { x, z }, rotateY) => {
  const fence = new THREE.Object3D()
  const fenceNext = new THREE.Object3D()
  fenceNext.add(fence)
  fenceNext.position.set(x, 0, z)
  scene.add(fenceNext)

  const thinWallGeometry = new THREE.BoxBufferGeometry(0.2, 2, 3)
  const thinWallMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  })
  const thinWallMesh = new THREE.Mesh(thinWallGeometry, thinWallMaterial)
  thinWallMesh.position.set(0, 1, 0)
  const thickWallGeometry = new THREE.BoxBufferGeometry(0.5, 2.5, 0.5)
  const thickWallMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  })
  const thickWallMesh = new THREE.Mesh(thickWallGeometry, thickWallMaterial)
  thickWallMesh.position.set(0, 1, 1.5)
  fence.add(thinWallMesh)
  fence.add(thickWallMesh)

  thinWallMesh.receiveShadow = true
  thinWallMesh.castShadow = true
  thickWallMesh.receiveShadow = true
  thickWallMesh.castShadow = true

  if (rotateY) fence.rotation.y = rotateY
}

// 搭建围墙
const buildFence = (scene) => {
  let z = 21
  while (z > -24) {
    makeFence(scene, { x: 21, z })
    z -= 3
  }
  let x = 19.5
  while (x > -21) {
    makeFence(scene, { x, z: -22.5 }, Math.PI / 2)
    x -= 3
  }
  z = -21
  while (z < 24) {
    makeFence(scene, { x: -21, z }, -Math.PI)
    z += 3
  }
  x = -19.5
  while (x < 21) {
    makeFence(scene, { x, z: 22.5 }, Math.PI / -2)
    x += 3
  }
}

// 搭建房屋
const buildHouse = (scene) => {
  makeHouseMesh(scene, { width: 1, height: 2 }, { x: 0, z: 0 })
  makeHouseMesh(scene, { width: 1.3, height: 5 }, { x: 10, z: 13 })
}

let tapZ, tapW, tapA, tapS, tapD
let mouse = new THREE.Vector2()
const makeEvents = (canvas, renderer, scene, render) => {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'z':
        // switchPerspective(canvas, renderer, scene, render)
        tapZ = true
        tapW = tapA = tapS = tapD = false
        break
      case 'w':
        tapW = true
        tapZ = tapA = tapS = tapD = false
        break
      case 'a':
        tapA = true
        tapZ = tapW = tapS = tapD = false
        break
      case 's':
        tapS = true
        tapZ = tapW = tapA = tapD = false
        break
      case 'd':
        tapD = true
        tapZ = tapW = tapA = tapS = false
        break
    }
  })

  window.addEventListener('mousemove', (event) => {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  })
}

// 自定义控制指令
// w: 前进 a: 左 s: 后退 d: 右 z: 切换视角
const makeCustomControl = (camera) => {
  const playerDirection = new THREE.Vector3()
  if (tapZ) {
    tapZ = false
    camera.position.set(10, 2, 20)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }
  function getForwardVector() {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    return playerDirection
  }
  function getSideVector() {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    playerDirection.cross(camera.up)
    return playerDirection
  }
  if (tapW) {
    tapW = false
    getForwardVector().multiplyScalar(0.5)
    camera.position.add(playerDirection)
  }
  if (tapS) {
    tapS = false
    getForwardVector().multiplyScalar(-0.5)
    camera.position.add(playerDirection)
  }
  if (tapA) {
    tapA = false
    getSideVector().multiplyScalar(-0.5)
    camera.position.add(playerDirection)
  }
  if (tapD) {
    tapD = false
    getSideVector().multiplyScalar(0.5)
    camera.position.add(playerDirection)
  }
}

const main = () => {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.shadowMap.enabled = true

  const raycaster = new THREE.Raycaster()
  let INTERSECTED

  const camera = makeCamera(canvas, 70)
  camera.position.set(8, 4, 10).multiplyScalar(3)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  // 搭建地板
  makeGroundMesh(scene)

  // 搭建房屋
  buildHouse(scene)
  // 搭建围墙
  buildFence(scene)

  makeLight(scene, 0xffffff, 1)

  makeFog(scene)

  makeControls(camera, canvas)

  const render = (time) => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    console.log(intersects)
    if (intersects.length > 0) {
      const targetDistance = intersects[0].distance
      if (INTERSECTED) {
        if (INTERSECTED.distance > targetDistance) {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
          INTERSECTED = intersects[0].object
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
          INTERSECTED.material.emissive.setHex(0xff0000)
        }
      } else {
        INTERSECTED = intersects[0].object
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
        INTERSECTED.material.emissive.setHex(0xff0000)
      }
    } else {
      if (INTERSECTED) {
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
      }
      INTERSECTED = null
    }

    //   camera.focusAt(targetDistance) // using Cinematic camera focusAt method

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    // console.log(tapZ, tapW, tapA, tapS, tapD)

    makeCustomControl(camera)

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  makeEvents(canvas, renderer, scene, render)
}

main()
