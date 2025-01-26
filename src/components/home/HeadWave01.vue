<script setup>
</script>

<template>
  <div class="banner">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <h2>Penueling</h2>
  </div>
</template>

<style>
.banner {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
}

.banner h2 {
  position: absolute;
  color: #fff;
  top: 10vw;
  left: 15%;
  /* transform: translate(-50%, -50%); */
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 3vw;
}

.banner .wave {
  background-color: rgba(211, 164, 255);
  width: 200vw;
  height: 200vw;
  position: absolute;
  top: -75vw;
  left: 50%;
  opacity: 0.4;
  margin-left: -100vw;
  margin-top: -100vw;
  border-radius: 43%;
  animation: rotate 9000ms infinite linear;
}

.banner .wave:nth-child(1) {
  animation: rotate 12000ms infinite linear;
}

.banner .wave:nth-child(2) {
  animation: rotate 15000ms infinite linear;
  opacity: 0.1;
  background-color: rgba(119, 119, 119);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>