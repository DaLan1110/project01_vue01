<script setup>
</script>

<template>
  <div class="advantage-protagonists">
    <div class="container">
      <div class="pb-5">
        <h2 class="advantage-protagonists-title01">Three Protagonists</h2>
        <h1 class="advantage-protagonists-title">夏季三大主角</h1>
      </div>
      <div style="display: flex">
        <div class="col-4 advantage-protagonists-text">
          <div class="img-protagonists-size advantage-protagonists-img01"></div>
          <p class="advantage-protagonists-text01">Nutritious Eggs</p>
          <p class="advantage-protagonists-text02">營養小雞蛋</p>
          <p class="advantage-protagonists-text03">滿足之口感</p>
        </div>
        <div class="col-4 advantage-protagonists-text">
          <div class="img-protagonists-size advantage-protagonists-img02"></div>
          <p class="advantage-protagonists-text01">Fresh Milk</p>
          <p class="advantage-protagonists-text02">純正鮮牛奶</p>
          <p class="advantage-protagonists-text03">新鮮且美味</p>
        </div>
        <div class="col-4">
          <div class="img-protagonists-size advantage-protagonists-img03"></div>
          <p class="advantage-protagonists-text01">Small Mesona Balls</p>
          <p class="advantage-protagonists-text02">Q嫩小仙草</p>
          <p class="advantage-protagonists-text03">輕鬆小愉悅</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.advantage-protagonists {
  height: 85vh;
}

.advantage-protagonists-title {
  font-size: 45px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 50px;
}

.advantage-protagonists-title01 {
  margin-top: 10vh;
  color: #ffffff;
}

.advantage-protagonists-text01 {
  color: #ffffff;
  font-size: 25px;
  margin-top: 25px;
  white-space: nowrap
}

.advantage-protagonists-text02 {
  color: #ffffff;
  font-size: 35px;
  margin-bottom: 5px;
  margin-top: 25px;
  white-space: nowrap
}

.advantage-protagonists-text03 {
  color: #ffffff;
  font-size: 27px;
  white-space: nowrap
}

.img-protagonists-size {
  width: 250px;
  height: 250px;
  margin: 0 auto;
  background-position: center;
  background-size: cover;
}

.advantage-protagonists-img01 {
  background-image: url("../../assets/img/advantageWave01/egg.jpg");
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  animation: advantage-protagonists-circle-deform01 10s infinite,
    advantage-protagonists-circle-shake01 8s infinite linear;
}

.advantage-protagonists-img02 {
  background-image: url("../../assets/img/advantageWave01/milk.jpg");
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  animation: advantage-protagonists-circle-deform01 10s infinite,
    advantage-protagonists-circle-shake01 8s infinite linear;
}

.advantage-protagonists-img03 {
  background-image: url("../../assets/img/advantageWave01/grassjelly.jpg");
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  animation: advantage-protagonists-circle-deform01 10s infinite,
    advantage-protagonists-circle-shake01 8s infinite linear;
}

@keyframes advantage-protagonists-circle-deform01 {
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

@keyframes advantage-protagonists-circle-shake01 {
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
  .img-protagonists-size{
    width: 150px;
    height: 150px;
  }
  
  .advantage-protagonists-text01 {
    font-size: 20px;
  }

  .advantage-protagonists-text02 {
    font-size: 30px;
  }

  .advantage-protagonists-text03 {
    font-size: 22px;
  }

  .advantage-protagonists{
    height: 60vh;
  }
}

@media (max-width: 768px) {
  .img-protagonists-size{
    width: 120px;
    height: 120px;
  }
  
  .advantage-protagonists-text01 {
    font-size: 18px;
  }

  .advantage-protagonists-text02 {
    font-size: 28px;
  }

  .advantage-protagonists-text03 {
    font-size: 20px;
  }

  .advantage-protagonists{
    height: 60vh;
  }
}
</style>