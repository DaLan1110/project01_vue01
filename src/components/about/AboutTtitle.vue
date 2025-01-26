<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 視窗 1200px
const isSmallScreen = ref(window.innerWidth < 1400);
// 視窗 768px
const isVerySmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1400;
  isVerySmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="container" style="display: flex">
    <div class="col-9 positionDrink00">
      <img
        src="../../assets/img/AboutTitle/aboutwater001.png"
        class="positionWater01-about01"
        alt=""
      />

      <img
        src="../../assets/img/AboutTitle/aboutdrink002.png"
        class="positionDrink01-about"
        alt=""
      />
      <img
        src="../../assets/img/AboutTitle/aboutdrink003.png"
        class="positionDrink02-about"
        alt=""
      />
    </div>
    <div class="col-3 about-title-position">
      <img
        src="../../assets/img/AboutTitle/aboutwater002.png"
        class="positionWater02-about01"
        alt=""
      />
      <div class="about-title-text">
        <h2 class="about-title-h2">Summer Story</h2>
        <h1 class="about-title-h1">夏季の故事</h1>
      </div>
    </div>
  </div>
</template>

<style>
.positionDrink00 {
  position: relative;
}

.positionDrink01-about {
  position: absolute;
  top: 55px;
  left: 0;
  width: 650px;
  height: auto;
  transform: rotate(-10deg);
}

.positionDrink02-about {
  position: absolute;
  top: 60px;
  left: 450px;
  width: 550px;
  height: auto;
  transform: rotate(10deg);
  z-index: 0;
}

.positionWater01-about01 {
  position: absolute;
  opacity: 0.6;
  top: 400px;
  left: -200px;
}

.positionWater02-about01 {
  position: absolute;
  top: 400px;
  left: 1000px;
  opacity: 0.5;
  transform: rotate(80deg);
}

.about-title-position {
  margin-top: 300px;
}

.about-title-h1 {
  font-size: 35px;
}

@media (max-width: 1400px) {
  .about-title-position {
    margin-top: 50px;
  }

  .positionDrink01-about {
    width: 600px;
  }

  .positionDrink02-about {
    width: 500px;
  }

  .positionWater02-about01 {
    top: 350px;
    left: 800px;
  }
}

@media (max-width: 1200px) {
  .positionDrink01-about {
    width: 400px;
    left: 90px;
  }

  .positionDrink02-about {
    width: 350px;
    left: 350px;
  }

  .positionWater01-about01 {
    top: 160px;
  }

  .positionWater02-about01 {
    top: 160px;
    left: 550px;
  }
}

@media (max-width: 990px) {
  .positionDrink01-about {
    left: -10px;
  }

  .positionDrink02-about {
    left: 220px;
  }

  .positionWater02-about01 {
    left: 450px;
  }
}

@media (max-width: 768px) {
  .about-title-position {
    margin-top: 0px;
  }

  .about-title-h1 {
    font-size: 26px;
  }

  .about-title-h2 {
    font-size: 18px;
  }

  .positionDrink01-about {
    width: 280px;
    top: 0px;
    left: -30px;
  }

  .positionDrink02-about {
    width: 250px;
    top: 0px;
    left: 140px;
  }

  .positionWater02-about01 {
    left: 190px;
    top: 20px;
  }
}

@media (max-width: 560px) {
  .about-title-h1 {
    font-size: 23px;
  }

  .about-title-h2 {
    font-size: 17px;
  }
}
</style>