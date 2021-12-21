/*
 * @Author: Li Jian
 * @Date: 2021-12-21 21:54:53
 * @LastEditTime: 2021-12-21 22:14:04
 * @LastEditors: Li Jian
 */
import * as THREE from '../node_modules/three/build/three.module.js'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let INTERSECTED // 当前被选中的对象
function onMouseClick(event) {
  event.preventDefault()
  event.stopPropagation()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

window.addEventListener('click', onMouseClick, false)

function renderEvents(camera, scene) {
  if (mouse.x !== 0 && mouse.y !== 0) {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    const intersect = intersects[0] // 只取第一个,第一个靠的最近
    if (
      // 当且只有为塔杆和电缆时才会触发
      intersect?.object.name === 'Tower' ||
      intersect?.object.name === 'Fiber'
    ) {
      if (INTERSECTED) {
        INTERSECTED.material.color.set(INTERSECTED.currentColor)
      }
      INTERSECTED = intersect.object
      INTERSECTED.currentColor = INTERSECTED.material.color
      INTERSECTED.material.color = new THREE.Color(0xff0000)
    }
  }
}

export default renderEvents
