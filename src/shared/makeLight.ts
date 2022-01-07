/*
 * @Author: Li Jian
 * @Date: 2022-01-07 14:44:11
 * @LastEditTime: 2022-01-07 15:32:28
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'

export const makeDirectionalLight = (
  color = 0xffffff,
  intensity = 1,
  position: THREE.Vector3Tuple = [0, 0, 0]
) => {
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(...position)
  return light
}

export const makeAmbientLight = (color = 0xffffff, intensity = 1) => {
  const light = new THREE.AmbientLight(color, intensity)
  return light
}

export const makeHemisphereLight = (skyColor = 0xb1e1ff, groundColor = 0xb97a20, intensity = 1) => {
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
  return light
}
