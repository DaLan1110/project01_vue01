<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useHeadWaveStore } from "../stores/HeadWave.js";
import { useMemberStore } from "../stores/member.js";
import { storeToRefs } from "pinia";
import { validationField, validationForm } from "@/hook/validationHook";
import { Modal } from "bootstrap";

const router = useRouter();

const headwaveStore = useHeadWaveStore();
const memberStore = useMemberStore();

const { newMemberData, memberLogin, errorLogin, isAuthenticated, member } =
  storeToRefs(memberStore);

const errors = ref({});
const loading = ref(true);

const memberData = ref(null);
let lastMemberDataString = ref(""); // 儲存上一次的 memberData 值
const memberName = ref("");
const memberAvatar = ref("");
const memberPersonalData = ref("");
const memberId = ref("");
// const baseAvatarUrl =
//   "https://project01-back-end.onrender.com/img/member/member/";

const checkLocalStorage = () => {
  const memberDataString = localStorage.getItem("member_data");
  // console.log(memberDataString);
  // if (memberDataString) {
  //   memberData.value = JSON.parse(memberDataString);
  //   // const memberData = JSON.parse(memberDataString);
  //   memberName.value = memberData.value.member_name || "會員名稱"; // 假設 member_data 裡有 name 欄位
  //   memberAvatar.value = baseAvatarUrl + (memberData.value.member_avatar || "");
  //   memberPersonalData.value = memberData.value;
  //   memberId.value = memberData.value.memberId;
  // }

  if (memberDataString && memberDataString !== lastMemberDataString) {
    // 僅在值發生變化時更新
    lastMemberDataString = memberDataString; // 更新為新的值
    memberData.value = JSON.parse(memberDataString);
    memberName.value = memberData.value.member_name || "會員名稱";
    memberAvatar.value = memberData.value.member_avatar || "";
    memberPersonalData.value = memberData.value;
    memberId.value = memberData.value.memberId;
  } else if (!memberDataString) {
    // 處理無 member_data 的情況
    console.log("No member_data found in localStorage");
  }
};

// 使用 watch 監聽 member 的變化，並同步更新到 localStorage
watch(
  member,
  (newValue) => {
    localStorage.setItem("member_data", JSON.stringify(newValue)); // 更新 localStorage
    console.log("Updated memberData:", newValue);
    memberName.value = newValue.member_name;
    memberAvatar.value = newValue.member_avatar || "";
    memberId.value = newValue.memberId;
  },
  { deep: true }
);

const closeClear = (modalId) => {
  if (modalId === "exampleModal-login") {
    memberLogin.value.member_account = "";
    memberLogin.value.member_password = "";
    errorLogin.value.general = "";
  } else if (modalId === "exampleModal-register") {
    newMemberData.value.member_account = "";
    newMemberData.value.member_password = "";
    newMemberData.value.member_email = "";
    newMemberData.value.member_phone = "";
    errors.value = {};
  }
};

// 模態框顯示和隱藏控制
const hideModal = (modalId) => {
  const modalElement = document.getElementById(modalId);
  const modalInstance = Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide();
  }
};

const handleCreate = async () => {
  const isSuccess = await memberStore.createMemberAccount();
  if (isSuccess) {
    hideModal("exampleModal-register");
  } else {
    console.error("建立失敗");
  }
};

// hook
const onInputBlur = (e, inputText) => {
  const inputValue = e.target.value;
  const inputErrors = validationField(inputText, inputValue);
  inputErrors && inputErrors.length
    ? (errors.value[inputText] = inputErrors)
    : (errors.value[inputText] = null);
};

const isFormValid = computed(() => {
  return validationForm(newMemberData.value).formIsValid;
});

