<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/products";
import MenuBtn from "./MenuBtn.vue";

const productStore = useProductStore();

const { products } = storeToRefs(productStore);

const route = useRoute();
const selectedArea = ref(route.query.area || "北"); // 默認為北
const selectedClassify = ref("季節限定"); // 預設選擇季節限定

const areas = ref({
  north: { label: "北", radius: "40% 60% 47% 53% / 48% 25% 75% 52%" },
  central: { label: "中", radius: "27% 73% 25% 75% / 46% 32% 68% 54%" },
  south: { label: "南", radius: "48% 52% 62% 38% / 32% 45% 55% 68%" },
  east: { label: "花東", radius: "35% 65% 38% 62% / 46% 64% 36% 54%" },
});

const drinkTypes = ref({
  seasonal: { label: "季節限定" },
  fruit: { label: "果粒茶系列" },
  fresh: { label: "鮮果茶系列" },
  originalTea: { label: "原味茶系列" },
  fragrantTea: { label: "香醇茶系列" },
});

// 取得所有
const getProductData = async () => {
  productStore.getProductData();
};
getProductData();

// 過濾產品根據選擇的區域;
const filteredOrders = computed(() => {
  // if (!selectedArea.value) return products.value; // 如果未選擇區域，顯示所有產品

  // 篩選出符合區域且未下架的產品
  const productData = products.value.filter(
    (product) =>
      product.product_address.includes(selectedArea.value) &&
      product.product_exhibit !== "下架"
  );
  // console.log("productData", productData);

  const productClassify = productData.filter((classify) =>
    classify.product_classify.includes(selectedClassify.value)
  );
  // console.log("productClassify", productClassify);

  return productClassify;
});

// 計算每行的產品數據，確保最後一行補滿 4 個
const groupedOrders = computed(() => {
  const itemsPerRow = 4; // 每行顯示的數量
  const rows = [];
  const productList = [...filteredOrders.value];

  for (let i = 0; i < productList.length; i += itemsPerRow) {
    rows.push(productList.slice(i, i + itemsPerRow));
  }

  // 如果最後一行不足 4 個，則補足空白
  const lastRow = rows[rows.length - 1];
  if (lastRow && lastRow.length < itemsPerRow) {
    const emptySlots = itemsPerRow - lastRow.length;
    for (let i = 0; i < emptySlots; i++) {
      lastRow.push({ id: `empty-${i}`, empty: true }); // 插入空白元素
    }
  }

  return rows;
});

// 處理區域按鈕點擊事件
const selectArea = (area) => {
  selectedArea.value = area;
  selectedClassify.value = "季節限定";
};

// 處理飲品類型按鈕點擊事件
const selectClassify = (classify) => {
  selectedClassify.value = classify;
};

