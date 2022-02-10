/*
 * @Author: Li Jian
 * @Date: 2022-02-10 11:24:47
 * @LastEditTime: 2022-02-10 11:26:59
 * @LastEditors: Li Jian
 * @Description: 墨卡托坐标转换
 */
import * as d3 from 'd3'

export default function (
  center: [number, number] = [104.0, 37.5],
  scale: number = 80,
  translate: number[] = [0, 0]
) {
  return d3.geoMercator().center(center).scale(scale).translate(translate)
}
