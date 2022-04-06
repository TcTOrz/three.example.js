<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:30
 * @LastEditTime: 2022-04-06 15:38:59
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { theme } from '../handleTheme'
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
@import './Layout';
</style>
