/*
 * @Author: Li Jian
 * @Date: 2022-02-21 15:09:08
 * @LastEditTime: 2022-03-09 08:52:16
 * @LastEditors: Li Jian
 */
import { AddPointPopup as PointPopup } from '@shared'
import router from '@router'
import { MapInterface, LinePopupInterface } from './type'

export default class LinePopup extends PointPopup implements LinePopupInterface {
  instance: MapInterface
  constructor(ins: MapInterface, currentObject: THREE.Object3D) {
    super(ins, currentObject)
    this.instance = ins
  }
  jump() {
    this.instance.dispose()
    router.push('/16') // fiber
  }
}
