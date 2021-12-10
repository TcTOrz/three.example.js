/*
 * @Author: Li Jian
 * @Date: 2021-12-10 09:28:28
 * @LastEditTime: 2021-12-10 14:50:31
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'

const main = () => {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setClearColor(0xaaaaaa)
  renderer.shadowMap.enabled = true
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

  function makeCamera(fov = 40) {
    const aspect = canvas.width / canvas.height
    const near = 0.1
    const far = 100
    return new THREE.PerspectiveCamera(fov, aspect, near, far)
  }

  const camera = makeCamera()
  camera.position.set(8, 4, 10).multiplyScalar(3)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 20, 0)
    scene.add(light)
    light.castShadow = true
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

  {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(1, 2, 4)
    scene.add(light)
  }

  const groundGeometry = new THREE.PlaneBufferGeometry(50, 50)
  const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
  })
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.receiveShadow = true
  scene.add(groundMesh)

  const carWidth = 4
  const carHeight = 1
  const carLength = 8

  const tank = new THREE.Object3D()
  scene.add(tank)

  const bodyGeometry = new THREE.BoxBufferGeometry(
    carWidth,
    carHeight,
    carLength
  )
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x6688aa })
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
  bodyMesh.castShadow = true
  bodyMesh.position.y = 1.4
  tank.add(bodyMesh)

  const tankCameraFov = 30
  const tankCamera = makeCamera(tankCameraFov)
  tankCamera.position.y = 3
  tankCamera.position.z = -6
  tankCamera.rotation.y = -Math.PI
  bodyMesh.add(tankCamera)

  const wheelRadius = 1
  const wheelThickness = 0.5
  const wheelSegments = 6
  const wheelGeometry = new THREE.CylinderBufferGeometry(
    wheelRadius,
    wheelRadius,
    wheelThickness,
    wheelSegments
  )
  const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 })
  const wheelPositions = [
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, carLength / 3],
    [carWidth / 2 + wheelThickness / 2, -carHeight / 2, carLength / 3],
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
    [carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
    [carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3],
  ]
  const wheelMeshes = wheelPositions.map((position) => {
    const mesh = new THREE.Mesh(wheelGeometry, wheelMaterial)
    mesh.position.set(...position)
    mesh.rotation.z = Math.PI / 2
    mesh.castShadow = true
    bodyMesh.add(mesh)
    return mesh
  })

  const domeRadius = 2
  const domeWidthSubdivisions = 12
  const domeHeightSubdivisions = 12
  const domePhiStart = 0
  const domePhiEnd = Math.PI * 2
  const domeThetaStart = 0
  const domeThetaEnd = Math.PI / 2
  const domeGeometry = new THREE.SphereBufferGeometry(
    domeRadius,
    domeWidthSubdivisions,
    domeHeightSubdivisions,
    domePhiStart,
    domePhiEnd,
    domeThetaStart,
    domeThetaEnd
  )
  const domeMesh = new THREE.Mesh(domeGeometry, bodyMaterial)
  domeMesh.castShadow = true
  bodyMesh.add(domeMesh)
  domeMesh.position.y = 0.5

  const turrentWidth = 0.1
  const turrentHeight = 0.1
  const turrentLength = carLength * 0.75 * 0.2
  const turrentGeometry = new THREE.BoxBufferGeometry(
    turrentWidth,
    turrentHeight,
    turrentLength
  )
  const turrentMesh = new THREE.Mesh(turrentGeometry, bodyMaterial)
  const turrentPivot = new THREE.Object3D()
  turrentMesh.castShadow = true
  turrentPivot.scale.set(5, 5, 5)
  turrentPivot.position.y = 0.5
  turrentMesh.position.z = turrentLength / 2
  turrentPivot.add(turrentMesh)
  bodyMesh.add(turrentPivot)

  const turrentCamera = makeCamera()
  turrentCamera.position.y = 0.75 * 0.2
  turrentMesh.add(turrentCamera)

  const targetGeometry = new THREE.SphereBufferGeometry(0.5, 6, 3)
  const targetMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    flatShading: true,
  })
  const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial)
  const targetOrbit = new THREE.Object3D()
  const targetElevation = new THREE.Object3D()
  const targetBob = new THREE.Object3D()
  targetMesh.castShadow = true
  scene.add(targetOrbit)
  targetOrbit.add(targetElevation)
  targetElevation.position.z = carLength * 2
  targetElevation.position.y = 8
  targetElevation.add(targetBob)
  targetBob.add(targetMesh)

  const targetCamera = makeCamera()
  const targetCameraPivot = new THREE.Object3D()
  targetCamera.position.y = 1
  targetCamera.position.z = -2
  targetCamera.rotation.y = Math.PI
  targetBob.add(targetCameraPivot)
  targetCameraPivot.add(targetCamera)

  const curve = new THREE.SplineCurve([
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(-5, 5),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(5, -5),
    new THREE.Vector2(10, 0),
    new THREE.Vector2(5, 10),
    new THREE.Vector2(-5, 10),
    new THREE.Vector2(-10, -10),
    new THREE.Vector2(-15, -8),
    new THREE.Vector2(-10, 0),
  ])

  const points = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
  const splineObject = new THREE.Line(geometry, material)
  splineObject.rotation.x = Math.PI * 0.5
  splineObject.position.y = 0.05
  scene.add(splineObject)

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

  const targetPosition = new THREE.Vector3()
  const tankPosition = new THREE.Vector2()
  const tankTarget = new THREE.Vector2()

  const cameras = [
    { cam: camera, desc: 'detached camera' },
    { cam: turrentCamera, desc: 'on turret looking at target' },
    { cam: targetCamera, desc: 'near target looking at tank' },
    { cam: tankCamera, desc: 'above back of tank' },
  ]

  // renderer.render(scene, camera)

  const infoElem = document.querySelector('#info')

  function render(time) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      cameras.forEach((cameraInfo) => {
        const camera = cameraInfo.cam
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      })
    }

    // move target
    targetOrbit.rotation.y = time * 0.27
    targetBob.position.y = Math.sin(time * 2) * 4
    targetMesh.rotation.x = time * 7
    targetMesh.rotation.y = time * 13
    targetMaterial.emissive.setHSL((time * 10) % 1, 1, 0.25)
    targetMaterial.color.setHSL((time * 10) % 1, 1, 0.25)

    // move tank
    const tankTime = time * 0.05
    curve.getPointAt(tankTime % 1, tankPosition)
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget)
    tank.position.set(tankPosition.x, 0, tankPosition.y)
    tank.lookAt(tankTarget.x, 0, tankTarget.y)

    // face turret at target
    targetMesh.getWorldPosition(targetPosition)
    turrentPivot.lookAt(targetPosition)

    // make the turretCamera look at target
    turrentCamera.lookAt(targetPosition)

    // make the targetCameraPivot look at the at the tank
    tank.getWorldPosition(targetPosition)
    targetCameraPivot.lookAt(targetPosition)

    wheelMeshes.forEach((obj) => {
      obj.rotation.x = time * 3
    })

    const camera = cameras[(time * 0.25) % cameras.length | 0]
    // const camera = cameras[0]
    infoElem.textContent = camera.desc

    renderer.render(scene, camera.cam)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
