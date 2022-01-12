/*
 * @Author: Li Jian
 * @Date: 2022-01-12 14:29:42
 * @LastEditTime: 2022-01-12 16:21:44
 * @LastEditors: Li Jian
 * @Description: 渲染点击文字
 */
import * as THREE from 'three'

const raycaster = new THREE.Raycaster()
export const makeText = (
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  elem: HTMLDivElement
) => {
  const group = scene.children[1]
  const children = group?.children
  if (!children) return
  const obj = children.find(child => child.name === 'ElectricHut') // 房子

  const tempV = new THREE.Vector3()
  const mesh = obj?.children[0] // 房子的第一个子元素
  mesh?.updateWorldMatrix(true, false)
  mesh?.getWorldPosition(tempV)
  tempV.project(camera)

  // ask the raycaster for all the objects that intersect
  // from the eye toward this object's position
  raycaster.setFromCamera(tempV, camera)
  const intersectedObjects = raycaster.intersectObjects(scene.children)
  // We're visible if the first intersection is this object.
  const show = intersectedObjects.length && mesh === intersectedObjects[0].object

  if (!show || Math.abs(tempV.z) > 1) {
    // hide the label
    elem.style.display = 'none'
  } else {
    // un-hide the label
    elem.style.display = ''
    const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth
    const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight
    elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
    elem.style.zIndex = `${((-tempV.z * 0.5 + 0.5) * 100000) | 0}`
  }
}
