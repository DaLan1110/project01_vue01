<script setup>
</script>

<template>
  <div class="container" style="display: flex">
    <div class="col-6 position-advantage00">
      <img
        src="../../assets/img/advantageTitle/advantagetitle002.png"
        class="position-advantage01-img"
        alt=""
      />
      <div class="position-advantage02-box">
        <img
          src="../../assets/img/advantageTitle/advantagetitle004.png"
          class="position-advantage02-img"
          alt=""
        />
      </div>
      <div class="position-advantage03-box">
        <img
          src="../../assets/img/advantageTitle/advantagetitle003.png"
          class="position-advantage03-img"
          alt=""
        />
      </div>
    </div>
    <div class="col-6 advantage-titletext">
      <h2 class="advantage-title-h2">Mixed Species</h2>
      <h1 class="advantage-title-h1">夏季獨創混種加盟</h1>
      <h3>多元產品 四季熱賣</h3>
    </div>
  </div>
</template>

<style>
.position-advantage00 {
  position: relative;
}

.position-advantage01-img {
  position: absolute;
  top: -10vh;
  left: 15vw;
  width: 700px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.position-advantage02-img {
  position: absolute;
  width: 250px;
  height: auto;
}

.position-advantage03-img {
  position: absolute;
  width: 250px;
  height: auto;
}

.position-advantage02-box {
  width: 220px;
  height: 220px;
  background-color: #ffaf60;
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  position: relative;
  animation: img-circle01 10s infinite, shake01 8s infinite linear;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5vh;
}

.position-advantage03-box {
  width: 300px;
  height: 300px;
  background-color: #ffbd9d;
  transition: border-radius 3s linear;
  border-radius: 59% 41% 68% 32% / 48% 52% 48% 62%;
  position: relative;
  animation: img-circle02 8s infinite, shake02 8s infinite linear;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 18vh;
}

.advantage-titletext {
  margin-top: 300px;
  padding-left: 15vw;
  text-align: right;
}

.advantage-title-h1 {
  font-size: 35px;
}

@keyframes img-circle01 {
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

@keyframes img-circle02 {
  0% {
    border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  }

  25% {
    border-radius: 50% 50% 39% 61% / 61% 69% 31% 39%;
  }

  50% {
    border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  }

  75% {
    border-radius: 45% 55% 37% 63% / 56% 36% 54% 44%;
  }

  100% {
    border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  }
}

@keyframes shake01 {
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

@keyframes shake02 {
  0% {
    transform: translateY(-45px);
  }

  50% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-45px);
  }
}

@media (max-width: 1200px) {
  .position-advantage02-box {
    width: 180px;
    height: 180px;
  }

  .position-advantage02-img {
    width: 200px;
  }

  .position-advantage03-box {
    top: -100px;
    right: -700px;
    width: 200px;
    height: 200px;
  }

  .position-advantage03-img {
    width: 170px;
  }

  .position-advantage01-img {
    top: -12vh;
    left: 8vw;
    width: 700px;
    height: auto;
  }
}

@media (max-width: 991px) {
  .position-advantage02-box {
    width: 180px;
    height: 180px;
    left: -10px;
  }

  .position-advantage02-img {
    width: 200px;
  }

  .position-advantage03-box {
    top: 90px;
    left: -30px;
    width: 200px;
    height: 200px;
  }

  .position-advantage03-img {
    width: 170px;
  }

  .advantage-titletext {
    margin-top: 50px;
    margin-left: 80px;
    padding-left: 0px;
  }

  .advantage-title-h1 {
    font-size: 30px;
  }

  .advantage-title-h2 {
    font-size: 25px;
  }
}

@media (max-width: 880px) {
  .advantage-titletext {
    margin-left: 15px;
  }

  .advantage-title-h1 {
    font-size: 30px !important;
  }
}

@media (max-width: 768px) {
  .advantage-titletext {
    margin-left: 10px;
    padding-right: 10px;
  }

  .position-advantage01-img {
    top: -14vh;
    left: -10vw;
    width: 500px;
    height: auto;
  }

  .position-advantage03-box {
    display: none;
  }

  .position-advantage03-img {
    display: none;
  }

  .position-advantage02-box {
    display: none;
  }

  .position-advantage02-img {
    display: none;
  }

  .advantage-title-h2 {
    font-size: 20px;
  }

  .advantage-title-h1 {
    font-size: 25px !important;
  }
}
</style>