<script setup>
import MenuArea from "../menu/MenuArea.vue";
</script>

<template>
  <div class="menu">
    <div class="container" style="display: flex; justify-content: center">
      <div class="col-6 home-wave01-img-row">
        <img
          src="../../assets/img/homeTitle/sun.png"
          class="home-wave01-img"
          alt=""
        />
      </div>
      <div class="col-6" style="display: flex">
        <div class="menu-title-row">
          <h2 class="mb-3" style="color: #5b5b5b">Full Menu</h2>
          <h2 class="menu-title">全品菜單</h2>
        </div>
        <MenuArea class="menu-title-btn" />
      </div>
    </div>
  </div>
</template>

<style>
.menu {
  height: 50vh;
  width: 100vw;
  margin-top: 50px;
  padding: 0;
}

/* 確保 title-row 使用 flexbox 佈局 */
.menu-title-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 內容靠左 */
  margin-top: 100px;
}

.menu-title {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
  width: 200px;
}

@media (max-width: 991px) {
  .menu {
    height: 45vh;
  }

  .home-wave01-img {
    margin-left: -40px;
    width: 400px;
  }
}

@media (max-width: 768px) {
  .menu {
    height: 35vh;
  }

  .home-wave01-img {
    margin-left: -130px;
    margin-top: -10px;
    width: 300px;
  }

  .menu-title-row {
    margin-top: 30px;
  }

  .menu-title-btn {
    margin-top: -100px;
    margin-left: -50px;
  }

  @media (max-width: 500px) {
    .home-wave01-img {
      margin-left: -45px;
    }
  }
}
</style>
