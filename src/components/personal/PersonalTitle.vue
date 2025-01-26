<script setup>
</script>

<template>
  <div class="container" style="display: flex">
    <div class="col-9 positionDrink00">
      <img
        src="../../assets/img/AboutTitle/aboutwater001.png"
        class="positionWater01-menu"
        alt=""
      />

      <img
        src="../../assets/img/menuTitle/menu02.png"
        class="positionDrink01-menu01"
        alt=""
      />
      <img
        src="../../assets/img/menuTitle/menu01.png"
        class="positionDrink02-menu01"
        alt=""
      />
    </div>
    <div class="col-3 personal-title-position">
      <img
        src="../../assets/img/AboutTitle/aboutwater002.png"
        class="positionWater02-menu"
        alt=""
      />
      <div class="personal-title-text">
        <h2 class="personal-title-h2">Personal Information</h2>
        <h1 class="personal-title-h1">個人資料</h1>
      </div>
    </div>
  </div>
</template>

<style>
.positionDrink00 {
  position: relative;
}

.positionDrink01-menu01 {
  position: absolute;
  top: 0px;
  left: 0;
  width: 550px;
  height: auto;
  transform: rotate(-10deg);
}

.positionDrink02-menu01 {
  position: absolute;
  top: 60px;
  left: 280px;
  width: 650px;
  height: auto;
  transform: rotate(10deg);
  z-index: 0;
}

.positionWater01-menu {
  position: absolute;
  opacity: 0.6;
  top: 400px;
  left: -200px;
}

.positionWater02-menu {
  position: absolute;
  top: 400px;
  left: 900px;
  opacity: 0.5;
  transform: rotate(80deg);
}

.personal-title-position {
  margin-top: 300px;
}

.personal-title-h1 {
  font-size: 35px;
}

@media (max-width: 1400px) {
  .personal-title-position {
    margin-top: 100px;
  }

  .positionDrink01-menu01 {
    width: 500px;
  }

  .positionDrink02-menu01 {
    width: 600px;
    left: 250px;
  }

  .positionWater02-menu {
    top: 350px;
    left: 800px;
  }
}

@media (max-width: 1200px) {
  .positionDrink01-menu01 {
    width: 400px;
    left: 50px;
  }

  .positionDrink02-menu01 {
    width: 500px;
    left: 200px;
  }

  .positionWater01-menu {
    top: 160px;
  }

  .positionWater02-menu {
    top: 160px;
    left: 550px;
  }

  .personal-title-position {
    padding: 0;
  }
}

@media (max-width: 990px) {
  .positionDrink01-menu01 {
    left: -50px;
  }

  .positionDrink02-menu01 {
    left: 100px;
  }

  .personal-title-position {
    margin-top: 0;
  }

  .positionWater02-menu {
    left: 500px;
  }
}

@media (max-width: 768px) {
  .positionDrink01-menu01 {
    width: 250px;
    left: 50px;
  }

  .positionDrink02-menu01 {
    width: 300px;
    left: 180px;
    top: 40px;
  }

  .positionWater01-menu {
    top: 60px;
    width: 500px;
    left: -200px;
  }

  .positionWater02-menu {
    top: 0px;
    width: 500px;
    left: 200px;
  }

  .personal-title-h1 {
    font-size: 30px;
  }
}

@media (max-width: 767px) {
  .positionDrink01-menu01 {
    width: 250px;
    left: -70px;
  }

  .positionDrink02-menu01 {
    width: 300px;
    left: 60px;
    top: 40px;
  }

  .positionWater02-menu {
    top: 50px;
    width: 400px;
    left: 180px;
  }

  .personal-title-h1 {
    font-size: 30px;
  }
}

@media (max-width: 550px) {
  .personal-title-h1 {
    font-size: 28px;
  }

  .positionDrink02-menu01 {
    width: 300px;
    left: 50px;
    top: 40px;
  }
}
</style>