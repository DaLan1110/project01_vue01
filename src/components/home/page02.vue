<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const imageStyle1 = ref({});
const imageStyle2 = ref({});

const handleMouseMove = (event) => {
  const x = (event.clientX / window.innerWidth) * 30 - 5; // 計算水平移動量
  const y = (event.clientY / window.innerHeight) * 40 - 5; // 計算垂直移動量

  // 第一張圖片隨滑鼠移動
  imageStyle1.value = {
    transform: `translate(${x}px, ${y}px)`,
  };

  // 第二張圖片反方向移動
  imageStyle2.value = {
    transform: `translate(${-x}px, ${-y}px)`,
  };
};

window.addEventListener("mousemove", handleMouseMove);

const isSmallScreen = ref(window.innerWidth < 990);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 990;
};

onMounted(() => {
  updateScreenSize(); // 初始化
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="articleLength-diverseProdeucts">
    <div class="container">
      <div class="row titleRow">
        <h2 :class="[isSmallScreen ? '' : 'mt-5']" style="color: #5b5b5b">
          Diverse Products
        </h2>
        <h1
          class="diverseProdeuctsTitle"
          style="font-size: 50px; color: #5b5b5b"
        >
          多元產品
        </h1>
      </div>

      <div class="row mt-5 pt-5">
        <div class="col-6 diverse-position-image001">
          <p class="diverse-position-text01">沁涼飲料</p>
          <p class="diverse-position-text02">Refreshing Drink</p>
          <div class="row" style="background-color: red">
            <RouterLink to="#1" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink011.jpg"
                alt=""
                class="diverse01 diverse-position-img01 diverse-img03to680"
                :style="imageStyle1"
              />
            </RouterLink>
            <RouterLink to="#2" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink013.jpg"
                alt=""
                class="diverse01 diverse-position-img02 diverse-img04to680"
                :style="imageStyle2"
              />
            </RouterLink>
          </div>
        </div>
        <div class="col-6">
          <div class="row diverse-position-image001">
            <RouterLink to="#3" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink014.jpg"
                alt=""
                class="diverse01 diverse-position-img03 diverse-img01to768"
                :style="imageStyle2"
              />
            </RouterLink>
            <RouterLink to="#4" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink015.jpg"
                alt=""
                class="diverse01 diverse-position-img04 diverse-img02to768"
                :style="imageStyle1"
              />
            </RouterLink>
            <div class="diverse-position-text03">
              <p class="mb-0">招牌冰品</p>
              <p class="diverse-position-text04">Signature Ice</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row" :class="[isSmallScreen ? '' : 'mt-5 pt-5']">
        <div class="col-6 diverse-position-image002">
          <p class="diverse-position-text01">冬季熱飲</p>
          <p class="diverse-position-text02">Winter Hot Drink</p>
          <div class="row">
            <RouterLink to="#5" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink016.jpg"
                alt=""
                class="diverse01 diverse-position-img03 diverse-img03to680"
                :style="imageStyle1"
              />
            </RouterLink>
            <RouterLink to="#6" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink017.jpg"
                alt=""
                class="diverse01 diverse-position-img04 diverse-img04to680"
                :style="imageStyle2"
              />
            </RouterLink>
          </div>
        </div>
        <div class="col-6">
          <div class="row diverse-position-image002">
            <RouterLink to="#7" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink018.jpg"
                alt=""
                class="diverse01 diverse-position-img01 diverse-img01to768"
                :style="imageStyle2"
              />
            </RouterLink>
            <RouterLink to="#8" class="diverse-img">
              <img
                src="../../assets/img/homeWave01/drink019.jpg"
                alt=""
                class="diverse01 diverse-position-img02 diverse-img02to768"
                :style="imageStyle1"
              />
            </RouterLink>
            <div class="diverse-position-text03">
              <p class="mb-0">暖心熱湯</p>
              <p class="diverse-position-text04">Warm Heart Soup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.articleLength-diverseProdeucts {
  height: 210vh;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-top: 60px;
}

.diverseProdeuctsTitle {
  font-size: 35px;
  font-weight: 700;
  color: #9a91b8;
}

.diverse01 {
  width: 280px;
  height: 50vh;
  transition: transform 0.2s ease-out;
}

.diverse-position-image001 {
  position: relative;
}

.diverse-position-image002 {
  position: relative;
  top: 80vh;
}

.diverse-position-img01 {
  position: absolute;
  top: 9vh;
  left: 0;
}

.diverse-position-img02 {
  position: absolute;
  top: 22vh;
  left: 15vw;
}

.diverse-position-img03 {
  position: absolute;
  top: 9vh;
  left: 0vw;
}

.diverse-position-img04 {
  position: absolute;
  top: 27vh;
  left: 14vw;
}

.diverse-position-text01 {
  color: #6c6c6c;
  font-size: 30px;
  margin-bottom: 0;
  text-align: left;
  padding-left: calc(50% / 3);
}

.diverse-position-text02 {
  color: #6c6c6c;
  font-size: 16px;
  text-align: left;
  padding-left: calc(50% / 3);
}

.diverse-position-text03 {
  position: absolute;
  top: 63vh;
  color: #6c6c6c;
  font-size: 30px;
  text-align: left;
  padding-left: calc(50% / 4);
}

.diverse-position-text04 {
  margin-top: 0vh;
  color: #6c6c6c;
  font-size: 16px;
}

.diverse-img:hover {
  opacity: 0.9;
}

@media (max-width: 990px) {
  .diverse01 {
    width: 180px;
    height: 35vh;
  }

  .diverse-position-text01 {
    margin-left: -20px;
  }

  .diverse-position-text02 {
    margin-left: -20px;
  }

  .diverse-position-text03 {
    top: 45vh;
    margin-left: -20px;
  }

  .diverse-position-image002 {
    top: 65vh;
  }

  .articleLength-diverseProdeucts {
    height: 170vh;
  }
}

@media (max-width: 768px) {
  .diverse01 {
    width: 150px;
    height: 27vh;
  }

  .diverse-position-image002 {
    top: 55vh;
  }

  .diverse-img01to768 {
    left: 7vw;
  }

  .diverse-img02to768 {
    left: 20vw;
  }

  .diverse-position-text01 {
    font-size: 25px;
  }

  .diverse-position-text02 {
    font-size: 13px;
  }

  .diverse-position-text03 {
    font-size: 25px;
    margin-left: 15px;
    top: 38vh;
  }

  .diverse-position-text04 {
    font-size: 13px;
  }

  .articleLength-diverseProdeucts {
    height: 150vh;
  }
}

@media (max-width: 680px) {
  .diverse01 {
    width: 110px;
    height: 20vh;
  }

  .diverse-img02to768 {
    top: 12vh;
  }

  .diverse-position-text03 {
    font-size: 30px;
    margin-left: 0px;
    top: 37vh;
    text-align: center;
  }

  .diverse-position-text01 {
    font-size: 30px;
    text-align: center;
  }

  .diverse-position-text02 {
    text-align: center;
  }

  .diverse-img03to680 {
    top: 9vh;
    left: 3vw;
  }

  .diverse-img04to680 {
    top: 20vh;
    left: 25vw;
  }

  .diverse-position-image002 {
    top: 45vh;
  }

  .articleLength-diverseProdeucts {
    height: 130vh;
  }
}
</style>