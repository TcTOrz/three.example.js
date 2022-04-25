<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:30
 * @LastEditTime: 2022-04-21 16:08:08
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { theme } from '../handleTheme'
import { newDeg } from './compass'
import {
  baseInfo,
  baseInfoIcon,
  baseInfoTitle,
  baseInfoArrow,
  managerInfo,
  businessInfo,
  baseInfoClick,
  managerInfoClick,
  businessInfoClick,
} from './rightFold' // 右侧折叠面板
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
    div
      .l-info-image-0
      .l-info-name
        .l-info-name-title
          .l-info-name-title-number
            | 12
          | 条
        .l-info-name-subtitle
          | 光缆
    div
    div
      .l-info-image-1
      .l-info-name
        .l-info-name-title
          .l-info-name-title-number
            | 11
          | 台
        .l-info-name-subtitle
          | 设备
    div
    div
      .l-info-image-2
      .l-info-name
        .l-info-name-title
          .l-info-name-title-number
            | 12
          | 台
        .l-info-name-subtitle
          | 电源
    div
    div
      .l-info-image-3
      .l-info-name
        .l-info-name-title
          .l-info-name-title-number
            | 2
          | 条
        .l-info-name-subtitle
          | 沟道
  //- 右边折叠栏
  .r-fold
    .base-info(@click="baseInfoClick" ref="baseInfo")
      .base-info-icon(ref="baseInfoIcon")
      .base-info-title(ref="baseInfoTitle")
        | 基本信息
      .base-info-arrow(ref="baseInfoArrow")
    .base-info-expand(ref="baseInfoExpand")
      | expand
    .manager-info(@click="managerInfoClick" ref="managerInfo")
      .base-info-icon
      .base-info-title
        | 管理信息
      .base-info-arrow
    .business-info(@click="businessInfoClick" ref="businessInfo")
      .base-info-icon
      .base-info-title
        | 业务信息
      .base-info-arrow
  //- 指南针
  .compass
</template>

<style lang="scss" scoped>
$width: v-bind('theme.width');
$height: v-bind('theme.height');
$deg: v-bind('newDeg');
@import './Layout';
</style>
