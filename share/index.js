/*
 * @Author: Li Jian
 * @Date: 2021-12-17 14:54:59
 * @LastEditTime: 2021-12-22 16:37:41
 * @LastEditors: Li Jian
 */
import resizeRendererToDisplaySize from './resizeRendererToDisplaySize.js'
import {
  makePerspectiveCamera,
  makeOrthographicCamera,
  makeThumbCamera,
} from './makeCamera.js'
import renderThumbMap from './renderThumbMap.js'
import makeControls from './makeControls.js'
import {
  makeDirectionalLight,
  makeHemisphereLight,
  makeAmbientLight,
} from './makeLights.js'
import makePlane from './makePlane.js'
import makeTower from './makeTower.js'
import makeFiber from './makeFiber.js'
import renderEvents from './makeEvents.js'
import { makeLoading, onProgress } from './makeLoading.js'

export {
  // 调整渲染器大小到屏幕大小，防止canvas变形
  resizeRendererToDisplaySize,
  // 相机
  makePerspectiveCamera,
  makeOrthographicCamera,
  makeThumbCamera,
  renderThumbMap,
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
  // 光缆
  makeFiber,
  // 事件
  renderEvents,
  // 加载
  makeLoading,
  onProgress,
}
