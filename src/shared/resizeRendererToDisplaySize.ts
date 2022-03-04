/*
 * @Author: Li Jian
 * @Date: 2022-01-07 14:15:33
 * @LastEditTime: 2022-03-04 09:38:42
 * @LastEditors: Li Jian
 */
export default function resizeRendererToDisplaySize(renderer: THREE.Renderer) {
  const canvas = renderer.domElement
  // 响应式设计
  const domWidth = document.body.clientWidth
  const domHeight = document.body.clientHeight
  canvas.style.width = domWidth + 'px'
  canvas.style.height = domHeight + 'px'
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}
