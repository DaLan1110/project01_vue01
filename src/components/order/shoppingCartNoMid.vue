<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import orderImg from "./orderImg.vue";
import PaginationOrderList from "../Pagination.vue";

const route = useRoute();

const img_path = "https://project01-back-end.onrender.com/img/product/";
const tempCart = ref([]);

// 分頁
const paginatedMembers = ref({});
const itemsPerPage = ref(4);
const currentPage = ref("");
const totalPages = ref("");
const getPaginatedMembers = (data) => {
  paginatedMembers.value = data;
};
const getCurrentPage = (data) => {
  currentPage.value = data;
};
const getTotalPages = (data) => {
  totalPages.value = data;
};

// 移除商品
const removeItem = (index) => {
  // 從 tempCart 陣列中移除對應的商品
  tempCart.value.splice(index, 1);

  // 更新 localStorage
  localStorage.setItem("temp_cart", JSON.stringify(tempCart.value));

  tempCart.value = [...tempCart.value];

  alert("已取消商品");
};

// 更新 LocalStorage
const updateLocalStorage = () => {
  localStorage.setItem("temp_cart", JSON.stringify(tempCart.value));
  tempCart.value = [...tempCart.value]; // 確保重新渲染畫面
  console.log(tempCart.value);
};

// 增加數量
const increaseQuantity = (index) => {
  tempCart.value[index].shop_quantity = String(
    Number(tempCart.value[index].shop_quantity) + 1
  ); // 更新為字串
  tempCart.value[index].shop_total = String(
    Number(tempCart.value[index].shop_quantity) *
      Number(tempCart.value[index].shop_price)
  ); // 更新總價為字串
  updateLocalStorage();
};

// 減少數量
const decreaseQuantity = (index) => {
  if (Number(tempCart.value[index].shop_quantity) > 1) {
    tempCart.value[index].shop_quantity = String(
      Number(tempCart.value[index].shop_quantity) - 1
    ); // 更新為字串
    tempCart.value[index].shop_total = String(
      Number(tempCart.value[index].shop_quantity) *
        Number(tempCart.value[index].shop_price)
    ); // 更新總價為字串
    updateLocalStorage();
  }
};

// 計算總金額
const totalAmount = computed(() =>
  tempCart.value.reduce(
    (total, item) => total + Number(item.shop_total || 0),
    0
  )
);

// 送出訂單
const selectedOrderPay = ref(""); // 保存選擇的付款方式

const submitOrder = () => {
  if (!selectedOrderPay.value) {
    // 如果沒有選擇付款方式
    alert("未選擇付款方式");
    return;
  }
  alert("尚未登入會員, 請登入會員");
};

// RWD
const isSmallScreen = ref(window.innerWidth < 768);

const isMediumScreen = ref(window.innerWidth < 990);

const allowScreenStyle = ref(true);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
  isMediumScreen.value = window.innerWidth < 990;
};

