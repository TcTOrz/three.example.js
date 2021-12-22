/*
 * @Author: Li Jian
 * @Date: 2021-12-17 09:48:44
 * @LastEditTime: 2021-12-17 09:56:21
 * @LastEditors: Li Jian
 * @Description: 调整渲染器大小到屏幕大小，防止canvas变形
 */
export default function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}
