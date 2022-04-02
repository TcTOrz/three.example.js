/*
 * @Author: Li Jian
 * @Date: 2022-04-02 11:18:45
 * @LastEditTime: 2022-04-02 11:20:49
 * @LastEditors: Li Jian
 * @Description: 仿LPL2022春季赛 ban/pick烟雾特效
 */
const filter = document.querySelector('#turbulence')
let frame = 1
let rad = Math.PI / 180
let bfx, bfy
function freqAnimation() {
  frame += 0.35
  bfx = 0.035
  bfy = 0.015
  bfx += 0.006 * Math.cos(frame * rad)
  bfy += 0.004 * Math.sin(frame * rad)
  filter?.setAttributeNS(null, 'baseFrequency', bfx.toString() + ' ' + bfy.toString())
  window.requestAnimationFrame(freqAnimation)
}
window.requestAnimationFrame(freqAnimation)
