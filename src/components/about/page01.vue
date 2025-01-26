<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isSmallScreen = ref(window.innerWidth < 768);
const isMediumScreen = ref(window.innerWidth < 700);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
  isMediumScreen.value = window.innerWidth < 700;
};

onMounted(() => {
  updateScreenSize(); // 初始化
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="about-us">
    <div class="pb-5">
      <h2 style="color: #5b5b5b">About Summer</h2>
      <h1 class="about-usTitle">關於夏季</h1>
    </div>

    <div class="about-us-row">
      <div
        class="about-page01-img"
        :class="[isMediumScreen ? 'col-9' : isSmallScreen ? 'col-7' : 'col-6']"
      >
        <div class="col-6">
          <img
            src="../../assets/img/aboutView/1-removebg-preview.png"
            class="aboutus-img01"
            alt=""
          />
          <img
            src="../../assets/img/aboutView/2-removebg-preview.png"
            class="aboutus-img02"
            alt=""
          />
        </div>
        <div class="col-6">
          <img
            src="../../assets/img/aboutView/3-removebg-preview.png"
            class="aboutus-img03"
            alt=""
          />
          <img
            src="../../assets/img/aboutView/4-removebg-preview.png"
            class="aboutus-img04"
            alt=""
          />
        </div>
      </div>
      <div :class="[isSmallScreen ? 'col-10' : 'col-5']">
        <h1 class="aboutus-titletext01">About Us</h1>
        <p class="aboutus-titletext02">歡迎來到 「夏季」！</p>
        <br />
        <p class="aboutus-contenttext">
          在「夏季」，我們相信每一杯飲料都應該是一場味蕾的冒險。我們的使命是為您帶來最純粹、最創新的飲品體驗，無論您是尋找經典茶飲、創意調製，還是健康選擇，我們都能滿足您的需求。
        </p>
        <p class="aboutus-contenttext">
          我們的故事「夏季」的故事始於對茶的熱愛。我們的創辦人，一位對茶文化充滿熱情的茶藝師，經過多年在各大茶區的探索與學習，決定將這份熱愛分享給每一位茶友。從第一家小小的店面到今天的多家分店，我們始終堅持使用最優質的原料，精心調製每一杯飲品。
        </p>
        <RouterLink to="#aboutHistory" class="btn about-history-btn"
          >觀看歷史</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style>
.about-us {
  height: 120vh;
}

.about-us-row {
  display: flex;
}

.about-usTitle {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
}

.about-page01-img {
  display: flex;
}

.aboutus-img01 {
  width: 70%;
  display: block;
  margin-left: auto;
  margin-top: 10%;
}

.aboutus-img02 {
  width: 110%;
  display: block;
}

.aboutus-img03 {
  width: 110%;
  display: block;
  margin-right: auto;
  margin-top: 20%;
}

.aboutus-img04 {
  width: 50%;
  display: block;
  margin-right: auto;
}

.aboutus-titletext01 {
  margin-top: 20%;
  margin-left: 80px;
  font-size: 20px;
  font-weight: 900;
  text-align: left;
  color: #5b5b5b;
}

.aboutus-titletext02 {
  margin-left: 80px;
  font-size: 30px;
  font-weight: 900;
  text-align: left;
  color: #5b5b5b;
}

.aboutus-contenttext {
  margin-left: 80px;
  font-size: 19px;
  font-weight: 600;
  text-align: left;
  color: #5b5b5b;
}

.about-history-btn {
  margin-top: 5% !important;
  background-color: #ffffff !important; /* 按鈕背景色 */
  color: #5b5b5b !important; /* 按鈕文字顏色 */
  font-size: 16px !important; /* 文字大小 */
  font-weight: 700 !important; /* 文字粗細 */
  padding: 10px 40px !important; /* 內邊距 */
  border: 1px solid !important;
  border-radius: 5px !important;
  transition: background-color 0.3s ease !important;
}

.about-history-btn:hover {
  background-color: #5b5b5b !important;
  color: #ffffff !important;
  font-weight: 900 !important;
}

@media (max-width: 1400px) {
  .about-us {
    height: 100vh;
  }
}

@media (max-width: 1200px) {
  .aboutus-contenttext {
    margin-left: 30px;
    font-size: 18px !important;
  }

  .aboutus-titletext01,
  .aboutus-titletext02 {
    margin-left: 30px;
  }

  .about-us {
    height: 90vh;
  }

  .about-page01-img {
    margin-top: 50px;
  }
}

@media (max-width: 900px) {
  .about-page01-img {
    margin-top: 100px;
  }
}

@media (max-width: 990px) {
  .aboutus-contenttext {
    font-size: 16px !important;
  }

  .aboutus-titletext02 {
    font-size: 25px;
  }
}

@media (max-width: 768px) {
  .about-us {
    height: 110vh;
  }

  .about-us-row {
    justify-content: center;
    align-items: center;
  }

  .about-us > div {
    display: flex;
    flex-direction: column; /* 變成垂直排列 */
  }

  .about-page01-img {
    margin-top: -10px;
    margin-bottom: -90px;
  }
}

@media (max-width: 700px) {
  .about-page01-img {
    margin-bottom: -50px;
  }
}
</style>