onMounted(() => {
  // 初始化資料
  tempCart.value = JSON.parse(localStorage.getItem("temp_cart")) || [];
  // 如果它是物件，將它轉換為陣列
  // if (typeof tempCart.value === "object" && !Array.isArray(tempCart.value)) {
  //   tempCart.value = Object.values(tempCart.value);
  // }

  console.log(Array.isArray(tempCart.value)); // 應該返回 true
  console.log("tempCart 初始化內容：", tempCart.value);
  console.log(tempCart.value);

  // RWD
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  // const modalElement = document.getElementById("exampleModal");
  // modalElement.removeEventListener("hidden.bs.modal", closeModal);
  // RWD
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="orderDataByOrderId">
    <div class="pb-5 text-center mt-5">
      <h2 style="color: #5b5b5b">Shopping Cart</h2>
      <h1 class="join-usTitle">購物車</h1>
    </div>
    <div :class="[isMediumScreen ? 'container-fluid' : 'container']">
      <div class="card">
        <div
          class="card-body d-flex flex-column align-items-center"
          style="padding: 30px"
        >
          <table
            class="table table-bordered shoppingCartNoMid-table"
            style="font-size: 12px"
            v-if="tempCart.length > 0 && !isSmallScreen"
          >
            <thead>
              <tr>
                <th width="5%" class="text-center">編號</th>
                <th width="14%" class="text-center">預覽圖</th>
                <th width="10%" class="text-center">產品名稱</th>
                <th width="10%" class="text-center">產品總價</th>
                <th width="10%" class="text-center">甜度</th>
                <th width="10%" class="text-center">溫度</th>
                <th width="20%" class="text-center">加料選擇</th>
                <th width="10%" class="text-center">產品數量</th>
                <th width="6%" class="text-center">刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in paginatedMembers"
                :key="index"
                style="height: 40px"
              >
                <td class="text-center align-middle">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="text-center align-middle">
                  <orderImg :img_path="img_path" :img_avatar="item.shop_img" />
                </td>
                <td class="text-center align-middle">{{ item.shop_name }}</td>
                <td class="text-center align-middle">{{ item.shop_total }}</td>
                <td class="text-center align-middle">
                  {{ item.shop_sweetness }}
                </td>
                <td class="text-center align-middle">{{ item.shop_ice }}</td>
                <td class="text-center align-middle">{{ item.shop_add }}</td>

                <td class="text-center align-middle">
                  <div class="quantity-control">
                    <!-- 減少數量 -->
                    <button
                      class="btn-style-di"
                      @click="decreaseQuantity(index)"
                    >
                      -
                    </button>

                    <!-- 顯示數量 -->
                    <span class="quantity-style">{{ item.shop_quantity }}</span>

                    <!-- 增加數量 -->
                    <button
                      class="btn-style-di"
                      @click="increaseQuantity(index)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="text-center align-middle">
                  <div class="btn-style return-btn" @click="removeItem(index)">
                    刪除
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 卡片呈現方式 -->
          <div
            class="card-list-shoppingCart col-12"
            v-else-if="tempCart.length > 0 && isSmallScreen"
          >
            <div
              class="shoppingCart-cardto910"
              v-for="(item, index) in paginatedMembers"
              :key="index"
            >
              <p class="card-list-item-shoppingCart">
                <strong>產品名稱:</strong>{{ item.shop_name }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>產品總價:</strong>{{ item.shop_total }}
              </p>
              <orderImg
                :img_path="img_path"
                :img_avatar="item.shop_img"
                class="shoppingCart-img-768"
              />
              <p class="card-list-item-shoppingCart">
                <strong>甜度:</strong>{{ item.shop_sweetness }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>冰塊:</strong>{{ item.shop_ice }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>加料選擇:</strong>{{ item.shop_add }}
              </p>
              <div class="card-list-item-shoppingCart card-list-item-div">
                <strong>產品數量:</strong>
                <div class="quantity-control">
                  <!-- 減少數量 -->
                  <button class="btn-style-di" @click="decreaseQuantity(index)">
                    -
                  </button>

                  <!-- 顯示數量 -->
                  <span class="quantity-style">{{ item.shop_quantity }}</span>

                  <!-- 增加數量 -->
                  <button class="btn-style-di" @click="increaseQuantity(index)">
                    +
                  </button>
                </div>
              </div>
              <div class="card-list-item-shoppingCart card-list-item-div">
                <strong>刪除:</strong>
                <div class="btn-style return-btn" @click="removeItem(index)">
                  刪除
                </div>
              </div>
            </div>
          </div>

          <table class="table table-bordered" style="font-size: 12px" v-else>
            <thead>
              <tr>
                <th width="5%" class="text-center">編號</th>
                <th width="14%" class="text-center">預覽圖</th>
                <th width="10%" class="text-center">產品名稱</th>
                <th width="10%" class="text-center">產品總價</th>
                <th width="10%" class="text-center">甜度</th>
                <th width="10%" class="text-center">溫度</th>
                <th width="20%" class="text-center">加料選擇</th>
                <th width="10%" class="text-center">產品數量</th>
                <th width="6%" class="text-center">刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="9" class="text-center">無任何商品</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="d-flex justify-content-between"
          style="padding: 30px; margin-top: -50px; padding-bottom: 10px"
        >
          <div class="form-floating">
            <select
              class="form-select shoppingCart-selectedOrderPay-style"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="selectedOrderPay"
            >
              <option selected disabled value="">請選擇</option>
              <option value="現金支付">現金支付</option>
              <option value="信用卡付款">信用卡付款</option>
            </select>
            <label for="floatingSelect" style="font-size: 13px"
              >請選擇付款方式</label
            >
          </div>
          <h3 class="shoppingCart-totalAmount-style">
            總金額: NT ${{ totalAmount }} 元
          </h3>
        </div>

        <div class="shoppingCart-pagination-style">
          <!-- 分頁控制 -->
          <PaginationOrderList
            :dataPage="tempCart"
            :itemsPerPage="itemsPerPage"
            @paginatedMembers="getPaginatedMembers"
            @currentPage="getCurrentPage"
            @totalPages="getTotalPages"
          />
        </div>

        <div class="d-flex justify-content-center" style="padding: 30px">
          <button class="btn-style save-btn" @click="submitOrder">
            送出訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.orderDataByOrderId {
  padding-bottom: 150px;
}

.btn-style {
  border-radius: 4px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.save-btn {
  border: 1px solid #5b5b5b;
  color: #3c3c3c;
  background-color: #ffffff;
}

.save-btn:hover {
  border: 1px solid #5b5b5b;
  color: #ffffff;
  background-color: #5b5b5b;
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.return-btn {
  border: none;
  color: #ffffff;
  background-color: #e6367e;
}

.return-btn:hover {
  opacity: 0.8;
}

.input-error-style {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 0;
  list-style: none;
  font-size: 14px;
  color: #e6367e;
  margin: 0;
  margin-left: 5px;
  text-align: left;
}

.input-error-style li {
  animation: swipeDown 0.3s ease forwards;
}

.quantity-control {
  display: inline-flex; /* 改為 inline-flex 讓內容居中且不超出 td */
  justify-content: center;
  align-items: center;
  border: 1px solid black; /* 外框整體黑色 */
  width: max-content; /* 根據內容調整寬度 */
}

.btn-style-di {
  width: 20px; /* 每個框的寬度 */
  height: 30px; /* 每個框的高度 */
  font-size: 16px; /* 文字大小 */
  color: black; /* 文字顏色 */
  background-color: white; /* 白底 */
  border: none; /* 移除個別邊框，統一使用父容器的邊框 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity-style {
  width: 60px; /* 每個框的寬度 */
  height: 30px; /* 每個框的高度 */
  font-size: 16px; /* 文字大小 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid black; /* 左邊框 */
  border-right: 1px solid black; /* 右邊框 */
}

.card-list-shoppingCart {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
}

.card-list-item-shoppingCart {
  border: 1px solid #f9f9f9; /* 邊框顏色和樣式 */
  padding: 10px; /* 內邊距 */
  margin-bottom: 10px; /* 每個 p 元素之間的間距 */
  background-color: #fff; /* 可選，背景顏色 */

  display: flex;
  align-items: center; /* 垂直居中對齊內容 */
  gap: 10px; /* 在職位標籤和選擇框之間添加間隔 */
}

.shoppingCart-cardto910 {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.shoppingCart-cardto910 p {
  margin: 0.5rem 0;
  padding-bottom: 10px; /* 增加底部內邊距 */
  border-bottom: 1px solid #ddd; /* 為每個 p 元素添加底部邊框 */
}

.shoppingCart-cardto910 .card-list-item-div {
  margin: 0.5rem 0;
  padding-bottom: 10px; /* 增加底部內邊距 */
  border-bottom: 1px solid #ddd; /* 為每個 p 元素添加底部邊框 */
}

.shoppingCart-cardto910 p:last-child {
  border-bottom: none; /* 最後一個 p 元素去掉底部邊框 */
}

.shoppingCart-img-768 {
  position: absolute;
  top: 22px; /* 根據需求調整圖片的垂直位置 */
  right: 20px; /* 將圖片固定在右側 */
  object-fit: cover; /* 確保圖片比例 */
  border-radius: 4px;

  display: inline-block;
  background: white;
  padding: 3px;
  z-index: 1;
}

.shoppingCart-selectedOrderPay-style {
  width: 250px !important;
  height: 30px !important;
}

.shoppingCart-totalAmount-style {
  font-weight: 600;
}

.shoppingCart-pagination-style {
  margin-top: -60px;
}

@media (max-width: 835px) {
  .shoppingCartNoMid-table thead th:nth-child(1),
  .shoppingCartNoMid-table tbody td:nth-child(1) {
    width: 6%;
  }

  .shoppingCartNoMid-table thead th:nth-child(7),
  .shoppingCartNoMid-table tbody td:nth-child(7) {
    width: 19%;
  }

  .shoppingCart-selectedOrderPay-style {
    width: 180px !important;
    height: 45px !important;
  }
}

@media (max-width: 768px) {
  .shoppingCartNoMid-table > thead > tr > th {
    white-space: nowrap;
  }

  .shoppingCart-pagination-style {
    margin-top: -10px;
  }

  .shoppingCart-selectedOrderPay-style {
    width: 200px !important;
    height: 45px !important;
  }
}

@media (max-width: 650px) {
  .shoppingCart-totalAmount-style {
    font-size: 18px;
  }
}
</style>