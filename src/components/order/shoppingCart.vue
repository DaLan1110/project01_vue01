<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order";
import { useMemberStore } from "@/stores/member";
import orderImg from "./orderImg.vue";
import PaginationOrderList from "../Pagination.vue";

const route = useRoute();
const routePathId = route.params.id;

const orderStore = useOrderStore();
const { shoppingList, newOrderData, insertProductData } =
  storeToRefs(orderStore);

const img_path = "https://project01-back-end.onrender.com/img/product/";
const saveOrderPay = ref("");

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

const getShoppingList = () => {
  orderStore.getShoppingList(routePathId);
};
getShoppingList();

const decreaseQuantity = (item) => {
  if (item.shop_quantity > 1) {
    item.shop_quantity--;
    orderStore.updateShopQuantity(item.shop_quantity, item.id).then(() => {
      orderStore.getShoppingList(routePathId);
    });
  }
};

const increaseQuantity = (item) => {
  item.shop_quantity++;
  orderStore.updateShopQuantity(item.shop_quantity, item.id).then(() => {
    orderStore.getShoppingList(routePathId);
  });
};

// 計算總金額
const totalAmount = computed(() => {
  return shoppingList.value.reduce((total, item) => {
    return total + parseFloat(item.shop_total); // 假設 shop_total 是數字或字串形式的數字
  }, 0);
});

const deleteOneProductInShoppingCart = (id) => {
  orderStore.deleteOneProductInShoppingCart(id, routePathId);
  console.log(routePathId);
};

const insertNewOrder = async () => {
  newOrderData.value.order_pay = saveOrderPay.value;
  newOrderData.value.order_total = totalAmount.value;
  await orderStore.insertNewOrder(routePathId);
  // try {
  //   // 確保路徑 ID 正確
  //   await orderStore.insertNewOrder(routePathId);
  // } catch (error) {
  //   console.error("訂單提交錯誤", error);
  //   alert("提交失敗，請稍後再試！");
  // }
};

// 取得 localstorage 的 購物清單
const shoppingCartFromLocalStorage =
  JSON.parse(localStorage.getItem("temp_cart")) || [];
const loggedInShoppingCart = shoppingList.value; // 假設已登入的購物車資料是從 `orderStore` 的 `shoppingList` 中取得
// 比對購物車資料
const compareAndUpdateCart = async () => {
  for (const localItem of shoppingCartFromLocalStorage) {
    // 檢查本地購物車是否已有相同商品
    const existingItemIndex = loggedInShoppingCart.findIndex((item) => {
      const sortedItemShopAdd = item.shop_add
        .split(",")
        .map((str) => str.trim())
        .sort();
      const sortedLocalItemShopAdd = localItem.shop_add
        .split(",")
        .map((str) => str.trim())
        .sort();
      // console.log("shop_name", item.shop_name);
      // console.log("shop_sweetness", item.shop_sweetness);
      // console.log("shop_ice", item.shop_ice);
      // console.log("shop_add", sortedItemShopAdd);
      // 確保條件檢查過程被正確記錄
      // console.log("localItem shop_name", localItem.shop_name);
      // console.log("localItem shop_sweetness", localItem.shop_sweetness);
      // console.log("localItem shop_ice", localItem.shop_ice);
      // console.log("localItem shop_add", sortedLocalItemShopAdd);

      return (
        item.shop_name === localItem.shop_name &&
        item.shop_sweetness === localItem.shop_sweetness &&
        item.shop_ice === localItem.shop_ice &&
        // item.shop_add === localItem.shop_add
        JSON.stringify(sortedItemShopAdd) ===
          JSON.stringify(sortedLocalItemShopAdd)
      );
    });
    console.log(existingItemIndex);

    if (existingItemIndex !== -1) {
      // 如果已經有相同商品，則增加數量
      const existingItem = loggedInShoppingCart[existingItemIndex];
      existingItem.shop_quantity = Number(existingItem.shop_quantity);
      localItem.shop_quantity = Number(localItem.shop_quantity);
      existingItem.shop_quantity += localItem.shop_quantity;

      // 更新資料庫中的數量
      orderStore
        .updateShopQuantity(existingItem.shop_quantity, existingItem.id)
        .then(() => {
          // 更新購物車清單
          orderStore.getShoppingList(routePathId);
        });
    } else {
      // 如果沒有相同商品，則透過 orderStore.insertShoppingCart 新增商品
      insertProductData.value.memberId = parseInt(routePathId, 10); // 替換成實際的會員ID
      insertProductData.value.productId = localItem.productId; // 替換成實際的商品ID
      insertProductData.value.shop_name = localItem.shop_name;
      insertProductData.value.shop_quantity = parseInt(localItem.shop_quantity);
      insertProductData.value.shop_total = parseInt(localItem.shop_total);
      insertProductData.value.shop_price = localItem.shop_price;
      insertProductData.value.shop_img = localItem.shop_img;
      insertProductData.value.shop_sweetness = localItem.shop_sweetness;
      insertProductData.value.shop_ice = localItem.shop_ice;
      insertProductData.value.shop_add = localItem.shop_add;

      // 呼叫 insertShoppingCart 方法
      await orderStore.insertShoppingCart();

      orderStore.getShoppingList(routePathId);
    }
  }
};

