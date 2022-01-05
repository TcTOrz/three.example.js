/*
 * @Author: Li Jian
 * @Date: 2022-01-05 10:29:21
 * @LastEditTime: 2022-01-05 10:55:42
 * @LastEditors: Li Jian
 */
import { createPinia, defineStore, StoreDefinition } from 'pinia'

export default createPinia()

interface CounterState {
  count: number
}

export const useStore: StoreDefinition = defineStore('counter', {
  // id: 'counter',
  state: (): CounterState => ({
    count: 1,
  }),
  getters: {
    doubleCount: (state: { count: number }) => state.count * 2,
  },
})
