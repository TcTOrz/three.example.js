/*
 * @Author: Li Jian
 * @Date: 2022-01-07 14:15:33
 * @LastEditTime: 2022-01-07 14:45:50
 * @LastEditors: Li Jian
 */
export default function resizeRendererToDisplaySize(renderer: THREE.Renderer) {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}
