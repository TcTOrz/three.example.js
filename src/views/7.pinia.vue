<!--
 * @Author: Li Jian
 * @Date: 2022-01-05 10:47:33
 * @LastEditTime: 2022-01-05 10:57:22
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { useStore } from '@store'

const store = useStore()
const count: Number = store.count
console.log(store.count, store.doubleCount)
</script>

<template lang="pug">
section
  | Count: {{ count }}
</template>
