<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// 接收來自父元件的 props
const propsImg = defineProps({
  img_avatar: String, // 父元件會傳入 img_avatar
  // img_path: String, // 父元件會傳入 img_path
});

const tempImageUrl = ref("");
const emit = defineEmits(["updateAvatar"]);

const imgAvatarUrl = computed(() => {
  const avatar = propsImg.img_avatar;
  // const path = propsImg.img_path;
  if (avatar) {
    // 確保圖片路徑是正確的
    return new URL(`${avatar}`, import.meta.url).href;
  }
  // 如果没有頭像，返回一个默認圖片或空字符串
  return ""; // 可以换成一個默認圖片 URL
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      tempImageUrl.value = reader.result; // 將檔案讀取結果賦值給 tempImageUrl
      emit("updateAvatar", { name: file.name, data: reader.result }); // 將檔名和數據發送給父元件
    };
    reader.readAsDataURL(file); // 將檔案讀取為 Data URL
  }
};

// RWD
const isVerySmallScreen = ref(window.innerWidth < 768);

const isExtraSmallScreen = ref(window.innerWidth < 990);

const isSmallScreen = ref(window.innerWidth < 1200);

const isMediumScreen = ref(window.innerWidth < 1500);

const updateScreenSize = () => {
  isVerySmallScreen.value = window.innerWidth < 768;
  isExtraSmallScreen.value = window.innerWidth < 990;
  isSmallScreen.value = window.innerWidth < 1200;
  isMediumScreen.value = window.innerWidth < 1500;
};

onMounted(() => {
  // RWD
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  // RWD
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="row align-items-center">
    <div
      class="d-flex"
      :class="[
        isVerySmallScreen
          ? 'col-12'
          : isExtraSmallScreen
          ? 'col-6'
          : isSmallScreen
          ? 'col-7'
          : isMediumScreen
          ? 'col-8'
          : 'col-9',
      ]"
    >
      <input
        type="file"
        class="form-control"
        id="inputGroupFile01"
        @change="handleFileChange"
      />
    </div>
    <div
      class="col-3 d-flex justify-content-center"
      :class="[
        isVerySmallScreen
          ? 'col-12'
          : isExtraSmallScreen
          ? 'col-6'
          : isSmallScreen
          ? 'col-5'
          : isMediumScreen
          ? 'col-4'
          : 'col-3',
      ]"
    >
      <div class="circle-style-img">
        <i
          class="material-icons icon-style-avatar"
          v-if="!propsImg.img_avatar && !tempImageUrl"
          >person</i
        >
        <img
          :src="tempImageUrl || imgAvatarUrl"
          alt=""
          style="width: 100%; height: 100%; object-fit: cover"
          v-if="tempImageUrl || propsImg.img_avatar"
        />
      </div>
    </div>
  </div>
</template>

<style>
.circle-style-img {
  /* width: 85%; */
  /* height: 85%; */

  width: 150px;
  height: 150px;

  background-color: #d0d0d0;
  border-radius: 50%;
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  overflow: hidden;
}

.icon-style-avatar {
  font-size: 48px; /* 調整圖標大小 */
  color: #ffffff; /* 圖標顏色 */
}
</style>