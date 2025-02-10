<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isSmallScreen = ref(window.innerWidth < 990);
const iconSize = ref("4x");

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
  iconSize.value = isSmallScreen.value ? "3x" : "4x";
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
  <div class="articleLength_advantage">
    <div class="row pb-5">
      <h2 style="color: #5b5b5b">Four<br />Advantage</h2>
      <h1 class="advantageTitle" style="font-size: 45px; color: #5b5b5b">
        四大優勢
      </h1>
    </div>

    <div class="row pt-5" :class="[isSmallScreen ? '' : 'mt-5']">
      <div class="col-3 d-flex align-items-center flex-column">
        <div class="box boxBorderRadius01 float-animation mb-5">
          <font-awesome-icon :icon="['fas', 'location-dot']" :size="iconSize" />
        </div>
        <h2 class="advantageTitle">便利</h2>
        <p class="advantageContent" :class="[isSmallScreen ? 'mt-3' : 'mt-5']">
          加盟店家已超過3000家 分布廣泛
        </p>
      </div>
      <div class="col-3 d-flex align-items-center flex-column">
        <div class="box boxBorderRadius02 float-animation mb-5">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" :size="iconSize" />
        </div>
        <h2 class="advantageTitle">品項豐富</h2>
        <p class="advantageContent" :class="[isSmallScreen ? 'mt-3' : 'mt-5']">
          飲料店提供多樣化的飲品選擇
        </p>
      </div>
      <div class="col-3 d-flex align-items-center flex-column">
        <div class="box boxBorderRadius03 float-animation mb-5">
          <font-awesome-icon :icon="['fas', 'face-smile']" :size="iconSize" />
        </div>
        <h2 class="advantageTitle">客製化</h2>
        <p class="advantageContent" :class="[isSmallScreen ? 'mt-3' : 'mt-5']">
          調整甜度、冰量、添加配料等 獲得個性化的飲品體驗
        </p>
      </div>
      <div class="col-3 d-flex align-items-center flex-column">
        <div class="box boxBorderRadius04 float-animation mb-5">
          <font-awesome-icon
            :icon="['fas', 'scale-balanced']"
            :size="iconSize"
          />
        </div>
        <h2 class="advantageTitle">價格實惠</h2>
        <p class="advantageContent" :class="[isSmallScreen ? 'mt-3' : 'mt-5']">
          顧客能夠享用而不會對生活開支造成壓力
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.articleLength_advantage {
  height: 80vh;
}

.advantageTitle {
  font-size: 35px;
  font-weight: 700;
  color: #9a91b8;
}

.advantageContent {
  font-size: 21px;
  color: #9a91b8;
  font-weight: 600;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  background-color: #9a91b8;
  color: #ffffff;
}

.boxBorderRadius01 {
  border-radius: 28% 72% 28% 72% / 57% 39% 61% 43%;
}

.boxBorderRadius02 {
  border-radius: 39% 61% 34% 66% / 52% 31% 69% 48%;
}

.boxBorderRadius03 {
  border-radius: 54% 46% 28% 72% / 58% 70% 30% 42%;
}

.boxBorderRadius04 {
  border-radius: 53% 47% 60% 40% / 39% 41% 59% 61%;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px); /* 上浮 */
  }
  100% {
    transform: translateY(0); /* 回到初始位置 */
  }
}

.float-animation {
  animation: float 3s ease-in-out infinite; /* 持續浮動動畫 */
}

@media (max-width: 990px) {
  .box {
    width: 90px;
    height: 90px;
  }

  .advantageTitle {
    font-size: 30px;
  }

  .advantageContent {
    font-size: 18px;
  }

  .articleLength_advantage {
    height: 65vh;
    margin-top: -70px;
    margin-bottom: 60px;
  }
}

@media (max-width: 768px) {
  .box {
    width: 80px;
    height: 80px;
  }

  .advantageTitle {
    font-size: 25px;
  }

  .advantageContent {
    font-size: 15px;
  }

  .articleLength_advantage {
    height: 55vh;
  }
}

@media (max-width: 600px) {
  .advantageTitle {
    font-size: 23px;
  }

  .advantageContent {
    display: none;
  }

  .articleLength_advantage {
    height: 45vh;
  }
}

@media (max-width: 550px) {
  .advantageTitle {
    font-size: 20px;
  }
}
</style>