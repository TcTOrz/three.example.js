/*
 * @Author: Li Jian
 * @Date: 2022-01-14 14:23:09
 * @LastEditTime: 2022-01-14 16:34:40
 * @LastEditors: Li Jian
 */
import * as THREE from 'three'

const makeLoading = () => {
  const loadingElem = document.querySelector('#loading')
  const progressBarElem = document.querySelector('.progressbar')
  const progressNumber = document.querySelector('.progress-number')
  const urlElem = document.querySelector('.url')
  const loadManager = new THREE.LoadingManager()
  loadManager.onStart = (url, itemsLoaded, itemsTotal) => {
    ;(progressBarElem as HTMLElement).style.transform = 'scaleX(0)'
    ;(progressNumber as HTMLElement).innerHTML = '0%'
    ;(loadingElem as HTMLElement).style.display = 'flex'
    ;(urlElem as HTMLElement).innerHTML = ''
  }
  loadManager.onLoad = () => {
    ;(loadingElem as HTMLElement).style.display = 'none'
  }
  loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const percentComplete = itemsLoaded / itemsTotal
    ;(progressBarElem as HTMLElement).style.transform = `scaleX(${percentComplete})`
    ;(progressNumber as HTMLElement).innerHTML = `${Math.round(percentComplete * 100)}%`
    ;(urlElem as HTMLElement).innerHTML = `${url} ${itemsLoaded}/${itemsTotal}`
  }
  return loadManager
}

const onProgress = (resolve: Function) => {
  return (xhr: { lengthComputable: any; loaded: number; total: number }) => {
    const progressBarElem = document.querySelector('.progressbar')
    const progressNumber = document.querySelector('.progress-number')
    const urlElem = document.querySelector('.url')
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total
      ;(progressBarElem as HTMLElement).style.transform = `scaleX(${percentComplete})`
      ;(progressNumber as HTMLElement).innerHTML = `${Math.round(percentComplete * 100)}%`
      ;(urlElem as HTMLElement).innerHTML = 'Loading...'
      if (percentComplete === 1) {
        resolve(true)
      }
    }
  }
}

export { makeLoading, onProgress }
