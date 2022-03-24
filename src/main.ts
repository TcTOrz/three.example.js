/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-03-24 11:06:51
 * @LastEditors: Li Jian
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './element-plus'
import svgIcon from '@components/SvgIcon.vue'
import 'animate.css'
import '@axios'
import Load from './loading'

const app = createApp(App)

app.component('svg-icon', svgIcon)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Load)

app.config.errorHandler = (err, vm, info) => {
  console.log('from errorHandler', err, vm, info)
}
app.config.warnHandler = (msg, vm, trace) => {
  console.log('from warnHandler', msg, vm, trace)
}

app.mount('#app')

console.log(
  '%c                                           ',
  'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;width:1px;height:40px;padding:2px;'
)
