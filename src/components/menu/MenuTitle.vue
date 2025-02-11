<script setup>
</script>

<template>
  <div class="container" style="display: flex">
    <div class="col-6 position-branch00">
      <img
        src="../../assets/img/homeWave01/drink010.png"
        alt=""
        class="branch-title-img"
      />
      <div class="water-drop-branch water-drop-branch-img01"></div>
      <div class="water-drop-branch water-drop-branch-img02"></div>
      <div class="water-drop-branch water-drop-branch-img03"></div>
    </div>
    <div class="col-6 branch-titletext">
      <h2 class="menu-title-h2">Summer Menu</h2>
      <h1 class="menu-title-h1">夏季菜單</h1>
    </div>
  </div>
</template>

<style>
.position-branch00 {
  position: relative;
}

.branch-titletext {
  margin-top: 300px;
  padding-left: 15vw;
  text-align: center;
}

.branch-title-img {
  position: absolute;
  width: 60vh;
  left: 20vw;
  top: 10vh;
}

.water-drop-branch {
  border-radius: 50%;
  box-shadow: inset -8px -8px 20px rgba(255, 255, 255, 0.5),
    inset 8px 8px 20px rgba(0, 0, 255, 0.2), 0 10px 15px rgba(0, 0, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.water-drop-branch::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  border-radius: 50%;
  opacity: 0.7;
  transform: translate(-20%, -20%);
}

.water-drop-branch::after {
  content: "";
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 30%;
  height: 30%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
  border-radius: 50%;
  opacity: 0.8;
}

.water-drop-branch-img01 {
  width: 300px;
  height: 300px;
  background: url("../../assets/img/homeWave01/drink007.jpg") center/cover,
    /* 背景图案，居中并覆盖整个水珠 */
      radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.8),
        rgba(173, 216, 230, 0.5)
      );
  /* 水珠的透明效果 */
  position: absolute;
  top: 5vh;
  left: 0vw;
  animation: water-drop-branch-shake01 10s infinite linear;
}

.water-drop-branch-img02 {
  width: 200px;
  height: 200px;
  background: url("../../assets/img/homeWave01/drink002.jpg") center/cover,
    /* 背景图案，居中并覆盖整个水珠 */
      radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.8),
        rgba(173, 216, 230, 0.5)
      );
  /* 水珠的透明效果 */
  position: absolute;
  top: 50vh;
  left: 55vw;
  animation: water-drop-branch-shake01 4s infinite linear;
}

.menu-title-h1 {
  font-size: 35px;
  white-space: nowrap;
}

.menu-title-h2 {
  white-space: nowrap;
}

@keyframes water-drop-branch-shake01 {
  0% {
    transform: translateY(-45px) rotate(0deg); /* 上移和不旋轉 */
  }

  25% {
    transform: translateY(-22.5px) rotate(-5deg); /* 中間位置並向左旋轉 */
  }

  50% {
    transform: translateY(0px) rotate(0deg); /* 回到初始位置 */
  }

  75% {
    transform: translateY(-22.5px) rotate(5deg); /* 中間位置並向右旋轉 */
  }

  100% {
    transform: translateY(-45px) rotate(0deg); /* 回到初始位置並不旋轉 */
  }
}

@media (max-width: 1400px) {
  .water-drop-branch-img02 {
    left: 800px;
  }
}

@media (max-width: 1200px) {
  .water-drop-branch-img01 {
    width: 200px;
    height: 200px;
  }

  .water-drop-branch-img02 {
    width: 150px;
    height: 150px;
    top: 110px;
    left: 700px;
  }

  .branch-title-img {
    position: absolute;
    width: 45vh;
  }
}

@media (max-width: 990px) {
  .water-drop-branch-img01 {
    left: -20px;
  }

  .water-drop-branch-img02 {
    left: 600px;
  }

  .branch-title-img {
    width: 45vh;
  }

  .branch-titletext {
    margin-left: 100px;
  }
}

@media (max-width: 900px) {
  .branch-titletext {
    margin-left: 60px;
  }
}

@media (max-width: 810px) {
  .water-drop-branch-img02 {
    left: 570px;
  }
}

@media (max-width: 768px) {
  .branch-titletext {
    margin-top: 0px;
    padding: 20px;
    text-align: right;
  }

  .water-drop-branch-img01 {
    width: 100px;
    height: 100px;
  }

  .water-drop-branch-img02 {
    width: 100px;
    height: 100px;
    top: 150px;
    left: 400px;
  }

  .branch-title-img {
    width: 30vh;
    left: 90px;
    top: 0;
  }

  .menu-title-h2 {
    font-size: 18px;
  }

  .menu-title-h1 {
    font-size: 30px;
  }
}

@media (max-width: 670px) {
  .branch-title-img {
    left: 75px;
    width: 27vh;
  }

  .branch-titletext {
    margin-left: 20px;
  }

  .water-drop-branch-img02 {
    left: 350px;
  }
}

@media (max-width: 500px) {
  .branch-titletext {
    z-index: 500;
  }

  .branch-title-img {
    left: 60px;
    width: 20vh;
  }
}
</style>