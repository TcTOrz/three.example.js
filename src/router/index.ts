/*
 * @Author: Li Jian
 * @Date: 2022-01-05 10:03:52
 * @LastEditTime: 2022-01-13 19:20:24
 * @LastEditors: Li Jian
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/0',
  },
  {
    path: '/0',
    name: '0',
    component: () => import(/* webpackChunkName: "0" */ '@views/0.threejs.vue'),
  },
  {
    path: '/1',
    name: '1',
    component: () => import(/* webpackChunkName: "1" */ '@views/1.webgl.vue'),
  },
  {
    path: '/2',
    name: '2',
    component: () => import(/* webpackChunkName: "2" */ '@views/2.webgl.vue'),
  },
  {
    path: '/3',
    name: '3',
    component: () => import(/* webpackChunkName: "3" */ '@views/3.webgl.vue'),
  },
  {
    path: '/4',
    name: '4',
    component: () => import(/* webpackChunkName: "4" */ '@views/4.webgl.vue'),
  },
  {
    path: '/5',
    name: '5',
    component: () => import(/* webpackChunkName: "5" */ '@views/5.webgl.vue'),
  },
  {
    path: '/6',
    name: '6',
    component: () => import(/* webpackChunkName: "6" */ '@views/6.webgl.vue'),
  },
  {
    path: '/7',
    name: '7',
    component: () => import(/* webpackChunkName: "7" */ '@views/7.pinia.vue'),
  },
  {
    path: '/8',
    name: '8',
    component: () => import(/* webpackChunkName: "8" */ '@views/8.threejs.vue'),
  },
  {
    path: '/9',
    name: '9',
    component: () => import(/* webpackChunkName: "9" */ '@views/9.webgl.vue'),
  },
  {
    path: '/10',
    name: '10',
    component: () => import(/* webpackChunkName: "10" */ '@views/10.webgl.vue'),
  },
  {
    path: '/11',
    name: '11',
    component: () => import(/* webpackChunkName: "11" */ '@views/11.webgl.vue'),
  },
  {
    path: '/12',
    name: '12',
    component: () => import(/* webpackChunkName: "12" */ '@views/12.webgl.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
