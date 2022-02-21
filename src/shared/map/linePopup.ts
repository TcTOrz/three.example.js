/*
 * @Author: Li Jian
 * @Date: 2022-02-21 15:09:08
 * @LastEditTime: 2022-02-21 15:42:27
 * @LastEditors: Li Jian
 */
import { AddPointPopup as PointPopup } from '@shared'
import router from '@router'
import { MapInterface, LinePopupInterface } from './type'

export default class LinePopup extends PointPopup implements LinePopupInterface {
  constructor(ins: MapInterface, currentObject: THREE.Object3D) {
    super(ins, currentObject)
  }
  jump() {
    router.push('/16') // fiber
  }
}