// RWD
const isSmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
  const area = route.query.area;
  if (area) {
    const element = document.getElementById(area);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  updateScreenSize(); // 初始化
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="menu-menu-area">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div
          v-for="(detail, area) in areas"
          :key="area"
          class="menu-area-btn-row"
        >
          <button
            type="button"
            class="menu-area-btn-style"
            :class="{ active: selectedArea === detail.label }"
            :style="{ borderRadius: detail.radius }"
            :id="detail.label"
            @click="selectArea(detail.label)"
          >
            {{ detail.label }}
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center menu-type-btn-row-flex-wrap">
        <div
          v-for="(label, type) in drinkTypes"
          :key="type"
          class="menu-type-btn-row"
        >
          <button
            type="button"
            class="menu-type-btn-style mt-5"
            :class="{ active: selectedClassify === label.label }"
            @click="selectClassify(label.label)"
          >
            {{ label.label }}
          </button>
        </div>
      </div>

      <div
        class="container mt-5 d-flex justify-content-center"
        style="margin-bottom: 150px"
      >
        <!-- <div class="row d-flex justify-content-center">
          <div
            class="menu-product-card-row"
            v-for="(item, index) in filteredOrders"
            :key="index"
          >
            <div class="menu-product-card">
              <div class="card" style="width: 25rem">
                <img :src="item.product_img" class="card-img-top" alt="" />
                <div>
                  <div class="menu-prodect-name-row">
                    <p class="menu-prodect-name-font">
                      {{ item.product_name }}
                    </p>
                  </div>

                  <MenuBtn :id="item.id" />
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="row d-flex justify-content-center">
          <div
            class="menu-product-card-row"
            v-for="(row, rowIndex) in groupedOrders"
            :key="rowIndex"
          >
            <div
              v-for="(item, index) in row"
              :key="index"
              class="menu-product-card"
            >
              <div class="card" style="width: 25rem" v-if="!item.empty">
                <img :src="item.product_img" class="card-img-top" alt="" />
                <div>
                  <div class="menu-prodect-name-row">
                    <p class="menu-prodect-name-font">
                      {{ item.product_name }}
                    </p>
                  </div>
                  <MenuBtn :id="item.id" />
                </div>
              </div>
              <!-- 空白卡片 -->
              <div class="empty-card" v-else></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style>
.menu-menu-area {
  /* height: 200vh; */
  margin-bottom: 60px;
}

.menu-area-btn-row {
  margin: 30px 40px;
}

.menu-area-btn-style {
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
  border: none;
}

.menu-area-btn-style:hover {
  background-color: #a59fbd;
  color: #ffffff;
  opacity: 0.8;
}

.menu-area-btn-style.active {
  background-color: #a59fbd;
  color: #ffffff;
  opacity: 0.8;
}

.menu-area-btn-style-radius01 {
  border-radius: 40% 60% 47% 53% / 48% 25% 75% 52%;
}

.menu-area-btn-style-radius02 {
  border-radius: 27% 73% 25% 75% / 46% 32% 68% 54%;
}

.menu-area-btn-style-radius03 {
  border-radius: 48% 52% 62% 38% / 32% 45% 55% 68%;
}

.menu-area-btn-style-radius04 {
  border-radius: 35% 65% 38% 62% / 46% 64% 36% 54%;
}

.menu-type-btn-row {
  display: flex;
  justify-content: center;
  /* flex-wrap: wrap; */
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 10px;
}

.menu-type-btn-style {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 60px;
  background-color: #cd853f;
  color: #ffffff;
  font-size: 30px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
}

.menu-type-btn-style:hover {
  background-color: #cd853f;
  color: #ffffff;
  opacity: 0.8;
}

.menu-type-btn-style.active {
  background-color: #a0522d;
  color: #ffffff;
  opacity: 0.8;
}

.menu-product-card-row {
  width: 320px !important;
  height: auto;
}

.card-img-top {
  width: 100%;
  height: 450px;
  object-fit: cover;
}

.menu-product-card {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.menu-prodect-name-row {
  background-color: #d19b73;
  width: 80%;
  margin-top: -10px;
  padding: 30px 15px 0px 0px;
}

.menu-prodect-name-font {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  text-align: left;
  margin-left: 10px;
}

@media (max-width: 1400px) {
  .menu-product-card-row {
    width: 280px !important;
  }

  .card-img-top {
    height: 400px;
  }
}

@media (max-width: 1200px) {
  .menu-type-btn-style {
    width: 180px;
    font-size: 30px;
  }

  .menu-product-card-row {
    width: 230px !important;
  }

  .card-img-top {
    height: 320px;
  }
}

@media (max-width: 1100px) {
  .menu-type-btn-style {
    width: 160px;
    font-size: 25px;
  }

  .menu-area-btn-style {
    width: 100px;
    height: 80px;
    font-size: 28px;
  }

  .menu-area-btn-row {
    margin: 30px 30px;
  }
}

@media (max-width: 1000px) {
  .menu-type-btn-style {
    width: 150px;
    font-size: 25px;
  }
}

@media (max-width: 990px) {
  .menu-type-btn-style {
    width: 150px;
    font-size: 23px;
  }

  .menu-type-btn-row {
    margin-left: 5px;
    margin-right: 5px;
  }

  .menu-area-btn-style {
    width: 90px;
    height: 70px;
    font-size: 26px;
  }

  .menu-area-btn-row {
    margin: 30px 20px;
  }

  .menu-product-card-row {
    margin: 2px;
  }
}

@media (max-width: 900px) {
  .menu-type-btn-style {
    width: 140px;
    font-size: 22px;
  }
}

@media (max-width: 800px) {
  .menu-type-btn-style {
    width: 130px;
    font-size: 22px;
  }
}

@media (max-width: 768px) {
  .menu-type-btn-row-flex-wrap {
    flex-wrap: wrap;
  }

  .menu-type-btn-row {
    /* flex: 0 0 50%; */
    max-width: 30%;
  }

  .menu-type-btn-style {
    width: 150px;
    font-size: 25px;
    height: auto;
  }

  .menu-product-card-row {
    width: 160px !important;
    margin: 0;
  }

  .card-img-top {
    height: 210px;
  }

  .menu-prodect-name-row {
    padding: 15px 15px 0px 0px;
  }

  .menu-prodect-name-font {
    font-size: 18px;
    font-weight: 600;
  }
}

@media (max-width: 600px) {
  .menu-type-btn-style {
    width: 130px;
    font-size: 22px;
  }

  .menu-area-btn-style {
    width: 80px;
    height: 70px;
    font-size: 24px;
  }

  .menu-area-btn-row {
    margin: 30px 15px;
  }

  .menu-product-card-row {
    width: 200px !important;
    margin: 10px;
  }

  .card-img-top {
    height: 260px;
  }
}
</style>