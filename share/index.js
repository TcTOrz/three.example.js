/*
 * @Author: Li Jian
 * @Date: 2021-12-17 14:54:59
 * @LastEditTime: 2021-12-17 15:57:19
 * @LastEditors: Li Jian
 */
import resizeRendererToDisplaySize from './resizeRendererToDisplaySize.js'
import { makePerspectiveCamera, makeOrthographicCamera } from './makeCamera.js'
import makeControls from './makeControls.js'
import {
  makeDirectionalLight,
  makeHemisphereLight,
  makeAmbientLight,
} from './makeLights.js'
import makePlane from './makePlane.js'
import makeTower from './makeTower.js'

export {
  // 调整渲染器大小到屏幕大小，防止canvas变形
  resizeRendererToDisplaySize,
  // 相机
  makePerspectiveCamera,
  makeOrthographicCamera,
  // 控制器
  makeControls,
  // 灯光
  makeDirectionalLight,
  makeHemisphereLight,
  makeAmbientLight,
  // 平面
  makePlane,
  // 铁塔
  makeTower,
}
