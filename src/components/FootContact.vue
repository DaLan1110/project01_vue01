<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const FootContactBgc = ref("#c2c287");

watch(
  () => route.path,
  (newPath) => {
    FootContactBgc.value = newPath === "/join-us" ? "#C7C7E2" : "#c2c287";
  },
  { immediate: true }
);
</script>

<template>
  <div class="svg-position01" :style="{ backgroundColor: FootContactBgc }">
    <!-- 第一个 SVG -->
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      style="height: 100%; width: 100%"
    >
      <path
        d="M-1.81,12.36 C193.45,40.04 374.03,-9.35 503.82,23.23 L500.00,150.22 L-0.00,150.22 Z"
        style="stroke: none; fill: #7b7b7b"
      ></path>
    </svg>

    <!-- 出现在第一个 SVG 里面 -->
    <div class="svg-content01 mt-3">
      <div class="container-fluid">
        <div class="row footcontact-one-row">
          <div class="svg-content01-left mt-5 ms-5 svg-content01-col1">
            <RouterLink to="/about#head" class="svg-content01-col1-text"
              >About Us</RouterLink
            >
            <RouterLink to="/advantage#head" class="svg-content01-col1-text"
              >Advantage</RouterLink
            >

            <RouterLink to="/menu#head" class="svg-content01-col1-text"
              >Menu</RouterLink
            >
            <RouterLink to="/join-us#head" class="svg-content01-col1-text"
              >Join Us</RouterLink
            >
          </div>
          <div class="svg-content01-middle mt-5 ms-5 position-relative">
            <div class="vertical-line"></div>
            <div class="row ms-2 ms-sm-5 svg-content01-col8">
              <p class="svg-content01-col8-text">Get connected</p>
              <h2 class="svg-content01-col8-text">全球代理與台灣加盟專線</h2>
              <h2 class="svg-content01-col8-text">0800-000-000</h2>
              <p class="svg-content01-col8-text">Follow us</p>
            </div>
          </div>
          <div class="svg-content01-right mt-5">
            <img
              src="../assets/img/homeTitle/sun.png"
              alt=""
              class="svg-content01-col2-img"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 第二个 SVG -->
    <div class="svg-position02">
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style="height: 100%; width: 100%"
      >
        <path
          d="M-1.81,25.21 C225.61,105.26 302.36,-29.12 503.26,51.90 L504.95,152.71 L-0.00,150.22 Z"
          style="stroke: none; fill: #5b5b5b"
        ></path>
      </svg>
      <div class="svg-content02">MyWork @ 夏季餐飲有限公司</div>
    </div>
  </div>
</template>

<style>
.svg-position01 {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.svg-position02 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  overflow: hidden;
}

.svg-content01 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  color: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.svg-content02 {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  /* 確保按鈕文字在一行內顯示 */
  white-space: nowrap;

  /* 按鈕過小而文字過長，會顯示省略號（...） */
  text-overflow: ellipsis;
}

.svg-content01-col1 {
  font-size: 24px;
}

.svg-content01-col1-text {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
  text-decoration: none;
}

.svg-content01-col1-text:hover,
.svg-content01-col1-text:active {
  color: #a6a6d2;
}

.vertical-line {
  width: 1px;
  height: 95%;
  background-color: #ffffff;
  position: absolute;
  right: 100%;
  top: 0;
}

.svg-content01-col8 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.svg-content01-col8-text {
  flex: 1;
  /* 每個元素擴展以平分空間 */
  margin: 0;
  /* 去除預設的邊距 */
  margin-top: 5px;
}

.svg-content01-col2 {
  overflow: hidden;
  display: flex;
  justify-content: right;
  align-items: center;
}

.svg-content01-col2-img {
  width: 165px; /* 固定寬度 */
  height: auto; /* 保持比例 */
}

.svg-content01-left {
  flex: 1; /* 相當於 10% 的寬度 */
  display: flex; /* 啟用 Flexbox */
  flex-direction: column; /* 垂直排列子項目 */
  justify-content: center; /* 上下置中 */
  align-items: flex-start; /* 左對齊 */
  height: 100%; /* 確保父容器有高度 */
}

.svg-content01-middle {
  flex: 7; /* 相當於 10% 的寬度 */
}

.svg-content01-right {
  flex: 1; /* 右側圖片的比例 */
  display: flex;
  justify-content: flex-end; /* 圖片靠右對齊 */
  align-items: center; /* 圖片垂直置中 */
}

.svg-content01-left,
.svg-content01-middle,
.svg-content01-right {
  height: 20vh; /* 滿屏高度，視需求調整 */
}

@media (max-width: 850px) {
  .svg-content01-col1-text {
    font-size: 23px;
  }
  .svg-content01-col8-text {
    font-size: 18px;
  }
}

@media (max-width: 710px) {
  .svg-content01-col1-text {
    font-size: 23px;
  }
  .svg-content01-col8-text {
    font-size: 20px;
  }
}

@media (max-width: 675px) {
  .svg-content01-col1-text {
    font-size: 23px;
  }
  .svg-content01-col8-text {
    font-size: 19px;
  }
}

@media (max-width: 665px) {
  .svg-content01-col2-img {
    display: none;
  }

  .svg-content01-right {
    display: none;
  }
}

@media (max-width: 480px) {
  .svg-content01-col1-text {
    font-size: 20px;
  }
  .svg-content01-col8-text {
    margin-top: 0;
  }
}
</style>