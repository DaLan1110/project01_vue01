<script setup>
import { ref, computed, watch } from "vue";

const handleDataPage = ref({});

const dataPage = defineProps({
  dataPage: Array,
  itemsPerPage: {
    type: Number,
    default: 5, // 如果父層沒傳遞，默認每頁顯示 5 個
  },
});

watch(
  () => dataPage.dataPage,
  async (newDataPage) => {
    handleDataPage.value = newDataPage;
    console.log("handleDataPage", handleDataPage);
  }
);

const emit = defineEmits([
  "paginatedMembers",
  "currentPage",
  "totalPages",
]);

const currentPage = ref(1); // 當前頁碼
const totalPages = ref(0); // 總頁數

const goToPage = (page) => {
  if (page !== currentPage.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 生成頁碼按鈕
const generatePages = computed(() => {
  const pages = [];
  const maxPages = 5;

  if (totalPages.value <= maxPages) {
    // 如果總頁數小於等於5，顯示所有頁碼
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      // 如果當前頁碼小於等於3，顯示1到5頁，最後一頁，並摺疊中間頁碼
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
      }
      pages.push("..");
      pages.push(totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      // 如果當前頁碼接近末頁，顯示最前兩頁，摺疊中間頁碼，最後5頁
      pages.push(1);
      pages.push("..");
      for (
        let i = totalPages.value - (maxPages - 2);
        i <= totalPages.value;
        i++
      ) {
        pages.push(i);
      }
    } else {
      // 當當前頁碼在中間時，顯示當前頁前後的2頁碼，並摺疊首尾頁碼
      pages.push(1);
      pages.push("..");
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i);
      }
      pages.push("..");
      pages.push(totalPages.value);
    }
  }
  return pages;
});

// 根據當前頁碼和每頁的顯示數量來篩選會員資料
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * dataPage.itemsPerPage;
  const end = start + dataPage.itemsPerPage;
  const membersDataPage = handleDataPage.value.slice(start, end);
  return membersDataPage;
});

// 監聽 currentPage 和 handleDataPage 的變化，並發射事件
watch([currentPage, handleDataPage], () => {
  emit("paginatedMembers", paginatedMembers.value);

  emit("currentPage", currentPage.value);

  // totalPages（這裡可根據數據長度計算總頁數）
  totalPages.value = Math.ceil(
    handleDataPage.value.length / dataPage.itemsPerPage
  );
  emit("totalPages", totalPages.value);
});
</script>

<template>
  <!-- 分頁控制 -->
  <div class="d-flex justify-content-center mt-4">
    <nav aria-label="Page navigation example">
      <ul class="pagination custom-pagination">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="prevPage"
        >
          <span class="page-link custom-page-link page-style">上一頁</span>
        </li>
        <li
          class="page-item"
          :class="{ active: page === currentPage }"
          v-for="(page, index) in generatePages"
          :key="index"
        >
          <span
            class="page-link custom-page-link page-number-style"
            @click="goToPage(page)"
            :disabled="page === currentPage || page === '...'"
            >{{ page }}</span
          >
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="nextPage"
        >
          <span class="page-link custom-page-link page-style">下一頁</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
/* 調整每個分頁按鈕之間的左右間距 */
.pagination .page-item {
  margin-left: 5px; /* 左側間距 */
  margin-right: 5px; /* 右側間距 */
}

/* 背景透明，字體黑色 */
.page-style {
  background-color: transparent; /* 背景透明 */
  color: black !important; /* 字體顏色為黑色 */
  border: none !important; /* 去除邊框 */
  cursor: pointer !important; /* 點擊時顯示手形 */
}

/* 當按鈕禁用時字體變灰色 */
.page-item.disabled .custom-page-link {
  background-color: transparent;
  color: #8e8e8e !important; /* 禁用狀態下字體顏色變灰 */
}

.page-number-style {
  background-color: transparent;
  border: none !important; /* 去除邊框 */
  color: black !important; /* 字體顏色為黑色 */
  cursor: pointer !important; /* 點擊時顯示手形 */
  border-radius: 20%;
}

.page-style:hover {
  background-color: transparent !important; /* 背景透明 */
}

.page-number-style:hover {
  background-color: #8e8e8e !important;
  color: #ffffff !important;
}

/* 當前頁碼的樣式 */
.page-item.active .page-number-style {
  background-color: black !important; /* 當前頁碼背景黑色 */
  color: white !important; /* 當前頁碼字體白色 */
}
</style>