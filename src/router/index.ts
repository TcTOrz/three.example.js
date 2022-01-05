/*
 * @Author: Li Jian
 * @Date: 2022-01-05 10:03:52
 * @LastEditTime: 2022-01-05 14:40:59
 * @LastEditors: Li Jian
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TestOne',
    component: () => import(/* webpackChunkName: "TestOne" */ '@views/TestOne.vue'),
  },
  {
    path: '/testTwo',
    name: 'TestTwo',
    component: () => import(/* webpackChunkName: "TestTwo" */ '@views/TestTwo.vue'),
  },
  {
    path: '/testPinia',
    name: 'TestPinia',
    component: () => import(/* webpackChunkName: "TestPinia" */ '@views/TestPinia.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
