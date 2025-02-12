<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";
import PageLayout from "../../components/PageLayout.vue";

const memberStore = useMemberStore();

const memberId = ref("");

const route = useRoute();
const isShoppingCartActive = computed(() =>
  route.path.includes(`/personal/${memberId.value}/shoppingCart`)
);
const isOrderListActive = computed(() =>
  route.path.includes(`/personal/${memberId.value}/orderList`)
);
const isPersonalDataActive = computed(
  () => route.path === `/personal/${memberId.value}/personalData`
);

const checkLocalStorage = () => {
  const memberDataString = localStorage.getItem("member_data");
  if (memberDataString) {
    const memberData = JSON.parse(memberDataString);
    memberId.value = memberData.memberId;
    console.log(memberId.value);
  }
};

// RWD
const isVerySmallScreen = ref(window.innerWidth < 800);

const isSmallScreen = ref(window.innerWidth < 850);

const isSmallScreento1070 = ref(window.innerWidth < 1070);

const isMediumScreen = ref(window.innerWidth < 1230);

const isMediumScreento1320 = ref(window.innerWidth < 1320);

const updateScreenSize = () => {
  isVerySmallScreen.value = window.innerWidth < 800;
  isSmallScreen.value = window.innerWidth < 850;
  isSmallScreento1070.value = window.innerWidth < 1070;
  isMediumScreen.value = window.innerWidth < 1230;
  isMediumScreento1320.value = window.innerWidth < 1320;
};

onMounted(() => {
  checkLocalStorage(); // 初次加載時檢查
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
  <div>
    <PageLayout>
      <div class="layout-container01">
        <div
          class="col-3"
          :class="[isSmallScreen ? 'col-2' : 'col-3']"
          style="height: 400px !important; margin-top: 140px"
        >
          <div
            class="btn-group-vertical"
            role="group"
            aria-label="Vertical radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="vbtn-radio"
              id="vbtn-radio1"
              autocomplete="off"
            />
            <label
              :class="[
                'btn',
                'btn-outline-style',
                { 'active-link': isShoppingCartActive },
              ]"
              for="vbtn-radio1"
            >
              <RouterLink
                v-if="memberId"
                :to="`/personal/${memberId}/shoppingCart`"
                class="link-overlay"
              ></RouterLink>
              購物車
            </label>
            <input
              type="radio"
              class="btn-check"
              name="vbtn-radio"
              id="vbtn-radio2"
              autocomplete="off"
            />
            <label
              :class="[
                'btn',
                'btn-outline-style',
                { 'active-link': isOrderListActive },
              ]"
              for="vbtn-radio2"
            >
              <RouterLink
                v-if="memberId"
                :to="`/personal/${memberId}/orderList`"
                class="link-overlay"
              ></RouterLink>
              訂單查詢</label
            >
            <input
              type="radio"
              class="btn-check"
              name="vbtn-radio"
              id="vbtn-radio3"
              autocomplete="off"
            />
            <label
              :class="[
                'btn',
                'btn-outline-style',
                { 'active-link': isPersonalDataActive },
              ]"
              for="vbtn-radio3"
            >
              <RouterLink
                v-if="memberId"
                :to="`/personal/${memberId}/personalData`"
                class="link-overlay"
              ></RouterLink>
              個人資料</label
            >
          </div>
        </div>
        <div
          class="personal-right-row-style"
          :class="[
            route.name === 'shoppingCart' || route.name === 'orderData'
              ? isSmallScreento1070
                ? 'col-9'
                : isMediumScreento1320
                ? 'col-8'
                : 'col-8'
              : route.name === 'orderList'
              ? isVerySmallScreen
                ? 'col-10'
                : isSmallScreen
                ? 'col-9'
                : isMediumScreen
                ? 'col-8'
                : 'col-7'
              : 'col-7',
          ]"
        >
          <RouterView />
        </div>
      </div>
    </PageLayout>
  </div>
</template>

<style>
.layout-container01 {
  display: flex;
  width: 100%;
}

.btn-group-vertical {
  width: 100%; /* 設置整體寬度，可以調整為合適的大小 */
  height: 30%;
  max-width: 30%; /* 設定一個最大寬度 */
}

.link-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.btn-group-vertical .btn {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文字置中 */
  width: 100%; /* 確保按鈕寬度填滿父容器 */
  font-size: 16px;
  font-weight: 600;
}

.btn-outline-style {
  color: #5b5b5b !important; /* 灰色文字顏色 */
  border: 1px solid #bebebe !important; /* 灰色邊框 */
}

.btn-outline-style:hover {
  color: #fff !important; /* 懸停時文字變為白色 */
  background-color: #bebebe !important; /* 懸停時背景變為灰色 */
  border: 1px solid #bebebe !important; /* 灰色邊框 */
}

.active-link {
  color: #fff !important; /* 自定義 active 狀態的顏色 */
  background-color: #5b5b5b !important; /* 可選：更改背景顏色 */
  border: 1px solid #5b5b5b !important; /* 灰色邊框 */
}
</style>