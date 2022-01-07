<!--
 * @Author: Li Jian
 * @Date: 2022-01-07 10:35:02
 * @LastEditTime: 2022-01-07 10:40:21
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

import main from '@shared'

onMounted(() => {
  main()
})
</script>

<template lang="pug">
canvas#c8(width="500", height="500", style="width: 500px; height: 500px;")
</template>
