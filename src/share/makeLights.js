/*
 * @Author: Li Jian
 * @Date: 2021-12-17 14:36:18
 * @LastEditTime: 2021-12-22 22:09:01
 * @LastEditors: Li Jian
 * @Description: 灯光
 */
import * as THREE from 'three'

// 方向光
function makeDirectionalLight(color, intensity, position, targetPosition) {
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(...position)
  light.target.position.set(...targetPosition)
  return light
}

// 半球光
function makeHemisphereLight(skyColor, groundColor, intensity) {
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
  return light
}

// 环境光
function makeAmbientLight(color, intensity) {
  const light = new THREE.AmbientLight(color, intensity)
  return light
}

export { makeDirectionalLight, makeHemisphereLight, makeAmbientLight }
