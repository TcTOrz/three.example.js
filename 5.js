/*
 * @Author: Li Jian
 * @Date: 2021-12-13 08:50:49
 * @LastEditTime: 2021-12-13 09:39:41
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'

const main = () => {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  )

  camera.position.z = 4

  {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
  }

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const loader = new THREE.TextureLoader()
  const material = new THREE.MeshBasicMaterial({
    map: loader.load('./wall.jpg'),
  })
  // const material = new THREE.MeshPhongMaterial({
  //   // color: 0x156289,
  //   map: loader.load('./wall.jpg'),
  // })
  // const material = new THREE.MeshLambertMaterial({ color: 0x156289 })
  // const material = new THREE.MeshToonMaterial({ color: 0x156289 })
  // material.color.set('#ff0000')
  // material.shininess = 1500

  const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('./flower-1.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('./flower-2.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('./flower-3.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('./flower-4.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('./flower-5.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('./flower-6.jpg') }),
  ]
  // const mesh = new THREE.Mesh(geometry, material)
  const mesh = new THREE.Mesh(geometry, materials)

  scene.add(mesh)

  // renderer.render(scene, camera)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  const animate = () => {
    requestAnimationFrame(animate)
    if (resizeRendererToDisplaySize(renderer)) {
    }
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  requestAnimationFrame(animate)
}

main()
