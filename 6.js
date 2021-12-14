/*
 * @Author: Li Jian
 * @Date: 2021-12-13 09:58:33
 * @LastEditTime: 2021-12-13 11:30:12
 * @LastEditors: Li Jian
 */
import * as THREE from './node_modules/three/build/three.module.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

const main = () => {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })

  const scene = new THREE.Scene()
  // scene.background = new THREE.Color('black')

  const fov = 45
  const aspect = 2
  const near = 0.1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 10, 20)
  // camera.lookAt(0, 0, 0)

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.update()

  {
    const near = 1
    const far = 60
    const color = 'lightblue'
    scene.fog = new THREE.Fog(color, near, far)
    scene.background = new THREE.Color(color)
  }

  {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.AmbientLight(color, intensity)
    // light.position.set(-1, 2, 4)
    scene.add(light)
  }

  {
    const planeSize = 400
    const loader = new THREE.TextureLoader()
    const texture = loader.load(
      'https://threejs.org/manual/examples/resources/images/checker.png'
    )
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(planeGeo, planeMat)
    mesh.rotation.x = Math.PI * -0.5
    scene.add(mesh)
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

  // renderer.render(scene, camera)
  const render = (time) => {
    time *= 0.001
    // if (resizeRendererToDisplaySize(renderer)) {
    //   const canvas = renderer.domElement
    //   camera.aspect = canvas.clientWidth / canvas.clientHeight
    //   camera.updateProjectionMatrix()
    // }
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }
  requestAnimationFrame(render)
}

main()
