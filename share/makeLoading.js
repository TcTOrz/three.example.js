/*
 * @Author: Li Jian
 * @Date: 2021-12-22 15:11:23
 * @LastEditTime: 2021-12-22 16:54:59
 * @LastEditors: Li Jian
 */
import * as THREE from '../node_modules/three/build/three.module.js'

const loadingElem = document.querySelector('#loading')
const progressBarElem = loadingElem.querySelector('.progressbar')
const progressNumber = document.querySelector('.progress-number')

const makeLoading = () => {
  const loadManager = new THREE.LoadingManager()
  loadManager.onStart = (url, itemsLoaded, itemsTotal) => {
    loadingElem.style.display = 'flex'
  }
  loadManager.onLoad = (url, itemsLoaded, itemsTotal) => {
    loadingElem.style.display = 'none'
  }
  return loadManager
}

const onProgress = (xhr) => {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total
    progressBarElem.style.transform = `scaleX(${percentComplete})`
    progressNumber.innerHTML = `${Math.round(percentComplete * 100)}%`
  }
}

export { makeLoading, onProgress }
