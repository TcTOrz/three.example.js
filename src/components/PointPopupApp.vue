<!--
 * @Author: Li Jian
 * @Date: 2022-02-15 09:45:25
 * @LastEditTime: 2022-02-15 09:58:27
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import router from '@router'

const propData = defineProps<{ a: string }>()
const showPointPop = () => {
  console.log('clicked!')
  router.push('/8')
}
</script>

<template lang="pug">
#pointPopElem hello pointPopElem {{ propData.a }}
el-button(@click="showPointPop")
  | show
</template>
