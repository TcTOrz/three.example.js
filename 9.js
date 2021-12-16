/*
 * @Author: Li Jian
 * @Date: 2021-12-14 08:31:33
 * @LastEditTime: 2021-12-16 11:38:53
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
// import { CinematicCamera } from './node_modules/three/examples/jsm/cameras/CinematicCamera.js'
import * as GeometryUtils from './node_modules/three/examples/jsm/utils/GeometryUtils.js'

// 摄像机
const makeCamera = (canvas, fov = 40) => {
  const aspect = canvas.width / canvas.height
  const near = 0.1
  const far = 100
  return new THREE.PerspectiveCamera(fov, aspect, near, far)
  // return new CinematicCamera(fov, aspect, near, far)
}

// 小地图相机初始化，默认为透视相机
const makeSmallMapCamera = (canvas, fov = 40, type = 'perspective') => {
  // 透视相机
  if (type === 'perspective') {
    return makeCamera(canvas, fov)
  }
  // 正交相机
  return new THREE.OrthographicCamera(-25, 25, 25, -25, 0.1, 100)
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
    light.shadow.camera.far = 100
    light.shadow.bias = 0.001
    light.shadow.near = 1
  }
}

// 控制器
let controls
const makeControls = (camera, canvas) => {
  controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  // 视野距离
  // controls.minDistance = 5
  controls.maxDistance = 50
  // 垂直角度
  controls.maxPolarAngle = (Math.PI / 8) * 3
  controls.minPolarAngle = Math.PI / 3
  // 水平旋转角度
  // controls.maxAzimuthAngle = Math.PI / 2
  // controls.minAzimuthAngle = -Math.PI / 3
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
  house.customObject = {
    name: '我点击了一个房子',
    width,
    height,
    x,
    z,
  }
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

  fence.customObject = {
    name: '这是墙壁',
    width: 0,
    height: 0,
    x,
    z,
  }

  fence.position.set(x, 0, z)
  scene.add(fence)

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

  window.addEventListener('click', (event) => {
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

// 渲染点击事件，点击Object3d时，改变其颜色
let INTERSECTED
const renderEvents = (mouse, camera, raycaster, scene) => {
  // mouse默认是Vector2(0, 0)，所以需要去除这种特殊情况
  if (mouse.x !== 0 || mouse.y !== 0) {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    // intersects索引最后一位必定是最远的，这里就是groundMesh
    // intersects.length !== 1去除地面阴影
    if (intersects.length > 0 && intersects.length !== 1) {
      if (INTERSECTED) {
        // 新旧值比较，不相同说明需要更新当前点击的对象，
        // 先还原就值
        if (INTERSECTED.uuid !== intersects[0].uuid) {
          if (INTERSECTED.parent.type === 'Object3D') {
            handleCustomDom()
            INTERSECTED.parent.children.map((obj) => {
              obj.material.emissive.setHex(obj.currentHex)
            })
          } else {
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
          }
          INTERSECTED = intersects[0].object
        }
        // 更新当前点击的对象的颜色
        if (INTERSECTED.parent.type === 'Object3D') {
          handleCustomDom(INTERSECTED.parent?.customObject)
          INTERSECTED.parent.children.map((obj, idx) => {
            obj.material.emissive.setHex(obj.currentHex)
            obj.currentHex = obj.material.emissive.getHex()
            obj.material.emissive.setHex(0xff0000)
          })
        } else {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
          INTERSECTED.material.emissive.setHex(0xff0000)
        }
      } else {
        // 第一次点击时，更新当前点击的对象
        INTERSECTED = intersects[0].object
        if (INTERSECTED.parent.type === 'Object3D') {
          handleCustomDom(INTERSECTED.parent?.customObject)
          INTERSECTED.parent.children.map((obj) => {
            obj.currentHex = obj.material.emissive.getHex()
            obj.material.emissive.setHex(0xff0000)
          })
        } else {
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex()
          INTERSECTED.material.emissive.setHex(0xff0000)
        }
      }
    } else {
      // 没有点击到对象时，还原上一次点击的对象
      if (INTERSECTED) {
        if (INTERSECTED.parent.type === 'Object3D') {
          handleCustomDom()
          INTERSECTED.parent.children.map((obj) => {
            obj.material.emissive.setHex(obj.currentHex)
          })
        } else {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
        }
      }
      INTERSECTED = null
    }
  }
}

// 渲染小地图
const renderSmallMap = (renderer, scene, camera, smallMapCamera, controls) => {
  renderer.clearDepth()
  renderer.setScissorTest(true)
  renderer.setScissor(
    (window.innerWidth / 3) * 2,
    (window.innerHeight / 3) * 2,
    window.innerWidth / 3,
    window.innerHeight / 3
  )
  renderer.setViewport(
    (window.innerWidth / 3) * 2,
    (window.innerHeight / 3) * 2,
    window.innerWidth / 3,
    window.innerHeight / 3
  )
  // 摄像机为Y轴正上方往下(xz)面看
  smallMapCamera.position.set(0, camera.position.y, 0)
  smallMapCamera.lookAt(camera.position.x, 0, camera.position.z)
  // 获取控制器垂直偏移角度，并计算获取正下方x轴需要旋转的值
  smallMapCamera.rotateX(Math.PI * 2 - controls.getPolarAngle())

  // 当canmera为<<透视相机>>才可生效
  smallMapCamera.position.set(0, controls.getDistance(), 0)

  renderer.render(scene, smallMapCamera)
  renderer.setScissorTest(false)
}

const handleCustomDom = (customObject) => {
  if (customObject) {
    const { name, width, height, x, z } = customObject
    const info = `${name}, 长: ${width}, 高: ${height}, 平面位置: x轴: ${x}, z轴: ${z}`
    document.querySelector('#info2').innerHTML = info
  } else {
    document.querySelector('#info2').innerHTML = ''
  }
}

const main = () => {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.autoClear = false
  // renderer.shadowMap.enabled = true

  const raycaster = new THREE.Raycaster()

  const camera = makeCamera(canvas, 70)
  camera.position.set(0, 4, 10).multiplyScalar(3)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  // 小地图 默认为透视相机，也可以传第三个参数，变为正交相机
  const smallMapCamera = makeSmallMapCamera(canvas, 70)
  // 搭建地板
  makeGroundMesh(scene)
  // 搭建房屋
  buildHouse(scene)
  // 搭建围墙
  buildFence(scene)
  // 灯光
  makeLight(scene, 0xffffff, 1)
  // 雾
  makeFog(scene)
  // 基本控制
  makeControls(camera, canvas)

  const render = (time) => {
    // 事件渲染
    renderEvents(mouse, camera, raycaster, scene)

    // 渲染器显示调整
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    // 自定义事件
    makeCustomControl(camera)

    // 主地图渲染
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    // 小地图渲染
    renderSmallMap(renderer, scene, camera, smallMapCamera, controls)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 事件声明
  makeEvents(canvas, renderer, scene, render)
}

main()
