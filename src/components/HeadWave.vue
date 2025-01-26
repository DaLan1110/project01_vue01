<script setup>
import { ref, onMounted, watch } from "vue";
import { useHeadWaveStore } from "../stores/HeadWave.js";
import { useRoute } from "vue-router";

const headwaveStore = useHeadWaveStore();

const route = useRoute();

const headWaveDownBgc = ref("#ffffff");

const updateHeadWaveDownBgc = (path) => {
  headWaveDownBgc.value = path === "/join-us" ? "#C7C7E2" : "#ffffff";
};

onMounted(() => {
  headwaveStore.setHeadWavePath(route.path);
  updateHeadWaveDownBgc(route.path);
});

watch(
  () => route.path,
  (newPath) => {
    headwaveStore.setHeadWavePath(newPath);
    updateHeadWaveDownBgc(newPath);
  }
);
</script>

<template>
  <div
    class="header-headwave"
    :style="{ backgroundColor: headwaveStore.headwave }"
  >
    <div class="inner-header-headwave flex-headwave">
      <!-- 內容 -->
      <template v-if="route.path === '/'">
        <slot name="home"></slot>
      </template>
      <template v-else-if="route.path === '/about'">
        <slot name="about"></slot>
      </template>
      <template v-else-if="route.path === '/advantage'">
        <slot name="advantage"></slot>
      </template>
      <template v-else-if="route.path === '/branch'">
        <slot name="branch"></slot>
      </template>
      <template v-else-if="route.path === '/join-us'">
        <slot name="join-us"></slot>
      </template>
      <template v-else-if="route.path === '/menu'">
        <slot name="menu"></slot>
      </template>
      <template v-else-if="route.path === '/shoppingCart'">
        <slot name="shoppingCart"></slot>
      </template>
      <template v-else-if="route.path.startsWith('/personal/')">
        <slot name="personal"></slot>
      </template>
    </div>
    <!--Waves Container-->
    <div>
      <svg
        class="head-wave"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave-headwave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax-headwave">
          <!-- <use xlink:href="#gentle-wave-headwave" x="48" y="0" fill="rgba(255,255,255,0.7" />-->
          <!-- <use xlink:href="#gentle-wave-headwave" x="48" y="3" fill="rgba(255,255,255,0.5)" />  -->
          <use
            xlink:href="#gentle-wave-headwave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          />
          <use
            xlink:href="#gentle-wave-headwave"
            x="48"
            y="7"
            :style="{ fill: headWaveDownBgc }"
          />
        </g>
      </svg>
    </div>
    <!--Waves end-->
  </div>
  <!--Header ends-->
</template>

<style>
.header-headwave {
  position: relative;
  text-align: center;
  /* background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%); */
  margin: 0;
  color: #6c6c6c;
  overflow: hidden;
}

.inner-header-headwave {
  height: 70vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex-headwave {
  /*Flexbox for containers*/
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  /* text-align: center; */
}

.head-wave {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

/* Animation */

.parallax-headwave > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax-headwave > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax-headwave > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

/* .parallax-headwave > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax-headwave > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
} */

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

@media (max-width: 1200px) {
  .inner-header-headwave {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .inner-header-headwave {
    height: 200px;
  }
}
</style>