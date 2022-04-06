<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:30
 * @LastEditTime: 2022-04-06 16:52:31
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { theme } from '../handleTheme'
import { deg } from '@/shared'
import { watch, ref } from 'vue'

// console.log(deg.value)
const newDeg = ref('0deg')
watch(deg, (val, oldVal) => {
  if (Math.abs(val - oldVal) > 0.1) {
    newDeg.value = val + 45 + 'deg'
    // console.log(val)
    // console.log(getComputedStyle(document.querySelector('.compass'), 'after').transform)
    // document.querySelector('.compass::after').style.transform = `rotate(${val}deg)`
    // getComputedStyle(document.querySelector('.compass'), 'after').transform = `rotate(${val}deg)`
  }
})
// const emits = defineEmits(['jumpBack'])
</script>
<template lang="pug">
//- el-button(@click="emits('jumpBack')")
//-   | 返 回
.layout
  .compass
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
$deg: v-bind('newDeg');
@import './Layout';
</style>
