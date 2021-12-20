/*
 * @Author: Li Jian
 * @Date: 2021-12-17 15:47:33
 * @LastEditTime: 2021-12-20 10:59:32
 * @LastEditors: Li Jian
 * @Description: 铁塔模型
 */
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js'

function makeTower(scene, mtlUrl, objUrl, position) {
  const objLoader = new OBJLoader()
  const mtlLoader = new MTLLoader()

  const scaler = 0.4 // 缩放比例

  mtlLoader.load(mtlUrl, (mtl) => {
    mtl.preload()
    objLoader.setMaterials(mtl)
    objLoader.load(objUrl, (obj) => {
      obj.scale.set(scaler, scaler, scaler)
      obj.position.set(...position)
      scene.add(obj)
    })
  })
}

export default makeTower
