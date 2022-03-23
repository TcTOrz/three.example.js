/*
 * @Author: Li Jian
 * @Date: 2022-01-05 10:03:52
 * @LastEditTime: 2022-03-23 16:42:20
 * @LastEditors: Li Jian
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes: any = [
  {
    path: '/',
    redirect: '/map',
  },
  {
    path: '/map',
    name: 'map',
    component: () => import(/* webpackChunkName: "map" */ '@views/map.threejs.vue'),
  },
  {
    path: '/site',
    name: 'site',
    component: () => import(/* webpackChunkName: "site" */ '@views/site.threejs.vue'),
  },
  {
    path: '/fiber',
    name: 'fiber',
    component: () => import(/* webpackChunkName: "fiber" */ '@views/fiber.threejs.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
