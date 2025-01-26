<script setup>
import { ref } from "vue";

const imageStyleWinter01 = ref({});
const imageStyleWinter02 = ref({});

const handleMouseMove = (event) => {
  const x = (event.clientX / window.innerWidth) * 30 - 5; // 計算水平移動量
  const y = (event.clientY / window.innerHeight) * 40 - 5; // 計算垂直移動量

  // 第一張圖片隨滑鼠移動
  imageStyleWinter01.value = {
    transform: `translate(${x * 0.3 * 2}px, ${y * 0.3 * 2}px)`,
  };

  // 第二張圖片反方向移動
  imageStyleWinter02.value = {
    transform: `translate(calc(-50% - ${x * 0.4 * 2}px), calc(-50% - ${
      y * 0.4 * 2
    }px))`,
  };
};

window.addEventListener("mousemove", handleMouseMove);
</script>

<template>
  <div class="advantage-winter-hot">
    <div class="container">
      <div class="pb-5">
        <h2 class="advantage-winter-title01">Winter Hot Drink</h2>
        <h1 class="advantage-winter-title">冬季熱飲</h1>
      </div>

      <div class="winter-row mt-5">
        <img
          src="../../assets/img/homeWave01/drink003.jpg"
          alt=""
          class="img-winter-size winter01-position"
          :style="imageStyleWinter01"
        />
        <img
          src="../../assets/img/homeWave01/drink004.jpg"
          alt=""
          class="img-winter-size winter02-position"
          :style="imageStyleWinter02"
        />
      </div>
    </div>
  </div>
</template>

<style>
.advantage-winter-hot {
  height: 85vh;
}

.advantage-winter-title {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
}

.advantage-winter-title01 {
  margin-top: 10vh;
  color: #5b5b5b;
}

.winter-row {
  position: relative;
  height: 90vh;
  width: 100%;
}

.img-winter-size {
  position: absolute;
  width: 40%;
  height: auto;
}

.winter01-position {
  left: calc(50% - 26vw);
}

.winter02-position {
  left: calc(50% + 13vw);
  top: 35%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

@keyframes advantage-circle-deform03 {
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

@keyframes advantage-circle-shake03 {
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

@media (max-width: 990px) {
  .winter02-position {
    top: 20%;
    left: 75%;
  }

  .advantage-winter-hot {
    height: 60vh;
  }
}

@media (max-width: 500px) {
  .img-winter-size {
    width: 45%;
  }

  .winter01-position {
    left: calc(50% - 40vw);
  }
}
</style>