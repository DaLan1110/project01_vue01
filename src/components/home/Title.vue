<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 視窗 1200px
const isSmallScreen = ref(window.innerWidth < 1200);
// 視窗 768px
const isVerySmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1200;
  isVerySmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="container d-flex">
    <div
      :class="isVerySmallScreen ? 'col-5' : isSmallScreen ? 'col-4' : 'col-3'"
      class="positionTitle"
    >
      <img
        src="../../assets/img/homeTitle/sun.png"
        class="positionSun"
        alt=""
      />
      <div class="home-title-text">
        <h2 class="home-title-h2">Cool Down Specialist</h2>
        <h1 class="home-title-h1">炎熱消暑の專家</h1>
      </div>
    </div>
    <div class="col-9 positionDrink00">
      <img
        src="../../assets/img/homeTitle/drink001.png"
        class="positionDrink01-home"
        alt=""
      />
      <img
        src="../../assets/img/homeTitle/drink002.png"
        class="positionDrink02-home"
        alt=""
      />
      <img
        src="../../assets/img/homeTitle/cloud.png"
        class="positionCloud01"
        alt=""
      />
      <img
        src="../../assets/img/homeTitle/cloud.png"
        class="positionCloud02"
        alt=""
      />
    </div>
  </div>
</template>

<style>
.positionTitle {
  position: relative;
  display: flex;
  flex-direction: column; /* 垂直排列內容 */
  align-items: center; /* 水平置中 */
  justify-content: center; /* 垂直置中 */
}

.positionDrink00 {
  position: relative;
}

.positionDrink01-home {
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: auto;
}

.positionDrink02-home {
  position: absolute;
  top: 30vh;
  left: 20vw;
  width: 750px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.positionSun {
  position: absolute;
  top: 0;
  left: -100px;
  width: 300px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.positionCloud01 {
  position: absolute;
  top: 0;
  right: -50px;
  width: 250px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.positionCloud02 {
  position: absolute;
  top: 10px;
  right: 0px;
  width: 300px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.home-title-text {
  margin-top: 300px;
  text-align: center;
}

.home-title-h1 {
  font-size: 35px;
}

@media (max-width: 1200px) {
  .positionDrink01-home,
  .positionDrink02-home {
    width: 550px;
  }

  .positionDrink02-home {
    top: 200px;
  }
}

@media (max-width: 1150px) {
  .positionCloud01,
  .positionCloud02 {
    left: -200px;
    top: 40px;
  }

  .positionSun {
    left: -20px;
  }
}

@media (max-width: 990px) {
  .positionSun {
    top: 0; /* 保持在頂部 */
    left: 50%; /* 將左邊距設定為 50% */
    transform: translateX(-50%); /* 向左平移 50%，使其真正居中 */
  }

  .positionCloud01,
  .positionCloud02 {
    display: none;
  }

  .home-title-text {
    margin-top: 250px;
  }

  .home-title-h2 {
    font-size: 20px;
  }

  .home-title-h1 {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .positionSun {
    width: 200px;
    height: auto;
    display: none;
  }

  .home-title-text {
    margin-top: 70px;
  }

  .home-title-h2 {
    font-size: 16px;
  }

  .home-title-h1 {
    font-size: 22px;
  }

  .positionDrink01-home {
    width: 450px !important;
    left: -90px !important;
    top: -20px !important;
  }

  .positionDrink02-home {
    top: 90px;
    left: 70px !important;
    width: 400px !important;
  }
}
</style>