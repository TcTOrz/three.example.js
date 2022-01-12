/*
 * @Author: Li Jian
 * @Date: 2022-01-11 09:33:14
 * @LastEditTime: 2022-01-12 11:46:42
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
// import { MeshLine, MeshLineMaterial } from 'three.meshline'

interface CatmullRomCurve3Type extends THREE.CatmullRomCurve3 {
  curveType?: String
  mesh?: THREE.Line
}

/**
 * @param type
 * @returns
 * @description 曲线预处理
 */
export const makeFiber = (type: Number) => {
  if (type === 0) {
    return function (scene: THREE.Scene, group: THREE.Group) {
      console.log('fiber', 0, group)
      const children: Array<THREE.Object3D<THREE.Event>> = group.children
      const obj: THREE.Object3D<THREE.Event> | undefined = children.find(
        (item: any) => item.name === 'NurbsPath008'
      )
      const vec3Pos: THREE.Vector3 | undefined = obj?.position
      // console.log(obj?.getWorldPosition(new THREE.Vector3()),
      //   vec3Pos,
      //   obj?.applyMatrix4(new THREE.Matrix4()));
      console.log(obj?.getWorldPosition(new THREE.Vector3()))
      // console.log(obj?.matrix, new THREE.Vector3().transformDirection(obj?.matrix));

      // console.log(vec3Pos)
      if (!vec3Pos) return
      renderFiber2(scene, [
        vec3Pos,
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(0, 0.7071068286895752, 0),
        // new THREE.Vector3(0.23483622074127197, 2.139436721801758, 2.0102968215942383),
      ])
    }
  }
}

/**
 * @param scene
 * @param positions
 * @description 渲染线段, line2方式，该方式支持线段粗细
 */
function renderFiber2(scene: THREE.Scene, positions: Array<THREE.Vector3>) {
  if (positions.length < 2) return
  // 有线条粗细
  const curve: CatmullRomCurve3Type = new THREE.CatmullRomCurve3(positions)
  const points = curve.getPoints(50)
  const geometry = new LineGeometry()
  geometry.setPositions(points.map(item => [item.x, item.y, item.z]).flat())
  const material = new LineMaterial({
    color: 0x7f7f7f,
    linewidth: 0.005,
  })
  const curveObject = new Line2(geometry, material)
  scene.add(curveObject)
}

/**
 * @param scene
 * @param positions
 * @description 渲染线段, line方式，该方式比较简单，但是不支持线段粗细
 */
function renderFiber(scene: THREE.Scene, positions: Array<THREE.Vector3>) {
  // 没有线条粗细
  const point = new THREE.Vector3()
  const ARC_SEGMENTS = 64
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3)
  )
  let curve: CatmullRomCurve3Type = new THREE.CatmullRomCurve3(positions)
  curve.curveType = 'chordal'
  curve.mesh = new THREE.Line(
    geometry.clone(),
    new THREE.LineBasicMaterial({
      color: 0x7f7f7f,
    })
  )
  curve.mesh.castShadow = true
  curve.mesh.name = 'Fiber' // 增加名字

  scene.add(curve.mesh)
  const splineMesh = curve.mesh
  const position = splineMesh?.geometry.attributes.position
  if (!position) return
  for (let i = 0; i < ARC_SEGMENTS; i++) {
    const t = i / (ARC_SEGMENTS - 1)
    curve.getPoint(t, point)
    position?.setXYZ(i, point.x, point.y, point.z)
  }
  position.needsUpdate = true
}
