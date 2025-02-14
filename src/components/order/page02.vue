<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order";
import orderImg from "./orderImg.vue";
import PaginationOrderList from "../Pagination.vue";

const route = useRoute();
const routePathOrderId = route.params.orderId;
const routePathMemberId = route.params.id;

const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

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

const getOneOrderData = () => {
  orderStore.getOneOrderData(routePathOrderId);
};
getOneOrderData();

const cancelOrderState = () => {
  const confirmation = confirm("確定要取消訂單嗎?");
  if (confirmation) {
    orderStore.updateOrderState(routePathOrderId);
  }
};

const completeOrderState = () => {
  orderStore.updateCompleteOrderState(routePathOrderId);
};

// RWD
const isSmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
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
    <div class="pb-5 personal-orderData-title">
      <h2 style="color: #5b5b5b">Order History</h2>
      <h1 class="join-usTitle">訂單紀錄</h1>
    </div>
    <div class="container">
      <div class="card personal-orderData-card">
        <div class="card-header d-flex justify-content-between">
          <div class="orderNumber-row">
            <h4 class="mt-3 orderNumber-h4">
              訂單編號：{{ order.order_number }}
            </h4>
          </div>
          <div class="orderState-row">
            <h4 class="mt-3 orderState-h4">
              訂單狀態：{{ order.order_state }}
            </h4>
          </div>
        </div>
        <div class="card-body" style="padding: 30px">
          <table
            class="table table-bordered personal-orderData-table"
            v-if="!isSmallScreen"
          >
            <thead>
              <tr>
                <th width="5%" class="text-center">編號</th>
                <th width="20%" class="text-center">預覽圖</th>
                <th width="15%" class="text-center">產品名稱</th>
                <th width="10%" class="text-center">產品數量</th>
                <th width="10%" class="text-center">產品總價</th>
                <th width="10%" class="text-center">甜度</th>
                <th width="10%" class="text-center">溫度</th>
                <th width="20%" class="text-center">加料選擇</th>
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
                  <orderImg :img_avatar="item.shop_img" />
                </td>
                <td class="text-center align-middle">{{ item.shop_name }}</td>
                <td class="text-center align-middle">
                  {{ item.shop_quantity }}
                </td>
                <td class="text-center align-middle">
                  NT. ${{ item.shop_total }}
                </td>
                <td class="text-center align-middle">
                  {{ item.shop_sweetness }}
                </td>
                <td class="text-center align-middle">
                  {{ item.shop_ice }}
                </td>
                <td class="text-center align-middle">
                  {{ item.shop_add }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 卡片呈現方式 -->
          <div class="card-list-shoppingCart col-12" v-else>
            <div
              class="shoppingCart-cardto910"
              v-for="(item, index) in paginatedMembers"
              :key="index"
            >
              <p class="card-list-item-shoppingCart">
                <strong>產品名稱:</strong>{{ item.shop_name }}
              </p>
              <p class="card-list-item-shoppingCart card-list-item-div">
                <strong>產品數量:</strong>{{ item.shop_quantity }}
              </p>
              <orderImg
                :img_avatar="item.shop_img"
                class="shoppingCart-img-768"
              />
              <p class="card-list-item-shoppingCart">
                <strong>產品總價:</strong>NT. ${{ item.shop_total }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>甜度:</strong>{{ item.shop_sweetness }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>溫度:</strong>{{ item.shop_ice }}
              </p>
              <p class="card-list-item-shoppingCart">
                <strong>加料選擇:</strong>{{ item.shop_add }}
              </p>
            </div>
          </div>
        </div>

        <!-- 分頁控制 -->
        <PaginationOrderList
          :dataPage="order.shoppingList"
          :itemsPerPage="itemsPerPage"
          @paginatedMembers="getPaginatedMembers"
          @currentPage="getCurrentPage"
          @totalPages="getTotalPages"
        />

        <div
          class="text-end"
          style="padding: 30px; padding-top: 0; padding-bottom: 10px"
        >
          <h3 style="font-weight: 600">
            總金額: NT ${{ order.order_total }} 元
          </h3>
        </div>
        <div
          class="d-flex justify-content-end"
          style="padding: 30px; padding-top: 0"
        >
          <button
            v-if="order.order_state === '待核款'"
            class="btn-style cancel-btn me-3"
            @click="completeOrderState"
          >
            完成付款
          </button>
          <button
            v-if="order.order_state === '待核款'"
            class="btn-style cancel-btn me-3"
            @click="cancelOrderState"
          >
            取消訂單
          </button>
          <RouterLink
            :to="`/personal/${routePathMemberId}/orderList`"
            class="btn-style return-btn"
            >返回</RouterLink
          >
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

.cancel-btn {
  border: 1px solid #5b5b5b;
  color: #3c3c3c;
  background-color: #ffffff;
}

.cancel-btn:hover {
  border: 1px solid #5b5b5b;
  color: #ffffff;
  background-color: #5b5b5b;
}

.return-btn {
  border: none;
  color: #ffffff;
  background-color: #e6367e;
}

.return-btn:hover {
  opacity: 0.8;
}

.orderNumber-row {
  padding-left: 20px;
}

.orderNumber-h4 {
  font-weight: 600;
}

.orderState-row {
  padding-right: 20px;
}

.orderState-h4 {
  font-weight: 600;
}

@media (max-width: 1450px) {
  .personal-orderData-table thead th:nth-child(1),
  .personal-orderData-table tbody td:nth-child(1) {
    width: 7%;
  }

  .personal-orderData-table thead th:nth-child(3),
  .personal-orderData-table tbody td:nth-child(3) {
    width: 11%;
  }

  .personal-orderData-table thead th:nth-child(4),
  .personal-orderData-table tbody td:nth-child(4) {
    width: 11%;
  }

  .personal-orderData-table thead th:nth-child(5),
  .personal-orderData-table tbody td:nth-child(5) {
    width: 11%;
  }
}

@media (max-width: 1070px) {
  .personal-orderData-card {
    margin-left: -60px;
  }

  .personal-orderData-title {
    margin-left: -60px;
  }
}

@media (max-width: 815px) {
  .personal-orderData-table thead th:nth-child(1),
  .personal-orderData-table tbody td:nth-child(1) {
    width: 8%;
  }

  .personal-orderData-table thead th:nth-child(3),
  .personal-orderData-table tbody td:nth-child(3),
  .personal-orderData-table thead th:nth-child(4),
  .personal-orderData-table tbody td:nth-child(4),
  .personal-orderData-table thead th:nth-child(5),
  .personal-orderData-table tbody td:nth-child(5) {
    width: 13%;
  }

  .personal-orderData-table thead th:nth-child(8),
  .personal-orderData-table tbody td:nth-child(8) {
    width: 13%;
  }
}

@media (max-width: 768px) {
  .personal-orderData-card {
    margin-left: -30px;
  }

  .orderNumber-row {
    padding-left: 10px;
  }

  .orderState-row {
    padding-right: 10px;
  }
}

@media (max-width: 650px) {
  .orderNumber-row {
    padding-left: 0px;
  }

  .orderState-row {
    padding-right: 0px;
  }

  .orderNumber-h4,
  .orderState-h4 {
    font-size: 14px;
  }
}
</style>