<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:38
 * @LastEditTime: 2022-04-06 15:39:13
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { theme } from '../handleTheme'
const emits = defineEmits(['jumpBack'])
</script>
<template lang="pug">
el-button(@click="emits('jumpBack')")
  | 返 回
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
@import './Layout';
</style>
