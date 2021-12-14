/*
 * @Author: Li Jian
 * @Date: 2021-12-13 14:48:36
 * @LastEditTime: 2021-12-13 16:25:15
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

const main = () => {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })

  const scene = new THREE.Scene()

  const fov = 75
  const aspect = canvas.width / canvas.height
  const near = 0.1
  const far = 30
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 5

  function makeInstance(color, x) {
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({
      color,
      // side: THREE.DoubleSide,
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.x = x
    return cube
  }
  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshPhongMaterial({ color: 0x156289 })
  // const cube = new THREE.Mesh(geometry, material)
  const cubes = [
    makeInstance(0xff0000, -3),
    makeInstance(0x00ff00, 0),
    makeInstance(0x0000ff, 3),
  ]

  cubes.forEach((cube) => {
    scene.add(cube)
  })

  {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(-1, 2, 4)
    scene.add(light)
  }

  {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(1, -2, -4)
    scene.add(light)
  }

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  // controls.update()

  const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  // renderer.render(scene, camera)
  let renderRequested = false
  const render = () => {
    renderRequested = false
    // time *= 0.001
    // cubes.forEach((cube, ndx) => {
    //   cube.rotation.x = time * (ndx + 1)
    //   cube.rotation.y = time * (ndx + 1)
    // })
    // cube.rotation.x = time
    // cube.rotation.y = time
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    controls.update()
    renderer.render(scene, camera)
    // requestAnimationFrame(render)
  }

  const requestRenderIfNotRequested = () => {
    if (!renderRequested) {
      renderRequested = true
      requestAnimationFrame(render)
    }
  }
  // requestAnimationFrame(render)
  render()
  controls.addEventListener('change', requestRenderIfNotRequested)

  // window.addEventListener('resize', requestRenderIfNotRequested)
}

main()
