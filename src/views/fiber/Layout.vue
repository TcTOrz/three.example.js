<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:38
 * @LastEditTime: 2022-03-09 14:36:09
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
const emits = defineEmits(['jumpBack'])
</script>
<template lang="pug">
el-button(@click="emits('jumpBack')")
  | 返 回
</template>

<style lang="scss"></style>
