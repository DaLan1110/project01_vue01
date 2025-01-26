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
      <h2>Branch Information</h2>
      <h1 style="font-size: 35px">分店資訊</h1>
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
  text-align: right;
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

@media (max-width: 768px) {
  .position-advantage03-box,
  .positionDrink02 {
    width: 50vw;
  }
}
</style>