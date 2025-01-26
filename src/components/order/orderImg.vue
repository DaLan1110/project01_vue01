<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// 接收來自父元件的 props
const propsImg = defineProps({
  img_avatar: String, // 父元件會傳入 img_avatar
  img_path: String, // 父元件會傳入 img_path
  allowScreenStyle: {
    type: Boolean,
    default: false,
  },
});

const imgAvatarUrl = computed(() => {
  const avatar = propsImg.img_avatar;
  const path = propsImg.img_path;
  if (avatar) {
    // 確保圖片路徑是正確的
    return new URL(`${path}${avatar}`, import.meta.url).href;
  }
  // 如果没有頭像，返回一个默認圖片或空字符串
  return ""; // 可以换成一個默認圖片 URL
});

const mobileStyle = {
  width: "150px",
  height: "150px",
};

const defaultStyle = {
  width: "100px",
  height: "100px",
};

const isSmallScreen = ref(window.innerWidth < 719);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 719;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="row">
    <div class="d-flex justify-content-center">
      <div
        class="productList-style-img"
        :style="allowScreenStyle && isSmallScreen ? mobileStyle : defaultStyle"
      >
        <img
          :src="imgAvatarUrl"
          alt=""
          style="width: 100%; height: 100%; object-fit: cover"
        />
      </div>
    </div>
  </div>
</template>

<style>
.productList-style-img {
  width: 100px;
  height: 100px;
  background-color: #d0d0d0;
  border-radius: 10%;
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  overflow: hidden;
}
</style>