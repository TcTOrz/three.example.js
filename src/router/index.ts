/*
 * @Author: Li Jian
 * @Date: 2022-01-05 10:03:52
 * @LastEditTime: 2022-03-28 16:34:30
 * @LastEditors: Li Jian
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes: any = [
  {
    path: '/',
    redirect: '/map',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/map',
    name: 'map',
    meta: {
      title: '首页',
    },
    component: () => import(/* webpackChunkName: "map" */ '@views/map.threejs.vue'),
  },
  {
    path: '/site',
    name: 'site',
    meta: {
      title: '站点',
    },
    component: () => import(/* webpackChunkName: "site" */ '@views/site.threejs.vue'),
  },
  {
    path: '/fiber',
    name: 'fiber',
    meta: {
      title: '光缆',
    },
    component: () => import(/* webpackChunkName: "fiber" */ '@views/fiber.threejs.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
