<script setup>
import BranchAddress from './Address.vue';
</script>

<template>
  <div class="branch-address">
    <div class="container">
      <div style="display: flex; justify-content: center">
        <div class="col-1" style="margin-right: 50px">
          <RouterLink to="#1" class="branch-btn-style branch-btn-style-radius01"
            >全部</RouterLink
          >
        </div>
        <div class="col-1" style="margin-right: 50px">
          <RouterLink to="#2" class="branch-btn-style branch-btn-style-radius02"
            >北</RouterLink
          >
        </div>
        <div class="col-1" style="margin-right: 50px">
          <RouterLink to="#3" class="branch-btn-style branch-btn-style-radius03"
            >中</RouterLink
          >
        </div>
        <div class="col-1" style="margin-right: 50px">
          <RouterLink to="#4" class="branch-btn-style branch-btn-style-radius04"
            >南</RouterLink
          >
        </div>
        <div class="col-1" style="margin-right: 50px">
          <RouterLink to="#5" class="branch-btn-style branch-btn-style-radius05"
            >花東</RouterLink
          >
        </div>
        <div class="col-1" style="margin-right: 50px">
          <RouterLink to="#6" class="branch-btn-style branch-btn-style-radius06"
            >搜尋</RouterLink
          >
        </div>
      </div>
      <BranchAddress style="margin-top: 12vh"/>
    </div>
  </div>
</template>

<style>
.branch-address {
  height: 100vh;
}

.branch-btn-style {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100px;
  background-color: #9a91b8;
  color: #ffffff;
  font-size: 30px;
  font-weight: 600;
  text-decoration: none;
}

.branch-btn-style:hover,
.branch-btn-style:active {
  background-color: #a59fbd;
  color: #ffffff;
}

.branch-btn-style-radius01 {
  border-radius: 70% 30% 37% 63% / 27% 67% 33% 73%;
}

.branch-btn-style-radius02 {
  border-radius: 40% 60% 47% 53% / 48% 25% 75% 52%;
}

.branch-btn-style-radius03 {
  border-radius: 27% 73% 25% 75% / 46% 32% 68% 54%;
}

.branch-btn-style-radius04 {
  border-radius: 48% 52% 62% 38% / 32% 45% 55% 68%;
}

.branch-btn-style-radius05 {
  border-radius: 35% 65% 38% 62% / 46% 64% 36% 54%;
}

.branch-btn-style-radius06 {
  border-radius: 62% 38% 25% 43% / 30% 40% 25% 60%;
}
</style>