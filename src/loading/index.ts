/*
 * @Author: Li Jian
 * @Date: 2022-03-24 11:00:04
 * @LastEditTime: 2022-03-24 14:33:10
 * @LastEditors: Li Jian
 */
import { createApp, reactive } from 'vue'
import customLoad from '@components/Loading.vue'

const $loading = createApp(customLoad).mount(document.createElement('div'))
document.body.appendChild($loading.$el)
const load = {
  show() {
    $loading.$el.style.display = 'block'
  },
  hide() {
    $loading.$el.style.display = 'none'
  },
}

export default {
  install(app: any) {
    app.config.globalProperties.$loading = load
  },
}