// RWD
const isSmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

onMounted(async () => {
  await compareAndUpdateCart();
  localStorage.removeItem("temp_cart");

  // RWD
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  // RWD
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div class="orderDataByOrderId">
    <div class="pb-5 text-center shoppingCart-personal-title">
      <h2 style="color: #5b5b5b">Shopping Cart</h2>
      <h1 class="join-usTitle">購物車</h1>
    </div>
    <div class="container">
      <div class="card shoppingCart-personal-card">
        <!-- <div class="card-header d-flex justify-content-between">
          <div style="padding-left: 20px">
            <h4 class="mt-3" style="font-weight: 600">1</h4>
          </div>
          <div style="padding-right: 20px">
            <h4 class="mt-3" style="font-weight: 600">1</h4>
          </div>
        </div> -->
        <div
          class="card-body d-flex flex-column align-items-center"
          style="padding: 20px"
        >
          <table
            class="table table-bordered shoppingCart-personal-table"
            style="font-size: 12px"
            v-if="shoppingList.length > 0 && !isSmallScreen"
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
                style="height: 40px"
                v-for="(item, index) in paginatedMembers"
                :key="index"
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
                      @click="decreaseQuantity(item)"
                      :disabled="item.shop_quantity <= 1"
                    >
                      -
                    </button>

                    <!-- 顯示數量 -->
                    <span class="shoppingCart-quantity-style">{{
                      item.shop_quantity
                    }}</span>

                    <!-- 增加數量 -->
                    <button
                      class="btn-style-di"
                      @click="increaseQuantity(item)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="text-center align-middle">
                  <div
                    class="btn-style return-btn"
                    @click="deleteOneProductInShoppingCart(item.id)"
                  >
                    刪除
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 卡片呈現方式 -->
          <div
            class="card-list-shoppingCart col-12"
            v-else-if="shoppingList.length > 0 && isSmallScreen"
            v-for="(item, index) in paginatedMembers"
            :key="index"
          >
            <div class="shoppingCart-cardto910">
              <p class="card-list-item-shoppingCart">
                <strong>產品名稱:</strong>{{ item.shop_name }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>產品總價:</strong>{{ item.shop_total }}
              </p>
              <orderImg
                :img_path="img_path"
                :img_avatar="item.shop_img"
                :allowScreenStyle="allowScreenStyle"
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
                  <button
                    class="btn-style-di"
                    @click="decreaseQuantity(item)"
                    :disabled="item.shop_quantity <= 1"
                  >
                    -
                  </button>

                  <!-- 顯示數量 -->
                  <span class="shoppingCart-quantity-style">{{
                    item.shop_quantity
                  }}</span>

                  <!-- 增加數量 -->
                  <button class="btn-style-di" @click="increaseQuantity(item)">
                    +
                  </button>
                </div>
              </div>
              <div class="card-list-item-shoppingCart card-list-item-div">
                <strong>刪除:</strong>
                <div
                  class="btn-style return-btn"
                  @click="deleteOneProductInShoppingCart(item.id)"
                >
                  刪除
                </div>
              </div>
            </div>
          </div>

          <div
            class="card-list-shoppingCart col-12"
            v-else-if="shoppingList.length === 0 && isSmallScreen"
          >
            <div class="shoppingcart-noshop">
              <p
                class="shoppingcart-noshop-cardlist-item d-flex justify-content-center"
              >
                <strong>無任何商品</strong>
              </p>
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
              class="form-select shoppingCart-personal-floatingSelect"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="saveOrderPay"
            >
              <option selected disabled value="">請選擇</option>
              <option value="現金支付">現金支付</option>
              <option value="信用卡付款">信用卡付款</option>
            </select>
            <label for="floatingSelect" style="font-size: 13px"
              >請選擇付款方式</label
            >
          </div>
          <h3 style="font-weight: 600">
            總金額: NT ${{ totalAmount.toFixed(0) }} 元
          </h3>
        </div>

        <div class="shoppingCart-personal-pagination-style">
          <!-- 分頁控制 -->
          <PaginationOrderList
            :dataPage="shoppingList"
            :itemsPerPage="itemsPerPage"
            @paginatedMembers="getPaginatedMembers"
            @currentPage="getCurrentPage"
            @totalPages="getTotalPages"
          />
        </div>

        <div class="d-flex justify-content-center" style="padding: 30px">
          <!-- <RouterLink to="#" class="btn-style save-btn" @click="insertNewOrder"
            >送出訂單</RouterLink
          > -->
          <button class="btn-style save-btn" @click="insertNewOrder">
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

.shoppingCart-quantity-style {
  width: 60px; /* 每個框的寬度 */
  height: 30px; /* 每個框的高度 */
  font-size: 16px; /* 文字大小 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid black; /* 左邊框 */
  border-right: 1px solid black; /* 右邊框 */
}

.shoppingCart-personal-floatingSelect {
  width: 250px !important;
  height: 30px !important;
}

.shoppingCart-personal-pagination-style {
  margin-top: -60px;
}

.shoppingcart-noshop {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.shoppingcart-noshop p {
  margin: 0.5rem 0;
  padding-bottom: 10px; /* 增加底部內邊距 */
  border-bottom: 1px solid #ddd; /* 為每個 p 元素添加底部邊框 */
}

.shoppingcart-noshop p:last-child {
  border-bottom: none; /* 最後一個 p 元素去掉底部邊框 */
}

.shoppingcart-noshop-cardlist-item {
  border: 1px solid #f9f9f9; /* 邊框顏色和樣式 */
  padding: 10px; /* 內邊距 */
  margin-bottom: 10px; /* 每個 p 元素之間的間距 */
  background-color: #fff; /* 可選，背景顏色 */

  display: flex;
  align-items: center; /* 垂直居中對齊內容 */
  gap: 10px; /* 在職位標籤和選擇框之間添加間隔 */
}

@media (max-width: 1500px) {
  .shoppingCart-personal-table thead th:nth-child(1),
  .shoppingCart-personal-table tbody td:nth-child(1) {
    width: 6%;
  }

  .shoppingCart-quantity-style {
    width: 40px;
  }

  .shoppingCart-personal-floatingSelect {
    width: 180px !important;
  }
}

@media (max-width: 1160px) {
  .shoppingCart-personal-table thead th:nth-child(1),
  .shoppingCart-personal-table tbody td:nth-child(1) {
    width: 7%;
  }

  .shoppingCart-personal-table thead th:nth-child(3),
  .shoppingCart-personal-table tbody td:nth-child(3) {
    width: 12%;
  }

  .shoppingCart-personal-table thead th:nth-child(4),
  .shoppingCart-personal-table tbody td:nth-child(4) {
    width: 12%;
  }

  .shoppingCart-personal-table thead th:nth-child(5),
  .shoppingCart-personal-table tbody td:nth-child(5) {
    width: 9%;
  }

  .shoppingCart-personal-table thead th:nth-child(6),
  .shoppingCart-personal-table tbody td:nth-child(6) {
    width: 9%;
  }

  .shoppingCart-personal-table thead th:nth-child(7),
  .shoppingCart-personal-table tbody td:nth-child(7) {
    width: 17%;
  }
}

@media (max-width: 1070px) {
  .shoppingCart-personal-card {
    margin-left: -60px;
  }

  .shoppingCart-personal-title {
    margin-left: -60px;
  }

  .shoppingCart-personal-floatingSelect {
    width: 150px !important;
  }
}

@media (max-width: 900px) {
  .shoppingCart-personal-pagination-style {
    margin-top: 0px;
  }

  .shoppingCart-personal-floatingSelect {
    width: 180px !important;
  }
}

@media (max-width: 860px) {
  .shoppingCart-quantity-style {
    width: 35px;
  }

  .shoppingCart-personal-table thead th:nth-child(1),
  .shoppingCart-personal-table tbody td:nth-child(1) {
    width: 8%;
  }

  .shoppingCart-personal-table thead th:nth-child(3),
  .shoppingCart-personal-table tbody td:nth-child(3) {
    width: 14%;
  }

  .shoppingCart-personal-table thead th:nth-child(4),
  .shoppingCart-personal-table tbody td:nth-child(4) {
    width: 14%;
  }

  .shoppingCart-personal-table thead th:nth-child(5),
  .shoppingCart-personal-table tbody td:nth-child(5) {
    width: 8%;
  }

  .shoppingCart-personal-table thead th:nth-child(6),
  .shoppingCart-personal-table tbody td:nth-child(6) {
    width: 8%;
  }

  .shoppingCart-personal-table thead th:nth-child(7),
  .shoppingCart-personal-table tbody td:nth-child(7) {
    width: 14%;
  }
}

@media (max-width: 768px) {
  .shoppingCart-quantity-style {
    width: 100px;
  }
}

@media (max-width: 600px) {
  .shoppingCart-personal-card {
    margin-left: -30px;
  }

  .shoppingCart-personal-floatingSelect {
    width: 120px !important;
  }
}
</style>