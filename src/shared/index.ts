/*
 * @Author: Li Jian
 * @Date: 2022-01-07 10:39:37
 * @LastEditTime: 2022-04-06 16:17:58
 * @LastEditors: Li Jian
 */
import resizeRendererToDisplaySize from './resizeRendererToDisplaySize'
import { makePerspectiveCamera } from './makeCamera'
import { makeDirectionalLight, makeAmbientLight, makeHemisphereLight } from './makeLight'
import { loadModel, loadGltfModel } from './loadModel'
import { makeControl, makeKeyControl } from './makeControl'
import { makeFiber } from './makeFiber'
import { makeText } from './makeText'
import { makeDom } from './makeDom'
import { makeEvent, eventFn, eventKeyDown } from './makeEvent'
import FlyLine from './flyLine'
import RadarController from './radar'
import { compass, deg } from './compass'

// ---map
// class
import CustomMap from './map/index'
import DrawMap from './map/drawMap'
import AddProvinceName from './map/provinceName'
import AddFlyLine, { flyLines, lines2 } from './map/flyLine'
import AddRadar, { radar } from './map/radar'
import AddCityLight from './map/cityLight'
import AddPoint from './map/point'
import AddPointPopup from './map/pointPopup'
import AddTween from './makeTween'
import AddLinePopup from './map/linePopup'
import SweepEffectShader from './map/sweepEffectShader'

// func
import geoMercator from './geoMercator'
import popup, { popInstance } from './map/popup'
// ---

// ---site
// class
import Site from './site/index'

export {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  makeDirectionalLight,
  makeAmbientLight,
  makeHemisphereLight,
  loadModel,
  loadGltfModel,
  makeControl,
  makeKeyControl,
  makeFiber,
  makeText,
  makeDom,
  makeEvent,
  eventFn,
  eventKeyDown,
  FlyLine,
  RadarController,
  CustomMap,
  DrawMap,
  AddProvinceName,
  AddFlyLine,
  flyLines,
  lines2,
  AddRadar,
  radar,
  AddCityLight,
  geoMercator,
  popup,
  popInstance,
  AddPoint,
  AddPointPopup,
  AddTween,
  Site,
  AddLinePopup,
  SweepEffectShader,
  compass,
  deg,
}
