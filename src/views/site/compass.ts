/*
 * @Author: Li Jian
 * @Date: 2022-04-14 15:28:21
 * @LastEditTime: 2022-04-14 15:30:40
 * @LastEditors: Li Jian
 * @Description: 指南针方向
 */
import { ref, watch } from 'vue'
import { deg } from '@/shared'

export const newDeg = ref('0deg')
watch(deg, (val, oldVal) => {
  if (Math.abs(val - oldVal) > 0.1) {
    newDeg.value = val + 45 + 'deg'
  }
})
