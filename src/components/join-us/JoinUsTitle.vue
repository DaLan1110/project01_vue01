<script setup>
</script>

<template>
  <div class="container" style="display: flex">
    <div class="col-6 position-joinUs00">
      <img
        src="../../assets/img/joinTitle/joinUs001.png"
        class="position-joinUs01-img"
        alt=""
      />
      <img
        src="../../assets/img/joinTitle/joinUs002.png"
        class="position-joinUs01-2-img"
        alt=""
      />
      <div class="position-joinUs02-box">
        <img
          src="../../assets/img/joinTitle/joinUs003.png"
          class="position-joinUs02-img"
          alt=""
        />
      </div>
      <div class="position-joinUs03-box">
        <img
          src="../../assets/img/joinTitle/joinUs004.png"
          class="position-joinUs03-img"
          alt=""
        />
      </div>
    </div>
    <div class="col-6 joinUs-titletext">
      <h2 class="advantage-title-h2">Join Us</h2>
      <h1 class="advantage-title-h1">加入我們</h1>
      <!-- <h3></h3> -->
    </div>
  </div>
</template>

<style>
.position-joinUs00 {
  position: relative;
}

.position-joinUs01-img {
  position: absolute;
  top: -14vh;
  /* left: 20vw; */
  left: 385px;
  width: 650px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.position-joinUs01-2-img {
  position: absolute;
  top: -12vh;
  /* left: 4vw; */
  left: 75px;
  width: 700px; /* 增加宽度为原来的 150% */
  height: auto; /* 自动调整高度以保持宽高比 */
}

.position-joinUs02-img {
  position: absolute;
  width: 160px;
  height: auto;
}

.position-joinUs03-img {
  position: absolute;
  width: 300px;
  height: auto;
  margin-top: -50px;
}

.position-joinUs02-box {
  width: 220px;
  height: 220px;
  background-color: #b9b973;
  transition: border-radius 3s linear;
  border-radius: 60% 40% 50% 50% / 35% 45% 55% 65%;
  position: relative;
  animation: img-circle01 10s infinite, shake01 8s infinite linear;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5vh;
}

.position-joinUs03-box {
  width: 300px;
  height: 300px;
  background-color: #ffa042;
  transition: border-radius 3s linear;
  border-radius: 59% 41% 68% 32% / 48% 52% 48% 62%;
  position: relative;
  animation: img-circle02 8s infinite, shake02 8s infinite linear;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 18vh;
  left: 1200px;
}

.joinUs-titletext {
  margin-top: 200px;
  margin-left: 150px;
  text-align: center;
}

.advantage-title-h1 {
  font-size: 35px;
  white-space: nowrap;
}

.advantage-title-h2 {
  white-space: nowrap;
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

@media (max-width: 1800px) {
  .position-joinUs03-box {
    left: 1100px;
  }
}

@media (max-width: 1600px) {
  .position-joinUs03-box {
    left: 1050px;
  }

  .position-joinUs03-img {
    width: 250px;
  }

  .position-joinUs03-box {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 1400px) {
  .joinUs-titletext {
    margin-top: 150px;
  }

  .position-joinUs01-img {
    left: 270px;
    top: -11vh;
  }

  .position-joinUs01-2-img {
    left: -40px;
    top: -9vh;
  }

  .position-joinUs02-box {
    width: 180px;
    height: 180px;
    top: 5vh;
  }

  .position-joinUs02-img {
    width: 120px;
  }

  .position-joinUs03-box {
    left: 950px;
    width: 220px;
    height: 220px;
  }

  .position-joinUs03-img {
    width: 220px;
  }
}

@media (max-width: 1300px) {
  .position-joinUs03-box {
    left: 900px;
  }
}

@media (max-width: 1200px) {
  .joinUs-titletext {
    margin-top: 100px;
  }

  .position-joinUs03-box {
    left: 800px;
    width: 180px;
    height: 180px;
    top: 10vh;
  }

  .position-joinUs03-img {
    width: 160px;
  }

  .position-joinUs01-img {
    left: 270px;
    top: -11vh;
    width: 500px;
  }

  .position-joinUs01-2-img {
    left: 58px;
    top: -5vh;
    width: 500px;
  }

  .position-joinUs02-box {
    left: 20px;
  }
}

@media (max-width: 1100px) {
  .joinUs-titletext {
    margin-left: 90px;
  }

  .position-joinUs03-box {
    left: 750px;
  }
}

@media (max-width: 991px) {
  .position-joinUs01-img {
    left: 100px;
    top: -11vh;
    width: 500px;
  }

  .position-joinUs01-2-img {
    left: -110px;
    top: -5vh;
    width: 500px;
  }

  .joinUs-titletext {
    margin-left: 110px;
  }

  .position-joinUs03-box {
    left: 600px;
    top: 13vh;
  }

  .position-joinUs02-box {
    left: -40px;
    width: 130px;
    height: 130px;
    top: 5vh;
  }

  .position-joinUs02-img {
    width: 90px;
  }
}

@media (max-width: 890px) {
  .joinUs-titletext {
    margin-left: 100px;
  }

  .position-joinUs03-box {
    left: 560px;
    top: 13vh;
  }
}

@media (max-width: 810px) {
  .joinUs-titletext {
    margin-left: 80px;
  }

  .position-joinUs02-box {
    left: -10px;
  }

  .position-joinUs03-box {
    left: 580px;
    width: 130px;
    height: 130px;
    top: 14vh;
  }

  .position-joinUs03-img {
    width: 110px;
    margin-top: -30px;
  }
}

@media (max-width: 768px) {
  .advantage-title-h2 {
    font-size: 20px;
  }

  .advantage-title-h1 {
    font-size: 25px;
  }

  .position-joinUs01-img {
    left: 130px;
    top: -8vh;
    width: 300px;
  }

  .position-joinUs01-2-img {
    left: -10px;
    top: -7vh;
    width: 320px;
  }

  .position-joinUs03-box {
    display: none;
  }

  .position-joinUs03-img {
    display: none;
  }

  .position-joinUs02-box {
    display: none;
  }

  .position-joinUs02-img {
    display: none;
  }
}

@media (max-width: 600px) {
  .joinUs-titletext {
    margin-left: 60px;
  }

  .position-joinUs01-img {
    left: 110px;
    top: -8vh;
    width: 300px;
  }

  .position-joinUs01-2-img {
    left: -30px;
    top: -7vh;
    width: 320px;
  }
}

@media (max-width: 420px) {
  .joinUs-titletext{
    margin-left: 50px;
  }

  .position-joinUs01-img {
    left: 50px;
    top: -8vh;
  }

  .position-joinUs01-2-img {
    left: -30px;
    top: -7vh;
  }
}
</style>