// login
const isFormValidLogin = computed(() => {
  // 檢查所有字段是否都被填寫
  return Object.values(memberLogin.value).every((field) => field.trim() !== "");
});
const loginHandle = async () => {
  const isSuccess = await memberStore.loginMemberAccount();
  if (isSuccess.success) {
    hideModal("exampleModal-login");
    console.log(isSuccess.data.member.member_data);
    console.log("member", member);
    checkLocalStorage();

    // 檢查當前路由
    const currentRoute = router.currentRoute.value;
    if (currentRoute.name === "shoppingCartNoMid") {
      // 如果目前在 `/shoppingCart`，登入成功後跳轉到 `/personal/:id/shoppingCart`
      const memberData = JSON.parse(localStorage.getItem("member_data"));
      router.push({
        name: "shoppingCart", // 跳轉到嵌套的 shoppingCart 路由
        params: { id: memberData.memberId },
      });
    } else {
      // 在其他頁面登入時，不做跳轉
      console.log("登入成功，保持在當前頁面");
    }
  } else {
    console.error(isSuccess.errorMsg);
  }
};

const logoutHandle = () => {
  errorLogin.value.general = "";
  memberStore.logoutMemberAccount(); // 調用 store 的登出方法
  alert("登出成功");
  router.push("/"); // 導向登入頁面
};

