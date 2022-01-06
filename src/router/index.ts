/*
 * @Author: Li Jian
 * @Date: 2022-01-05 10:03:52
 * @LastEditTime: 2022-01-06 15:51:14
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
    path: '/testThree',
    name: 'TestThree',
    component: () => import(/* webpackChunkName: "TestThree" */ '@views/TestThree.vue'),
  },
  {
    path: '/testFour',
    name: 'TestFour',
    component: () => import(/* webpackChunkName: "TestFour" */ '@views/TestFour.vue'),
  },
  {
    path: '/testFive',
    name: 'TestFive',
    component: () => import(/* webpackChunkName: "TestFive" */ '@views/TestFive.vue'),
  },
  {
    path: '/testSix',
    name: 'TestSix',
    component: () => import(/* webpackChunkName: "TestSix" */ '@views/TestSix.vue'),
  },
  {
    path: '/testSeven',
    name: 'TestSeven',
    component: () => import(/* webpackChunkName: "TestSeven" */ '@views/TestSeven.vue'),
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
