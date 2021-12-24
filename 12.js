/*
 * @Author: Li Jian
 * @Date: 2021-12-23 16:20:34
 * @LastEditTime: 2021-12-24 11:20:24
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'

function main() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  const scene = new THREE.Scene()

  const fov = 75
  const aspect = canvas.width / canvas.height
  const near = 0.1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。
  camera.position.set(0, 0, 2)

  const geometry = new THREE.BoxGeometry(1, 1, 1)

  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })
  {
    const light = new THREE.DirectionalLight(0xffffff)
    const intensity = 1
    light.position.set(0, 0, 2)
    scene.add(light)
  }

  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)

  const animate = (time) => {
    time *= 0.001
    cube.rotation.x = time
    cube.rotation.y = time
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

main()
