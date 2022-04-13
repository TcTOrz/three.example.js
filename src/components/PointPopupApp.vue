<!--
 * @Author: Li Jian
 * @Date: 2022-02-15 09:45:25
 * @LastEditTime: 2022-04-13 15:40:52
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const popTitleName = ref(null)
const popTitleClose = ref(null)
const popBottomAlarm = ref(null)
const popBottomFault = ref(null)
const popBottomWarning = ref(null)
const popBottomNormal = ref(null)
onMounted(() => {
  console.log(popTitleName.value)
})
</script>

<template lang="pug">
#pointPopElem
  .topPop
    .title
      .name(ref="popTitleName")
        | 500kV东台变通信站
      .close(ref="popTitleClose")
    .subTitle
      .left
        .img
        | 福建通信网
      .right
        .img
        | A级通信站
  .dottedLine
  .bottomPop
    div
      p
        | 告警信息
      p(ref="popBottomAlarm")
        | 5
    div
      p(ref="popBottomFault")
        | 故障信息
      p
        | 3
    div
      p(ref="popBottomWarning")
        | 故障信息
      p
        | 3
    div
      p(ref="popBottomNormal")
        | 故障信息
      p
        | 3
</template>

<style lang="scss" scoped>
// 由于这是组件内部的样式，所以并不在外部引入scss文件
#pointPopElem {
  width: 512px;
  height: 256px;
  color: white;
  background-image: url('@assets/image/u231.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: inherit;
  & > .topPop {
    padding: 20px 20px 5px 20px;
    & > .title {
      font-size: x-large;
      font-weight: lighter;
      color: #fff;
      text-decoration: underline;
      // text-decoration-style: double;
      display: flex;
      justify-content: space-between;
      & > .name {
        text-decoration: underline;
      }
      & > .close {
        background-image: url('@assets/image/u952.png');
        width: 10px;
        height: 10px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
    & > .subTitle {
      font-size: large;
      font-weight: normal;
      color: #fff;
      display: flex;
      margin-top: 5px;
      & > .left {
        display: flex;
        align-items: center;
        & > .img {
          width: 20px;
          height: 20px;
          background-image: url('@assets/image/u234.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
      }
      & > .right {
        display: flex;
        align-items: center;
        margin-left: 20px;
        & > .img {
          width: 20px;
          height: 20px;
          background-image: url('@assets/image/u235.png');
          background-repeat: no-repeat;
          background-size: 200%;
          background-position: center;
        }
      }
    }
  }
  & > .dottedLine {
    border-bottom: 2px white dashed;
    margin: 0 20px;
  }
  & > .bottomPop {
    padding: 5px 50px;
    display: flex;
    justify-content: space-around;
    & > div {
      text-align: center;
      & > p:nth-child(2) {
        text-decoration: underline;
        font-size: x-large;
      }
    }
  }
}
</style>
