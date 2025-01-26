<script setup>
import { ref } from "vue";

const imageStyleRefreshing01 = ref({});
const imageStyleRefreshing02 = ref({});
const imageStyleRefreshing03 = ref({});

const handleMouseMove = (event) => {
  const x = (event.clientX / window.innerWidth) * 30 - 5; // 計算水平移動量
  const y = (event.clientY / window.innerHeight) * 40 - 5; // 計算垂直移動量

  // 第一張圖片隨滑鼠移動
  imageStyleRefreshing01.value = {
    transform: `translate(${x}px, ${y}px)`,
  };

  // 第二張圖片反方向移動
  imageStyleRefreshing02.value = {
    transform: `translate(calc(-50% - ${x}px), calc(-50% - ${y}px))`,
  };

  // 第三張圖片移動速度較慢
  imageStyleRefreshing03.value = {
    transform: `translate(${-x * 0.15}px, ${-y * 0.15}px)`, // 速度變為原來的一半
  };
};

window.addEventListener("mousemove", handleMouseMove);
</script>

<template>
  <div class="advantage-refreshing-drink">
    <div class="container">
      <div class="pb-5">
        <h2 class="advantage-refreshing-title-h2">Refreshing Drink</h2>
        <h1 class="advantage-refreshing-title-h1">沁涼飲料</h1>
      </div>

      <div class="refreshing-row mt-5">
        <img
          src="../../assets/img/homeWave01/drink001.jpg"
          alt=""
          class="img-size01 refreshing01-position"
          :style="imageStyleRefreshing03"
        />
        <img
          src="../../assets/img/homeWave01/drink002.jpg"
          alt=""
          class="img-size01 refreshing02-position"
          :style="imageStyleRefreshing02"
        />
        <img
          src="../../assets/img/homeWave01/drink001.jpg"
          alt=""
          class="img-size01 refreshing03-position"
          :style="imageStyleRefreshing01"
        />
        <div class="refreshing04-position"></div>
      </div>
    </div>
  </div>
</template>

<style>
.advantage-refreshing-drink {
  height: 100vh;
}

.advantage-refreshing-title-h2 {
  color: #5b5b5b;
}

.advantage-refreshing-title-h1 {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
}

.refreshing-row {
  position: relative;
  height: 90vh;
  width: 100%;
}

.img-size01 {
  position: absolute;
  width: 290px;
  height: 50vh;
}

.refreshing01-position {
  left: calc(50% - 26vw);
  margin-left: 60px;
}

.refreshing02-position {
  left: calc(50% - 1vw);
  top: 50%;
  transform: translate(-50%, -50%);
}

.refreshing03-position {
  left: calc(50% + 7vw);
}

.refreshing04-position {
  width: 80%;
  aspect-ratio: 5 / 5; /* 寬高比例設定為 3:5（15% 寬對應 25% 高） */
  background-color: #f1e1ff;
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  position: absolute;
  animation: advantage-circle-deform01 10s infinite,
    advantage-circle-shake01 8s infinite linear;
  top: 0vh;
  left: -600px;
}

@keyframes advantage-circle-deform01 {
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

@keyframes advantage-circle-shake01 {
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
  .refreshing01-position {
    margin-left: -30px;
  }

  .img-size01 {
    width: 250px;
    height: 45vh;
  }

  .refreshing04-position {
    width: 60%;
    left: -500px;
  }
}

@media (max-width: 1300px) {
  .refreshing04-position {
    width: 60%;
    left: -450px;
  }
}

@media (max-width: 1200px) {
  .refreshing01-position {
    margin-left: -60px;
  }

  .refreshing02-position {
    top: 40%;
  }

  .refreshing04-position {
    width: 50%;
    left: -400px;
  }
}

@media (max-width: 1050px) {
  .refreshing04-position {
    width: 50%;
    left: -380px;
  }
}

@media (max-width: 990px) {
  .img-size01 {
    width: 215px;
    height: 40vh;
  }

  .refreshing02-position {
    top: 35%;
  }

  .refreshing04-position {
    left: -200px;
    top: -120px;
  }

  .advantage-refreshing-drink {
    height: 80vh;
  }
}

@media (max-width: 768px) {
  .img-size01 {
    width: 200px;
    height: 35vh;
  }

  .advantage-refreshing-title-h2 {
    font-size: 18px;
  }

  .advantage-refreshing-title-h1 {
    font-size: 40px;
  }

  .refreshing04-position {
    top: 40vh;
    margin-left: -30px;
  }

  .advantage-refreshing-drink {
    height: 70vh;
  }
}

@media (max-width: 650px) {
  .img-size01 {
    width: 150px;
    height: 30vh;
  }

  .refreshing02-position {
    top: 29%;
  }

  .refreshing04-position {
    top: 35vh;
    margin-left: 0px;
  }

  .advantage-refreshing-drink {
    height: 60vh;
  }
}

@media (max-width: 600px) {
  .refreshing04-position {
    width: 40%;
    margin-left: 80px;
  }
}
</style>