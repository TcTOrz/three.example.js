<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:30
 * @LastEditTime: 2022-04-14 16:15:43
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { theme } from '../handleTheme'
import { newDeg } from './compass'
</script>
<template lang="pug">
.layout
  //- 左上角信息栏
  .info
    .top
      div
        div
        | 福建通信网
      div
        div
        | A级通信站
      div
        | 2019-12-31投运
    .middle
      div
        | 500kV东台变
      div
        | 通信站
    .bottom
      | 60115100000012
  //- 左边信息栏
  .l-info
  //- 右边折叠栏
  .r-fold
  //- 指南针
  .compass
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
$height: v-bind('theme.height');
$deg: v-bind('newDeg');
@import './Layout';
</style>
