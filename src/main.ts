/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-01-05 10:35:28
 * @LastEditors: Li Jian
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
