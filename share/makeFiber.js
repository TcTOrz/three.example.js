/*
 * @Author: Li Jian
 * @Date: 2021-12-20 14:18:22
 * @LastEditTime: 2021-12-20 16:30:37
 * @LastEditors: Li Jian
 * @Description: 光缆
 */
import * as THREE from '../node_modules/three/build/three.module.js'
function makeFiber(scene) {
  const point = new THREE.Vector3()
  let splinePointsLength = 5
  let positions = [
    new THREE.Vector3(-50, 30, -50),
    new THREE.Vector3(-30, 10, -10),
    new THREE.Vector3(0, 20, 0),
    new THREE.Vector3(5, 10, 1),
    new THREE.Vector3(25, 50, 15),
  ]
  const splineHelperObjects = []
  const ARC_SEGMENTS = 200
  const splines = {}
  const geometry = new THREE.BufferGeometry()
  function addSplineObject(position) {
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    })
    const object = new THREE.Mesh(geometry, material)

    // if (position) {
    object.position.copy(position)
    // } else {
    //   object.position.x = Math.random() * 1000 - 500
    //   object.position.y = Math.random() * 600
    //   object.position.z = Math.random() * 800 - 400
    // }

    // object.castShadow = true
    // object.receiveShadow = true
    scene.add(object)
    splineHelperObjects.push(object)
    return object
  }
  for (let i = 0; i < splinePointsLength; i++) {
    addSplineObject(positions[i])
  }
  positions.length = 0

  for (let i = 0; i < splinePointsLength; i++) {
    positions.push(splineHelperObjects[i].position)
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3)
  )

  let curve = new THREE.CatmullRomCurve3(positions)
  curve.curveType = 'catmullrom'
  curve.mesh = new THREE.Line(
    geometry.clone(),
    new THREE.LineBasicMaterial({
      color: 0xff0000,
      opacity: 0.35,
    })
  )
  // curve.mesh.castShadow = true
  splines.uniform = curve

  curve = new THREE.CatmullRomCurve3(positions)
  curve.curveType = 'centripetal'
  curve.mesh = new THREE.Line(
    geometry.clone(),
    new THREE.LineBasicMaterial({
      color: 0x00ff00,
      opacity: 0.35,
    })
  )
  curve.mesh.castShadow = true
  splines.centripetal = curve

  curve = new THREE.CatmullRomCurve3(positions)
  curve.curveType = 'chordal'
  curve.mesh = new THREE.Line(
    geometry.clone(),
    new THREE.LineBasicMaterial({
      color: 0x0000ff,
      opacity: 0.35,
    })
  )
  curve.mesh.castShadow = true
  splines.chordal = curve

  for (const k in splines) {
    const spline = splines[k]
    scene.add(spline.mesh)
  }

  function load(new_positions) {
    // while (new_positions.length > positions.length) {
    //   addPoint()
    // }

    // while (new_positions.length < positions.length) {
    //   removePoint()
    // }

    // for (let i = 0; i < new_positions.length; i++) {
    //   positions[i].copy(new_positions[i])
    // }
    positions = new_positions
    console.log(positions)

    updateSplineOutline()
  }

  function updateSplineOutline() {
    console.log(splines)
    for (const k in splines) {
      const spline = splines[k]

      const splineMesh = spline.mesh
      const position = splineMesh.geometry.attributes.position

      for (let i = 0; i < ARC_SEGMENTS; i++) {
        const t = i / (ARC_SEGMENTS - 1)
        spline.getPoint(t, point)
        position.setXYZ(i, point.x, point.y, point.z)
      }

      position.needsUpdate = true
    }
  }

  load([
    new THREE.Vector3(-50, 30, -50),
    new THREE.Vector3(-30, 10, -10),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(25, 50, 15),
  ])
}

export default makeFiber
