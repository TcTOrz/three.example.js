<!--
 * @Author: Li Jian
 * @Date: 2022-02-18 10:41:00
 * @LastEditTime: 2022-03-07 08:51:37
 * @LastEditors: Li Jian
 * @Description: svg components
 * @reference: https://www.jianshu.com/p/f5b08816d4c5
-->
<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
const iconName = `#icon-${props.name}`
</script>

<template lang="pug">
svg
  use(:xlink:href="iconName")
</template>
