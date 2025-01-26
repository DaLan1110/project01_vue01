<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pahtFootWaveBgc = ref("#ffffff");

watch(
  () => route.path,
  (newPath) => {
    pahtFootWaveBgc.value = newPath === "/advantage" ? "#d0d0d0" : "#ffffff";
  }
);

// 視窗 1200px
const isSmallScreen = ref(window.innerWidth < 1200);
// 視窗 850px
const isVerySmallScreen = ref(window.innerWidth < 850);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1200;
  isVerySmallScreen.value = window.innerWidth < 850;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="header-footerwave">
    <!-- Top Waves -->
    <svg
      class="footerwave waves-top-footerwave"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave-footewave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax-footerwave">
        <!-- <use xlink:href="#gentle-wave-footewave" x="48" y="0" fill="rgba(255,255,255,0.7)" /> -->
        <!-- <use xlink:href="#gentle-wave-footewave" x="48" y="3" fill="rgba(255,255,255,0.5)" /> -->
        <use
          xlink:href="#gentle-wave-footewave"
          x="48"
          y="5"
          fill="rgba(255,255,255,0.3)"
        />
        <use
          xlink:href="#gentle-wave-footewave"
          x="48"
          y="7"
          :style="{ fill: pahtFootWaveBgc }"
        />
      </g>
    </svg>

    <!-- Inner Header Content -->
    <div class="footwave-content">
      <div class="content">
        <div class="join-us-content">
          <div :class="isSmallScreen ? 'custom-container' : 'container d-flex'">
            <div
              :class="isSmallScreen ? 'col-6' : 'col-6'"
              class="footwaveimgto850"
            >
              <img
                src="../assets/img/homeTitle/sun.png"
                alt=""
                class="footwaveimg"
              />
            </div>
            <div
              :class="
                isVerySmallScreen ? 'col-8' : isSmallScreen ? 'col-3' : 'col-4'
              "
              class="joinus-format"
            >
              <h2 class="mb-4 footwaveto1200h2">Join Us</h2>
              <h1 class="footwaveto1200h1">台灣消暑の專家</h1>
              <h1 class="footwaveto1200h1">全球加盟連鎖招募中</h1>
              <RouterLink to="/join-us" class="btn-join mt-5"
                >即刻加入夏季大家庭</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.header-footerwave {
  position: relative;
  text-align: center;
  background-color: #c2c287;
  overflow: hidden; /* Ensure waves don't overflow the container */
  margin: 0;
  font-family: Arial, sans-serif;
}

.footerwave {
  position: absolute;
  width: 100%;
  height: 5vh;
  left: 0;
  overflow: hidden; /* Hide any overflow from the waves */
}

.waves-top-footerwave {
  top: 0;
  transform: rotate(180deg); /* Flip the waves for the top */
}

/* Animation */
.parallax-footerwave > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax-footerwave > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax-footerwave > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

/* .parallax-footerwave > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax-footerwave > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
} */

.footwave-content {
  height: 50vh;
  width: 100vw;
  margin-top: 50px;
  padding: 0;
}

.joinus-format {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  text-align: center;
  color: #5b5b5b;
}

.btn-join {
  background-color: #b8b8dc;
  color: #ffffff;
  font-size: 25px;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
}

.btn-join:hover,
.btn-join:active {
  background-color: #c7c7e2;
  color: #ffffff;
}

.custom-container {
  display: flex;
  width: 100%; /* 自定義寬度，滿屏 */
  padding: 0;
}

.footwaveimg {
  width: 80%;
  height: auto;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/* Shrinking for mobile */
@media (max-width: 1200px) {
  .footwaveto1200h1 {
    font-size: 26px;
    font-weight: 500;
  }

  .btn-join {
    font-size: 23px;
  }

  .footwaveimg {
    width: 60%;
  }

  .footwave-content {
    height: 35vh;
  }
}

@media (max-width: 950px) {
  .footwaveto1200h1 {
    font-size: 23px;
    font-weight: 500;
  }

  .btn-join {
    font-size: 20px;
  }

  .footwave-content {
    height: 30vh;
  }
}

@media (max-width: 850px) {
  .footwaveimgto850 {
    display: none;
  }

  .btn-join {
    font-size: 20px;
  }

  .footwave-content {
    height: 30vh;
  }

  .custom-container {
    margin-top: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center; /* 適用於文字內容 */
  }
}

@media (max-width: 600px) {
  .footwave-content {
    height: 25vh;
  }
}
</style>