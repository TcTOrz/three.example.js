/*
 * @Author: Li Jian
 * @Date: 2022-01-13 09:31:45
 * @LastEditTime: 2022-02-14 14:21:29
 * @LastEditors: Li Jian
 */

import { Ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { makeKeyControl } from '@shared'
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

type TypeTuples =
  | 'click'
  | 'mousemove'
  // | 'mouseover'
  // | 'mouseout'
  // | 'mouseenter'
  | 'mouseleave'
  // | 'mousedown'
  // | 'mouseup'
  // | 'dblclick'
  | 'keydown'
  | 'change'

export const makeEvent = (
  elem: HTMLDivElement | Window | HTMLCanvasElement | OrbitControls,
  type: TypeTuples,
  eventFn: any //: EventListenerOrEventListenerObject
) => {
  elem.addEventListener(type, eventFn)
  return () => {
    console.log('Event has been removed!')
    elem.removeEventListener(type, eventFn)
  }
}

const animateCamera = (
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  oldPosition: THREE.Vector3,
  oldControl: THREE.Vector3,
  newPosition: THREE.Vector3,
  newControl: THREE.Vector3,
  callback: Function
) => {
  const tween = new TWEEN.Tween({
    x1: oldPosition.x, // 相机x
    y1: oldPosition.y, // 相机y
    z1: oldPosition.z, // 相机z
    x2: oldControl.x, // 控制点的中心点x
    y2: oldControl.y, // 控制点的中心点y
    z2: oldControl.z, // 控制点的中心点z
  })
  tween.to(
    {
      x1: newPosition.x,
      y1: newPosition.y,
      z1: newPosition.z,
      x2: newControl.x,
      y2: newControl.y,
      z2: newControl.z,
    },
    1000
  )
  tween.onUpdate(object => {
    camera.position.set(object.x1, object.y1, object.z1)
    controls.target.set(object.x2, object.y2, object.z2)
    controls.update()
  })
  tween.onComplete(() => {
    callback()
  })
  tween.easing(TWEEN.Easing.Cubic.InOut)
  tween.start()
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
    const group = scene.getObjectByName('ElectricHut') as THREE.Group
    const oldPos = new THREE.Vector3()
    camera.getWorldPosition(oldPos)
    if ((e.target as HTMLInputElement).dataset.flag === 'enter') {
      isInRoom.value = true // 进入房间
      /**
       * 摄像机位置与控制器位置不能一样，否则控制器无法控制
       * 这里纠结了半天，摄像机的视角是控制器的范围，控制器的拖动范围是摄像机的视角
       */
      // camera.position.set(
      //   group.position.x + 0.1, // 摄像机x位置加0.1的目的是与controls的位置区分开
      //   group.position.y + 1, // 摄像机与controls的y位置加1使其居中
      //   group.position.z
      // )
      // controls.target.set(group.position.x, group.position.y + 1, group.position.z)
      animateCamera(
        camera,
        controls,
        // new THREE.Vector3(...cameraPosition),
        oldPos,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(group.position.x, group.position.y + 1, group.position.z - 0.1),
        new THREE.Vector3(group.position.x, group.position.y + 1, group.position.z),
        () => {
          console.log('animateCamera complete')
        }
      )
    } else if ((e.target as HTMLInputElement).dataset.flag === 'leave') {
      isInRoom.value = false // 离开房间
      // camera.position.set(...cameraPosition)
      // controls.target.set(0, 0, 0)
      animateCamera(
        camera,
        controls,
        // new THREE.Vector3(group.position.x, group.position.y + 1, group.position.z - 0.1),
        oldPos,
        new THREE.Vector3(group.position.x, group.position.y + 1, group.position.z),
        new THREE.Vector3(...cameraPosition),
        new THREE.Vector3(0, 0, 0),
        () => {
          console.log('animateCamera complete')
        }
      )
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
