<script setup>
const propsColor = defineProps({
  waveBgc: {
    type: Object,
    default: () => ({}),
  },
  waveBgcDown: {
    type: String,
    default: '#ffffff'
  }
});
</script>

<template>
  <div class="header-wave01" :style="waveBgc">
    <!-- Top Waves -->
    <svg
      class="wave01 waves-top-wave01"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave-wave01"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax-wave01">
        <!-- <use xlink:href="#gentle-wave-wave01" x="48" y="0" fill="rgba(255,255,255,0.7)" /> -->
        <!-- <use xlink:href="#gentle-wave-wave01" x="48" y="3" fill="rgba(255,255,255,0.5)" /> -->
        <use
          xlink:href="#gentle-wave-wave01"
          x="48"
          y="5"
          fill="rgba(255,255,255,0.3)"
        />
        <use xlink:href="#gentle-wave-wave01" x="48" y="7" fill="#ffffff" />
      </g>
    </svg>

    <!-- Inner Header Content -->
    <div>
      <slot></slot>
    </div>

    <!-- Bottom Waves -->
    <svg
      class="wave01 waves-bottom-wave01"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave-wave01"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax-wave01">
        <!-- <use xlink:href="#gentle-wave-wave01" x="48" y="0" fill="rgba(255,255,255,0.7)" /> -->
        <!-- <use xlink:href="#gentle-wave-wave01" x="48" y="3" fill="rgba(255,255,255,0.5)" /> -->
        <use
          xlink:href="#gentle-wave-wave01"
          x="48"
          y="5"
          fill="rgba(255,255,255,0.3)"
        />
        <use
          xlink:href="#gentle-wave-wave01"
          x="48"
          y="7"
          :style="{ fill: waveBgcDown }"
        />
      </g>
    </svg>
  </div>
</template>

<style>
.header-wave01 {
  position: relative;
  text-align: center;
  overflow: hidden; /* Ensure waves don't overflow the container */
  margin: 0;
  font-family: Arial, sans-serif;
}

.wave01 {
  position: absolute;
  width: 100%;
  height: 5vh;
  left: 0;
  overflow: hidden; /* Hide any overflow from the waves */
}

.waves-top-wave01 {
  top: 0;
  transform: rotate(180deg); /* Flip the waves for the top */
}

.waves-bottom-wave01 {
  bottom: 0;
}

/* Animation */
.parallax-wave01 > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax-wave01 > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax-wave01 > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

/* .parallax-wave01 > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax-wave01 > use:nth-child(4) {
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

/* Shrinking for mobile */
/* @media (max-width: 768px) {
  .wave01 {
    height: 40px;
    min-height: 40px;
  }
} */
</style>