// 視窗 991px
const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  memberStore.resetNewMemberData();
  memberStore.resetMemberLogin();
  checkLocalStorage(); // 初次加載時檢查

  setTimeout(() => {
    loading.value = false;
  }, 500);

  // 視窗 991px
  window.addEventListener("resize", updateWindowWidth);

  // const interval = setInterval(checkLocalStorage, 1000); // 每秒檢查一次
  // // 清除定時器
  // onUnmounted(() => {
  //   clearInterval(interval);
  // });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<template>
  <div>
    <nav
      class="navbar navbar-expand-lg p-4"
      :style="{ backgroundColor: headwaveStore.headwave }"
    >
      <div class="container-fluid">
        <RouterLink
          to="/"
          class="navbar-brand fontTitle ms-0 ms-lg-5"
          active-class="active"
          >夏季</RouterLink
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-0 ms-lg-5">
            <li class="nav-item">
              <RouterLink
                to="/about"
                class="nav-link fontTag"
                active-class="active"
                >關於夏祭</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/advantage"
                class="nav-link fontTag"
                active-class="active"
                >品牌優勢</RouterLink
              >
            </li>
            <!-- <li class="nav-item">
              <RouterLink
                to="/branch"
                class="nav-link fontTag"
                active-class="active"
                >分店資訊</RouterLink
              >
            </li> -->
            <li class="nav-item">
              <RouterLink
                to="/menu"
                class="nav-link fontTag"
                active-class="active"
                >夏季menu</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/join-us"
                class="nav-link fontTag"
                active-class="active"
                >即刻加盟</RouterLink
              >
            </li>

            <div v-if="!loading && !isAuthenticated && windowWidth <= 991">
              <li class="nav-item">
                <p class="nav-link fontTag-member no-hover full-width-line"></p>
              </li>
              <li class="nav-item">
                <RouterLink to="/shoppingCart" class="nav-link">
                  <i
                    class="material-icons fontTag-member"
                    style="font-size: 20px"
                    >shopping_cart</i
                  >
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                  to="#"
                  class="nav-link fontTag-member"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal-login"
                  >會員登入</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink
                  to="#"
                  class="nav-link fontTag-member"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal-register"
                  >註冊</RouterLink
                >
              </li>
            </div>

            <div v-else-if="!loading && isAuthenticated && windowWidth <= 991">
              <li class="nav-item">
                <p class="nav-link fontTag-member no-hover full-width-line"></p>
              </li>

              <li class="nav-item d-flex">
                <div class="circle-img mt-1 ms-2">
                  <img
                    v-if="memberAvatar"
                    :src="memberAvatar"
                    alt=""
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                  <i v-else class="material-icons" style="color: #ffffff"
                    >person</i
                  >
                </div>
                <span class="nav-link fontTag-member no-hover">{{
                  memberName
                }}</span>
              </li>
              <li class="nav-item mt-2">
                <RouterLink
                  :to="`/personal/${memberId}/shoppingCart`"
                  class="nav-link"
                >
                  <i
                    class="material-icons fontTag-member mt-1"
                    style="font-size: 20px"
                    >shopping_cart</i
                  >
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  :to="`/personal/${memberId}/orderList`"
                  class="nav-link fontTag-member"
                >
                  訂單紀錄
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  :to="`/personal/${memberId}/personalData`"
                  class="nav-link fontTag-member"
                >
                  修改個人資料
                </RouterLink>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link fontTag-member"
                  href="#"
                  @click="logoutHandle"
                  >登出</a
                >
              </li>
              <!-- <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle fontTag-member"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  會員
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <RouterLink
                      :to="`/personal/${memberId}/orderList`"
                      class="dropdown-item"
                    >
                      訂單紀錄
                    </RouterLink>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <RouterLink
                      :to="`/personal/${memberId}/personalData`"
                      class="dropdown-item"
                    >
                      修改個人資料
                    </RouterLink>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="#" @click="logoutHandle"
                      >登出</a
                    >
                  </li>
                </ul>
              </li> -->
            </div>
          </ul>
          <!-- 未登入 -->
          <ul
            class="navbar-nav ms-auto mb-2 mb-lg-0"
            v-if="!loading && !isAuthenticated && windowWidth > 991"
          >
            <li class="nav-item">
              <RouterLink to="/shoppingCart" class="nav-link">
                <i
                  class="material-icons fontTag-member mt-1"
                  style="font-size: 20px"
                  >shopping_cart</i
                >
              </RouterLink>
            </li>
            <li class="nav-item">
              <p class="nav-link fontTag-member no-hover">|</p>
            </li>
            <li class="nav-item">
              <RouterLink
                to="#"
                class="nav-link fontTag-member"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal-login"
                >會員登入</RouterLink
              >
            </li>
            <li class="nav-item">
              <p class="nav-link fontTag-member no-hover">|</p>
            </li>
            <li class="nav-item">
              <RouterLink
                to="#"
                class="nav-link fontTag-member"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal-register"
                >註冊</RouterLink
              >
            </li>
          </ul>
          <!-- 已登入 -->
          <ul
            class="navbar-nav ms-auto mb-2 mb-lg-0"
            v-else-if="!loading && isAuthenticated && windowWidth > 991"
          >
            <li class="nav-item">
              <RouterLink
                :to="`/personal/${memberId}/shoppingCart`"
                class="nav-link"
              >
                <i
                  class="material-icons fontTag-member mt-1"
                  style="font-size: 20px"
                  >shopping_cart</i
                >
              </RouterLink>
            </li>
            <li class="nav-item">
              <p class="nav-link fontTag-member no-hover me-3">|</p>
            </li>
            <li class="nav-item">
              <div class="circle-img mt-1">
                <img
                  v-if="memberAvatar"
                  :src="memberAvatar"
                  alt=""
                  style="width: 100%; height: 100%; object-fit: cover"
                />
                <i v-else class="material-icons" style="color: #ffffff"
                  >person</i
                >
              </div>
            </li>
            <li class="nav-item">
              <span class="nav-link fontTag-member no-hover">{{
                memberName
              }}</span>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle fontTag-member"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                會員
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <RouterLink
                    :to="`/personal/${memberId}/orderList`"
                    class="dropdown-item"
                  >
                    訂單紀錄
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink
                    :to="`/personal/${memberId}/personalData`"
                    class="dropdown-item"
                  >
                    修改個人資料
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" @click="logoutHandle"
                    >登出</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 會員登入 -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal-login"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">會員登入</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeClear('exampleModal-login')"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-8 mb-4">
                  <input
                    type="text"
                    class="form-control input-member-login"
                    placeholder="Account 會員帳號"
                    aria-label="請輸入帳號"
                    v-model="memberLogin.member_account"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="col-8 mb-3">
                  <input
                    type="password"
                    class="form-control input-member-login"
                    placeholder="Password 會員密碼"
                    aria-label="請輸入密碼"
                    v-model="memberLogin.member_password"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <ul class="input-error-style mt-1" v-if="errorLogin.general">
                  <li>{{ errorLogin.general }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-member-login"
              :disabled="!isFormValidLogin"
              @click="loginHandle"
            >
              登入會員
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 會員註冊 -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal-register"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">會員註冊</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeClear('exampleModal-register')"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-8 mb-4">
                  <input
                    type="text"
                    class="form-control input-member-login"
                    placeholder="Account 註冊帳號"
                    aria-label="請輸入帳號"
                    v-model="newMemberData.member_account"
                    @blur="onInputBlur($event, 'member_account')"
                  />
                  <ul
                    class="input-error-style"
                    v-if="errors.member_account && errors.member_account.length"
                  >
                    <li
                      v-for="(error, index) in errors.member_account"
                      :key="index"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="col-8 mb-4">
                  <input
                    type="password"
                    class="form-control input-member-login"
                    placeholder="Password 註冊密碼"
                    aria-label="請輸入密碼"
                    v-model="newMemberData.member_password"
                    @blur="onInputBlur($event, 'member_password')"
                  />
                  <ul
                    class="input-error-style"
                    v-if="
                      errors.member_password && errors.member_password.length
                    "
                  >
                    <li
                      v-for="(error, index) in errors.member_password"
                      :key="index"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="col-8 mb-4">
                  <input
                    type="text"
                    class="form-control input-member-login"
                    placeholder="請輸入電子郵件"
                    aria-label="請輸入電子郵件"
                    v-model="newMemberData.member_email"
                    @blur="onInputBlur($event, 'member_email')"
                  />
                  <ul
                    class="input-error-style"
                    v-if="errors.member_email && errors.member_email.length"
                  >
                    <li
                      v-for="(error, index) in errors.member_email"
                      :key="index"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="col-8 mb-4">
                  <input
                    type="text"
                    class="form-control input-member-login"
                    placeholder="請輸入手機"
                    aria-label="請輸入手機"
                    v-model="newMemberData.member_phone"
                    @blur="onInputBlur($event, 'member_phone')"
                  />
                  <ul
                    class="input-error-style"
                    v-if="errors.member_phone && errors.member_phone.length"
                  >
                    <li
                      v-for="(error, index) in errors.member_phone"
                      :key="index"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-member-login"
              :disabled="!isFormValid"
              @click="handleCreate"
            >
              註冊會員
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fontTitle {
  font-size: 35px;
  font-weight: 900;
  color: #6c6c6c;
}

.fontTag {
  font-size: 18px;
  font-weight: 600;
  color: #6c6c6c;
  margin-left: 10px;
}

.fontTag:hover,
.fontTag:focus,
.fontTag.active {
  color: #ffffff !important;
  border-bottom: 2px solid #ffffff;
}

.fontTag-member {
  font-size: 18px;
  font-weight: 600;
  color: #6c6c6c;
  margin-left: 10px;
}

.fontTag-member:hover {
  color: #ffffff;
  border-bottom: 2px solid #ffffff;
}

.no-hover:hover {
  color: #6c6c6c;
  border-bottom: none;
  cursor: default;
}

.input-member-login {
  border: none;
  border-bottom: 1px solid #bebebe; /* 你可以調整線條的顏色和粗細 */
  border-radius: 0;
  outline: none;
  font-size: 14px;
  padding-left: 3px;
}

.input-member-login:focus {
  border-bottom-color: #6c6c6c;
  box-shadow: none;
}

input::placeholder {
  color: #bebebe; /* 替換成你想要的顏色 */
  opacity: 1; /* 確保顏色的透明度，如有需要可調整 */
}

input:focus::placeholder {
  color: transparent; /* 將 placeholder 的顏色設為透明 */
}

.btn-member-login {
  background-color: #ffffff;
  color: #6c6c6c;
  border: 1px solid #6c6c6c;
  font-size: 16px;
  font-weight: 700;
  padding: 5px 50px;
}

.btn-member-login:hover {
  background-color: #6c6c6c;
  color: #ffffff;
  opacity: 0.8;
  font-weight: 900;
}

.btn-member-login:disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
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
}

.input-error-style li {
  animation: swipeDown 0.3s ease forwards;
}

.circle-img {
  background-color: #d0d0d0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-width-line {
  width: 90%; /* 讓線條拉滿寬度 */
  height: 1.5px; /* 設置線條高度 */
  background-color: #6c6c6c; /* 線條顏色，可調整為需要的顏色 */
  margin: 10px; /* 去除上下外邊距 */
  padding: 0; /* 去除內邊距 */
}
</style>