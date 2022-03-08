/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-03-08 14:10:59
 * @LastEditors: Li Jian
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './element-plus'
import svgIcon from '@components/SvgIcon.vue'
import 'animate.css'

const app = createApp(App)

app.component('svg-icon', svgIcon)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.config.errorHandler = (err, vm, info) => {
  console.log('from errorHandler', err, vm, info)
}
app.config.warnHandler = (msg, vm, trace) => {
  console.log('from warnHandler', msg, vm, trace)
}

app.mount('#app')
