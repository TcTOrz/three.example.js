<!--
 * @Author: Li Jian
 * @Date: 2022-02-21 16:05:38
 * @LastEditTime: 2022-02-21 16:09:44
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import router from '@router'
const jumpBack = () => {
  router.back()
}
</script>
<template lang="pug">
el-button(@click="jumpBack")
  | 返 回
</template>

<style lang="scss"></style>
