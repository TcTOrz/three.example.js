/*
 * @Author: Li Jian
 * @Date: 2022-01-07 10:39:37
 * @LastEditTime: 2022-02-11 14:41:53
 * @LastEditors: Li Jian
 */
import resizeRendererToDisplaySize from './resizeRendererToDisplaySize'
import { makePerspectiveCamera } from './makeCamera'
import { makeDirectionalLight, makeAmbientLight, makeHemisphereLight } from './makeLight'
import { loadModel } from './loadModel'
import { makeControl, makeKeyControl } from './makeControl'
import { makeFiber } from './makeFiber'
import { makeText } from './makeText'
import { makeDom } from './makeDom'
import { makeEvent, eventFn, eventKeyDown } from './makeEvent'
import FlyLine from './flyLine'
import RadarController from './radar'

// ---map
// class
import CustomMap from './map/index'
import DrawMap from './map/drawMap'
import AddProvinceName from './map/provinceName'
import AddFlyLine, { flyLines } from './map/flyLine'
import AddRadar, { radar } from './map/radar'
import AddCityLight from './map/cityLight'

// func
import geoMercator from './geoMercator'
import popup, { popInstance } from './map/popup'
// ---

export {
  resizeRendererToDisplaySize,
  makePerspectiveCamera,
  makeDirectionalLight,
  makeAmbientLight,
  makeHemisphereLight,
  loadModel,
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
  AddRadar,
  radar,
  AddCityLight,
  geoMercator,
  popup,
  popInstance,
}
