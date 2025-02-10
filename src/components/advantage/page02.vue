<script setup>
import { ref } from "vue";

const imageStyleSignature01 = ref({});
const imageStyleSignature02 = ref({});
const imageStyleSignature03 = ref({});

const handleMouseMove = (event) => {
  const x = (event.clientX / window.innerWidth) * 30 - 5; // 計算水平移動量
  const y = (event.clientY / window.innerHeight) * 40 - 5; // 計算垂直移動量

  // 第一張圖片隨滑鼠移動
  imageStyleSignature01.value = {
    transform: `translate(${x}px, ${y}px)`,
  };

  // 第二張圖片反方向移動
  imageStyleSignature02.value = {
    transform: `translate(calc(-50% - ${x}px), calc(-50% - ${y}px))`,
  };

  // 第三張圖片移動速度較慢
  imageStyleSignature03.value = {
    transform: `translate(${-x * 0.2}px, ${-y * 0.2}px)`, // 速度變為原來的一半
  };
};

window.addEventListener("mousemove", handleMouseMove);
</script>

<template>
  <div class="advantage-signature-ice">
    <div class="container">
      <div class="pb-5">
        <h2 class="advantage-signature-title-h2">Signature Ice</h2>
        <h1 class="advantage-signature-title-h1">招牌冰品</h1>
      </div>

      <div class="signature-row mt-5">
        <img
          src="../../assets/img/homeWave01/drink022.jpg"
          alt=""
          class="img-size02 signature01-position"
          :style="imageStyleSignature01"
        />
        <img
          src="../../assets/img/homeWave01/drink002.jpg"
          alt=""
          class="img-size02 signature02-position"
          :style="imageStyleSignature02"
        />
        <img
          src="../../assets/img/homeWave01/drink023.jpg"
          alt=""
          class="img-size02 signature03-position"
          :style="imageStyleSignature03"
        />
        <div class="signature04-position"></div>
      </div>
    </div>
  </div>
</template>

<style>
.advantage-signature-ice {
  height: 100vh;
}

.advantage-signature-title-h2 {
  color: #5b5b5b;
}

.advantage-signature-title-h1 {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
}

.signature-row {
  position: relative;
  height: 90vh;
  width: 100%;
}

.img-size02 {
  position: absolute;
  width: 290px;
  height: 50vh;
}

.signature01-position {
  left: calc(50% - 26vw);
}

.signature02-position {
  left: calc(50% + 2vw);
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.signature03-position {
  left: calc(50% + 9vw);
}

.signature04-position {
  width: 150px;
  height: 150px;
  background-color: #c7c7e2;
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  position: absolute;
  animation: advantage-circle-deform01 10s infinite,
    advantage-circle-shake01 8s infinite linear;
  top: -20vh;
  right: -22vw;
}

@keyframes advantage-circle-deform02 {
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

@keyframes advantage-circle-shake02 {
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

@media (max-width: 1650px) {
  .signature04-position {
    right: -20vw;
  }
}

@media (max-width: 1450px) {
  .signature01-position {
    margin-left: -30px;
  }

  .img-size02 {
    width: 250px;
    height: 45vh;
  }

  .signature04-position {
    left: 400px;
  }
}

@media (max-width: 1200px) {
  .signature01-position {
    margin-left: -60px;
  }

  .signature02-position {
    top: 40%;
  }

  .signature04-position {
    left: 400px;
  }
}

@media (max-width: 990px) {
  .img-size02 {
    width: 215px;
    height: 40vh;
    /* z-index: 2; */
  }

  .signature02-position {
    top: 35%;
  }

  .signature04-position {
    left: 350px;
  }

  .advantage-signature-ice {
    height: 85vh;
  }
}

@media (max-width: 850px) {
  .signature04-position {
    left: 300px;
  }
}

@media (max-width: 768px) {
  .img-size02 {
    width: 200px;
    height: 35vh;
  }

  .advantage-signature-title-h2 {
    font-size: 18px;
  }

  .advantage-signature-title-h1 {
    font-size: 40px;
  }

  .signature04-position {
    left: 300px;
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 700px) {
  .signature04-position {
    left: 200px;
  }
}

@media (max-width: 650px) {
  .img-size02 {
    width: 150px;
    height: 30vh;
  }

  .signature02-position {
    top: 29%;
  }

  .advantage-signature-ice {
    height: 70vh;
  }
}
</style>