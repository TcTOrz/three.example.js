<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:30
 * @LastEditTime: 2022-03-28 15:13:58
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
const emits = defineEmits(['jumpBack'])
</script>
<template lang="pug">
el-button(@click="emits('jumpBack')")
  | 返 回
</template>

<style lang="scss">
@import './Layout';
</style>
