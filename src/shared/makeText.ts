/*
 * @Author: Li Jian
 * @Date: 2022-01-12 14:29:42
 * @LastEditTime: 2022-03-30 15:12:25
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
  let mesh
  if (elem.dataset.flag === 'enter') {
    // this method is awesome!
    mesh = scene.getObjectByName('房间外面点') as THREE.Group
  } else if (elem.dataset.flag === 'leave') {
    mesh = scene.getObjectByName('房间里面点001') as THREE.Group
  }
  if (!mesh) return
  mesh.visible = false
  const tempV = new THREE.Vector3()
  mesh?.updateWorldMatrix(true, false)
  mesh?.getWorldPosition(tempV)
  tempV.project(camera)

  raycaster.setFromCamera(tempV, camera)
  const intersectedObjects = raycaster.intersectObjects(scene.children)
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
