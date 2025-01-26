<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order";
import PaginationOrderList from "../Pagination.vue";

const route = useRoute();
const routePathId = route.params.id;

const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

// 分頁
const paginatedMembers = ref({});
const itemsPerPage = ref(5);
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

const getMemberOrderList = () => {
  orderStore.getMemberOrderList(routePathId);
};
getMemberOrderList();

// 計算屬性，過濾掉 order_state 為 "未下訂" 的訂單
const filteredOrders = computed(() =>
  orders.value.filter((order) => order.order_state !== "未下訂")
);

// RWD
const isSmallScreen = ref(window.innerWidth < 768);

const isMediumScreen = ref(window.innerWidth < 990);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
  isMediumScreen.value = window.innerWidth < 990;
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
  <div class="orderListByMemberId">
    <div class="pb-5 orderList-title">
      <h2 style="color: #5b5b5b">Order History</h2>
      <h1 class="join-usTitle">訂單紀錄</h1>
    </div>
    <div class="container">
      <table
        class="table table-bordered orderList-table"
        v-if="orders.length > 0 && !isSmallScreen"
      >
        <thead>
          <tr>
            <th width="5%" class="text-center">編號</th>
            <th width="14%" class="text-center">訂單編號</th>
            <th width="10%" class="text-center">訂單價格</th>
            <th width="10%" class="text-center">訂單狀態</th>
            <th width="10%" class="text-center">付款方式</th>
            <th width="10%" class="text-center">下訂時間</th>
            <th width="6%" class="text-center">查看</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="height: 50px"
            v-for="(order, index) in paginatedMembers"
            :key="index"
          >
            <td class="text-center align-middle">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="text-center align-middle">{{ order.order_number }}</td>
            <td class="text-center align-middle">
              NT. ${{ order.order_total }}
            </td>
            <td class="text-center align-middle">{{ order.order_state }}</td>
            <td class="text-center align-middle">{{ order.order_pay }}</td>
            <td class="text-center align-middle">{{ order.update_at }}</td>
            <td class="text-center align-middle">
              <RouterLink
                :to="`/personal/${routePathId}/orderList/${order.id}/orderData`"
                class="edit-btn-style add-user-btn"
              >
                查看
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 卡片呈現方式 -->
      <div v-else-if="orders.length > 0 && isSmallScreen">
        <div class="card-list-orderList col-12">
          <div
            class="orderList-cardto768"
            v-for="(order, index) in paginatedMembers"
            :key="index"
          >
            <p class="card-list-item-orderList">
              <strong>訂單編號:</strong>{{ order.order_number }}
            </p>
            <p class="card-list-item-orderList">
              <strong>訂單價格:</strong>NT. ${{ order.order_total }}
            </p>
            <p class="card-list-item-orderList">
              <strong>訂單狀態:</strong>{{ order.order_state }}
            </p>
            <p class="card-list-item-orderList">
              <strong>付款方式:</strong>{{ order.order_pay }}
            </p>
            <p class="card-list-item-orderList">
              <strong>下訂時間:</strong>{{ order.update_at }}
            </p>
            <p class="card-list-item-orderList">
              <strong>查看:</strong>
              <RouterLink
                :to="`/personal/${routePathId}/orderList/${order.id}/orderData`"
                class="edit-btn-style add-user-btn"
              >
                查看
              </RouterLink>
            </p>
          </div>
        </div>
      </div>

      <table class="table table-bordered" v-else>
        <thead>
          <tr>
            <th width="5%" class="text-center">編號</th>
            <th width="14%" class="text-center">訂單編號</th>
            <th width="10%" class="text-center">訂單價格</th>
            <th width="10%" class="text-center">訂單狀態</th>
            <th width="10%" class="text-center">付款方式</th>
            <th width="10%" class="text-center">下訂時間</th>
            <th width="6%" class="text-center">查看</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="9" class="text-center">無訂單紀錄</td>
          </tr>
        </tbody>
      </table>

      <div class="orderList-pagination-style">
        <!-- 分頁控制 -->
        <PaginationOrderList
          :dataPage="orders"
          :itemsPerPage="itemsPerPage"
          @paginatedMembers="getPaginatedMembers"
          @currentPage="getCurrentPage"
          @totalPages="getTotalPages"
        />
      </div>
    </div>
  </div>
</template>

<style>
.orderListByMemberId {
  min-height: 50vh; /* 初始高度為 50vh，但會隨內容自動增長 */
  height: auto; /* 讓高度根據內容自適應 */
  overflow: visible; /* 確保超出部分內容可見 */
  margin-bottom: 10%;
}

.edit-btn-style {
  border-radius: 4px;
  padding: 7px 12px;
  cursor: pointer;
  text-decoration: none;
  height: 32px;
}

.add-user-btn {
  border: 1px solid #6c6c6c;
  color: #272727;
  background-color: #ffffff;
  font-weight: 900;
  font-size: 12px;
}

.add-user-btn:hover {
  color: #ffffff;
  background-color: #272727;
}

.add-user-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* RWD 768 */
.card-list-orderList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
  margin-left: -10%;
}

.orderList-cardto768 {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.orderList-cardto768 p {
  margin: 0.5rem 0;
  padding-bottom: 10px; /* 增加底部內邊距 */
  border-bottom: 1px solid #ddd; /* 為每個 p 元素添加底部邊框 */
}

.orderList-cardto768 p:last-child {
  border-bottom: none; /* 最後一個 p 元素去掉底部邊框 */
}

.card-list-item-orderList {
  border: 1px solid #f9f9f9; /* 邊框顏色和樣式 */
  padding: 10px; /* 內邊距 */
  margin-bottom: 10px; /* 每個 p 元素之間的間距 */
  background-color: #fff; /* 可選，背景顏色 */

  display: flex;
  align-items: center; /* 垂直居中對齊內容 */
  gap: 10px; /* 在職位標籤和選擇框之間添加間隔 */
}

.orderList-pagination-style {
  margin-top: 45px;
  /* margin-left: -20%; */
}

@media (max-width: 1230px) {
  .orderList-table thead th:nth-child(2),
  .orderList-table tbody td:nth-child(2) {
    width: 12%;
  }

  .orderList-table thead th:nth-child(7),
  .orderList-table tbody td:nth-child(7) {
    width: 8%;
  }
}

@media (max-width: 990px) {
  .orderList-table thead th:nth-child(2),
  .orderList-table tbody td:nth-child(2) {
    width: 10%;
  }

  .orderList-table thead th:nth-child(6),
  .orderList-table tbody td:nth-child(6) {
    width: 11%;
  }

  .orderList-table thead th:nth-child(7),
  .orderList-table tbody td:nth-child(7) {
    width: 9%;
  }
}

@media (max-width: 955px) {
  .orderList-table thead th:nth-child(1),
  .orderList-table tbody td:nth-child(1) {
    width: 6%;
  }

  .orderList-table thead th:nth-child(4),
  .orderList-table tbody td:nth-child(4) {
    width: 9%;
  }
}

@media (max-width: 850px) {
  .orderList-table {
    margin-left: -30px;
  }

  .orderList-title {
    margin-left: -60px;
  }
}

@media (max-width: 800px) {
  .orderList-table {
    margin-left: -60px;
  }

  .orderList-title {
    margin-left: -90px;
  }
}

@media (max-width: 768px) {
  .orderList-pagination-style {
    margin-left: -20%;
  }
}
</style>