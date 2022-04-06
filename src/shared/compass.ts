/*
 * @Author: Li Jian
 * @Date: 2022-04-06 16:12:27
 * @LastEditTime: 2022-04-06 16:46:13
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'
import { ref } from 'vue'
export let deg = ref(0)

export const compass = (camera: any) => {
  const dir = new THREE.Vector3(camera.position.x, 0, camera.position.z).normalize()
  const theta = Math.atan2(dir.x, dir.z)
  // @ts-ignore
  deg.value = THREE.Math.radToDeg(theta)
}
