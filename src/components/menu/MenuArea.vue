<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 視窗 768px
const isSmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div>
    <button
      class="btnto768"
      data-bs-target="#exampleModalToggle"
      data-bs-toggle="modal"
      v-if="isSmallScreen"
    >
      View Menu
    </button>

    <button
      class="btn box-viewmenu"
      data-bs-target="#exampleModalToggle"
      data-bs-toggle="modal"
      v-else
    >
      View Menu
    </button>

    <div
      class="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="row menu-modal-rowto991">
          <div class="modal-content menu-area-modal-content">
            <div style="display: flex; justify-content: flex-end">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="menu-modal-row">
              <div class="col-3 menu-modal-style">
                <RouterLink
                  :to="{ path: '/menu', query: { area: '北' } }"
                  class="box-area box-area-radius02"
                  >新北<br />桃園<br />新竹<br />苗栗</RouterLink
                >
              </div>
              <div class="col-3 menu-modal-style">
                <RouterLink
                  :to="{ path: '/menu', query: { area: '中' } }"
                  class="box-area box-area-radius03"
                  >南投<br />台中<br />彰化<br />雲林</RouterLink
                >
              </div>
              <div class="col-3 menu-modal-style">
                <RouterLink
                  :to="{ path: '/menu', query: { area: '南' } }"
                  class="box-area box-area-radius04"
                  >嘉義<br />台南<br />高雄<br />宜蘭</RouterLink
                >
              </div>
              <div class="col-3 menu-modal-style">
                <RouterLink
                  :to="{ path: '/menu', query: { area: '花東' } }"
                  class="box-area box-area-radius05"
                  >花蓮<br />台東<br />屏東</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.box-viewmenu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 120px;
  margin-top: 25vh;
  margin-left: 5vw;
  border-radius: 61% 39% 58% 42% / 58% 66% 34% 42% !important;
  background-color: #9a91b8 !important;
  color: #ffffff !important;
  font-size: 16px !important;
}

.box-viewmenu:hover,
.box-viewmenu:active {
  background-color: #a59fbd;
  color: #ffffff;
}

.box-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 120px;
  background-color: #9a91b8;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
}

.box-area:hover,
.box-area:active {
  background-color: #a59fbd;
  color: #ffffff;
}

.menu-area-modal-content {
  background-color: transparent !important;
  border-color: transparent !important;
}

.box-area-radius01 {
  border-radius: 70% 30% 37% 63% / 27% 67% 33% 73%;
}

.box-area-radius02 {
  border-radius: 40% 60% 47% 53% / 48% 25% 75% 52%;
}

.box-area-radius03 {
  border-radius: 27% 73% 25% 75% / 46% 32% 68% 54%;
}

.box-area-radius04 {
  border-radius: 48% 52% 62% 38% / 32% 45% 55% 68%;
}

.box-area-radius05 {
  border-radius: 35% 65% 38% 62% / 46% 64% 36% 54%;
}

.btnto768 {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #9a91b8;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-top: 30vh;
  margin-left: -18vw;

  /* 防止文字換行 */
  white-space: nowrap;

  /* 防止內容溢出 */
  overflow: hidden;
}

.menu-modal-row {
  display: flex;
  justify-content: flex-end;
}

.menu-modal-style {
  margin: 15px;
}

.menu-modal-rowto991 {
  margin-left: 200px !important;
}

@media (max-width: 1200px) {
  .menu-modal-rowto991 {
    margin-left: 120px !important;
  }
}

@media (max-width: 991px) {
  .menu-modal-rowto991 {
    margin: 60px !important;
  }

  .box-viewmenu {
    margin-left: 3vw;
  }
}

@media (max-width: 900px) {
  .menu-modal-rowto991 {
    margin-left: 100px !important;
  }
}

@media (max-width: 810px) {
  .menu-modal-rowto991 {
    margin-left: 110px !important;
    /* margin: 60px !important; */
  }

  .box-area {
    width: 120px;
    height: 120px;
    font-size: 14px;
  }

  .box-viewmenu {
    margin-left: 0vw;
  }
}

@media (max-width: 790px) {
  .menu-modal-rowto991 {
    margin-left: 80px !important;
    /* margin: 60px !important; */
  }
}

@media (max-width: 768px) {
  .menu-modal-rowto991 {
    margin-left: 90px !important;
  }

  .box-area {
    width: 100px;
    height: 100px;
    font-size: 15px;
  }

  .menu-modal-style {
    margin: 10px;
  }
}

@media (max-width: 610px) {
  .menu-modal-style {
    margin: 5px;
  }
}

@media (max-width: 575px) {
  .menu-modal-rowto991 {
    margin-left: 0px !important;
    margin: 50px !important;
  }
}

@media (max-width: 500px) {
  .menu-modal-rowto991 {
    margin: 25px !important;
  }
}
</style>