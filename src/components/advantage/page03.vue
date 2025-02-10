<script setup>
import { ref } from "vue";

const imageStyleWarm01 = ref({});
const imageStyleWarm02 = ref({});
const imageStyleWarm03 = ref({});

const handleMouseMove = (event) => {
  const x = (event.clientX / window.innerWidth) * 30 - 5; // 計算水平移動量
  const y = (event.clientY / window.innerHeight) * 40 - 5; // 計算垂直移動量

  // 第一張圖片隨滑鼠移動
  imageStyleWarm01.value = {
    transform: `translate(${x}px, ${y}px)`,
  };

  // 第二張圖片反方向移動
  imageStyleWarm02.value = {
    transform: `translate(calc(-50% - ${x}px), calc(-50% - ${y}px))`,
  };

  // 第三張圖片移動速度較慢
  imageStyleWarm03.value = {
    transform: `translate(${-x * 0.15}px, ${-y * 0.15}px)`, // 速度變為原來的一半
  };
};

window.addEventListener("mousemove", handleMouseMove);
</script>

<template>
  <div class="advantage-warm-soup">
    <div class="container">
      <div class="pb-5">
        <h2 class="advantage-warm-title-h2">Warm Heart Soup</h2>
        <h1 class="advantage-warm-title-h1">暖心熱湯</h1>
      </div>

      <div class="warm-row mt-5">
        <img
          src="../../assets/img/homeWave01/drink005.jpg"
          alt=""
          class="img-warm-size warm01-position"
          :style="imageStyleWarm03"
        />
        <img
          src="../../assets/img/homeWave01/drink024.jpg"
          alt=""
          class="img-warm-size warm02-position"
          :style="imageStyleWarm02"
        />
        <img
          src="../../assets/img/homeWave01/drink007.jpg"
          alt=""
          class="img-warm-size warm03-position"
          :style="imageStyleWarm01"
        />
        <div class="warm04-position"></div>
      </div>
    </div>
  </div>
</template>

<style>
.advantage-warm-soup {
  height: 100vh;
}

.advantage-warm-title-h2 {
  color: #5b5b5b;
}

.advantage-warm-title-h1 {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
}

.warm-row {
  position: relative;
  height: 90vh;
  width: 100%;
}

.img-warm-size {
  position: absolute;
  width: 385px;
  height: 260px;
}

.warm01-position {
  left: calc(50% - 30vw);
}

.warm02-position {
  left: calc(50% - 1vw);
  top: 40%;
  transform: translate(-50%, -50%);
}

.warm03-position {
  left: calc(50% + 9vw);
}

.warm04-position {
  width: 120px;
  height: 140px;
  background-color: #e6bc9c;
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  position: absolute;
  animation: advantage-warm-circle-deform01 10s infinite,
    advantage-warm-circle-shake01 8s infinite linear;
  top: 55vh;
  left: -500px;
}

@keyframes advantage-warm-circle-deform01 {
  0% {
    border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  }

  25% {
    border-radius: 45% 55% 37% 63% / 56% 36% 54% 44%;
  }

  50% {
    border-radius: 59% 41% 68% 32% / 48% 52% 48% 62%;
  }

  75% {
    border-radius: 50% 50% 39% 61% / 61% 69% 31% 39%;
  }

  100% {
    border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  }
}

@keyframes advantage-warm-circle-shake01 {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-45px);
  }

  100% {
    transform: translateY(0);
  }
}

@media (max-width: 1450px) {
  .img-warm-size {
    position: absolute;
    width: 305px;
    height: 200px;
  }

  .warm02-position {
    top: 35%;
  }

  .warm04-position {
    top: 35vh;
    left: -400px;
  }

  .advantage-warm-soup {
    height: 80vh;
  }
}

@media (max-width: 1200px) {
  .img-warm-size {
    position: absolute;
    width: 280px;
    height: 190px;
  }

  .warm04-position {
    top: 30vh;
    left: -300px;
  }

  .advantage-warm-soup {
    height: 75vh;
  }
}

@media (max-width: 990px) {
  .img-warm-size {
    position: absolute;
    width: 250px;
    height: 170px;
  }

  .warm02-position {
    top: 30%;
  }

  .warm04-position {
    top: 28vh;
  }

  .advantage-warm-soup {
    height: 65vh;
  }
}

@media (max-width: 850px) {
  .warm04-position {
    left: -250px;
  }
}

@media (max-width: 768px) {
  .img-warm-size {
    position: absolute;
    width: 210px;
    height: 160px;
  }

  .warm02-position {
    top: 30%;
  }

  .warm03-position {
    left: calc(50% + 6vw);
  }

  .advantage-warm-title-h2 {
    font-size: 18px;
  }

  .advantage-warm-title-h1 {
    font-size: 40px;
  }

  .warm04-position {
    width: 90px;
    height: 110px;
    top: 26vh;
    left: -200px;
  }

  .warm01-position {
    left: calc(50% - 35vw);
  }

  .advantage-warm-soup {
    height: 60vh;
  }
}

@media (max-width: 650px) {
  .img-warm-size {
    position: absolute;
    width: 180px;
    height: 130px;
  }

  .warm02-position {
    top: 24%;
  }

  .warm04-position {
    width: 60px;
    height: 70px;
    top: 24vh;
    left: -150px;
  }

  .warm01-position {
    left: calc(50% - 40vw);
  }
}
</style>