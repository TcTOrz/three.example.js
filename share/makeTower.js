/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:47:33
 * @LastEditTime: 2021-12-17 16:37:03
 * @LastEditors: Li Jian
 * @Description: 铁塔模型
 */
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js'

function makeTower(scene, mtlUrl, objUrl) {
  const objLoader = new OBJLoader()
  const mtlLoader = new MTLLoader()

  mtlLoader.load(mtlUrl, (mtl) => {
    mtl.preload()
    objLoader.setMaterials(mtl)
    objLoader.load(objUrl, (obj) => {
      // obj.position.y = -1
      obj.scale.set(0.1, 0.1, 0.1)
      // obj.rotation.y = Math.PI
      scene.add(obj)
    })
  })
}

export default makeTower
