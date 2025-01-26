<script setup>
const propsPageBgc = defineProps({
  pageBgc: {
    type: String,
    default: "#ffffff",
  },
});
</script>

<template>
  <div
    class="container-fluid pageLayoutContainer"
    :style="{ backgroundColor: propsPageBgc.pageBgc }"
  >
    <div class="pageTitle mt-5" style="padding-top: 100px">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.pageLayoutContainer {
  overflow: hidden; /* 隱藏超出容器的內容 */
}

.pageTitle {
  display: flex;
  justify-content: center; /* 垂直居中對齊 */
  text-align: center; /* 水平居中對齊 */
}
</style>