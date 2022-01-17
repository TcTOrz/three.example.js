/*
 * @Author: Li Jian
 * @Date: 2022-01-13 09:31:45
 * @LastEditTime: 2022-01-17 15:39:09
 * @LastEditors: Li Jian
 */

import { Ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { makeKeyControl } from '@shared'

type TypeTuples =
  | 'click'
  // | 'mouseover'
  // | 'mouseout'
  // | 'mouseenter'
  // | 'mouseleave'
  // | 'mousedown'
  // | 'mouseup'
  // | 'dblclick'
  | 'keydown'

export const makeEvent = (
  elem: HTMLDivElement | Window,
  type: TypeTuples,
  eventFn: EventListenerOrEventListenerObject
) => {
  elem.addEventListener(type, eventFn)
  return () => {
    console.log('Event has been removed!')
    elem.removeEventListener(type, eventFn)
  }
}

// 进入/离开房间事件
export const eventFn = (
  isInRoom: Ref<Boolean>,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  cameraPosition: THREE.Vector3Tuple
) => {
  return function (e: Event) {
    if ((e.target as HTMLInputElement).dataset.flag === 'enter') {
      isInRoom.value = true // 进入房间
      const group = scene.getObjectByName('ElectricHut') as THREE.Group
      /**
       * 摄像机位置与控制器位置不能一样，否则控制器无法控制
       * 这里纠结了半天，摄像机的视角是控制器的范围，控制器的拖动范围是摄像机的视角
       */
      camera.position.set(
        group.position.x + 0.1, // 摄像机x位置加0.1的目的是与controls的位置区分开
        group.position.y + 1, // 摄像机与controls的y位置加1使其居中
        group.position.z
      )
      // controls.target.add(
      //   new THREE.Vector3(group.position.x, group.position.y + 1, group.position.z)
      // )
      controls.target.set(group.position.x, group.position.y + 1, group.position.z)
    } else if ((e.target as HTMLInputElement).dataset.flag === 'leave') {
      isInRoom.value = false // 离开房间
      camera.position.set(...cameraPosition)
      // controls.target.add(new THREE.Vector3(0, 0, 0))
      controls.target.set(0, 0, 0)
    }
  }
}

let keys: { [key: string]: boolean } = {
  w: false,
  a: false,
  s: false,
  d: false,
}
// 键盘控制 WwAaSsDd↑↓←→ 进入房间后才能控制
export const eventKeyDown = (camera: THREE.PerspectiveCamera, controls: OrbitControls) => {
  return function (e: any) {
    switch (e.key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
        keys.w = true
        keys.a = keys.s = keys.d = false
        break
      case 'a':
      case 'A':
      case 'ArrowLeft':
        keys.a = true
        keys.w = keys.s = keys.d = false
        break
      case 's':
      case 'S':
      case 'ArrowDown':
        keys.s = true
        keys.w = keys.a = keys.d = false
        break
      case 'd':
      case 'D':
      case 'ArrowRight':
        keys.d = true
        keys.w = keys.a = keys.s = false
        break
    }
    console.log('you pressed the key: ', e.key)
    makeKeyControl(camera, controls, keys)
  }
}
