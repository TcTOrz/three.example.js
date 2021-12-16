/*
 * @Author: Li Jian
 * @Date: 2021-12-16 20:58:57
 * @LastEditTime: 2021-12-16 21:44:02
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js'

const main = () => {
  const canvas = document.querySelector('#c')

  const renderer = new THREE.WebGLRenderer({ canvas })

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('black')

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    0.1,
    100
  )
  camera.position.set(0, 10, 20)

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.update()

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }
  {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
  }

  {
    const objLoader = new OBJLoader()
    // objLoader.load('./blender/windmill/windmill.obj', (root) => {
    //   scene.add(root)
    // })
    const mtlLoader = new MTLLoader()
    mtlLoader.load('./blender/windmill/windmill.mtl', (mtl) => {
      mtl.preload()
      // for (const material of Object.values(mtl.materials)) {
      //   material.side = THREE.DoubleSide
      // }
      mtl.materials.Material.side = THREE.DoubleSide
      objLoader.setMaterials(mtl)
      objLoader.load('./blender/windmill/windmill.obj', (root) => {
        scene.add(root)
      })
    })
  }

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

  const render = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
