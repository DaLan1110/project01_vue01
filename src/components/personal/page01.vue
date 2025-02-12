<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { validationField, validationForm } from "@/hook/validationHook";
import ChangeImg from "../ChangeImg.vue";
import PersonalPwd from "./PersonalPwd.vue";

const route = useRoute();
const routePathId = route.params.id;

const memberStore = useMemberStore();
const { member, tempImageUrl, tempImageUrlName } = storeToRefs(memberStore);

const img_path = "https://project01-back-end.onrender.com/img/member/member/";

const errors = ref({});

const readMemberData = () => {
  memberStore.getOneMemberData(routePathId);
};
readMemberData();

const handleImgUpdate = ({ name, data }) => {
  tempImageUrl.value = data; // 可以將數據保存到本地狀態
  tempImageUrlName.value = name;
  console.log("文件名字:", name);
  console.log("文件數據:", data); // 可以看到文件的 Data URL
  // 可以繼續上船數據到服務器或處理器
};

const handleUpdateMemberData = async () => {
  // if (!isFormValid.value) return;
  await memberStore.updateMemberData(routePathId);
  await memberStore.getOneMemberData(routePathId); // 刷新用戶數據
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
  // 確保 member.value 存在並且所有屬性都有值
  if (
    !member.value ||
    !member.value.member_name ||
    !member.value.member_email ||
    !member.value.member_phone
  ) {
    return false; // 當任一屬性不存在時返回 false
  }
  const { member_name, member_email, member_phone } = member.value;
  // 輸出以檢查當前值
  console.log({ member_name, member_email, member_phone });
  // 驗證表單
  return validationForm({ member_name, member_email, member_phone })
    .formIsValid;
});
</script>

<template>
  <div class="orderDataByOrderId">
    <div class="pb-5 personalData-title">
      <h2 style="color: #5b5b5b">Personal Information</h2>
      <h1 class="join-usTitle">個人資料</h1>
    </div>
    <div class="container">
      <div class="card personalData-card">
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
          style="padding-top: 30px"
        >
          <div class="mt-4 w-75">
            <ChangeImg
              :img_path="img_path"
              :img_avatar="member.member_avatar"
              @updateAvatar="handleImgUpdate"
            />
          </div>
          <div class="mt-3 w-75">
            <label for="memberaccount" class="w-100 d-flex">使用者帳號</label>
            <input
              type="text"
              id="memberaccount"
              name="memberaccount"
              class="form-control"
              v-model="member.member_account"
              disabled
            />
          </div>
          <div class="mt-3 w-75">
            <label for="membername" class="w-100 d-flex">使用者名稱</label>
            <input
              type="text"
              id="membername"
              name="membername"
              class="form-control"
              v-model="member.member_name"
              @blur="onInputBlur($event, 'member_name')"
            />
            <ul
              class="input-error-style"
              v-if="errors.member_name && errors.member_name.length"
            >
              <li v-for="(error, index) in errors.member_name" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="mt-3 w-75">
            <label for="email" class="w-100 d-flex">電子郵件</label>
            <input
              type="text"
              id="email"
              name="email"
              class="form-control"
              v-model="member.member_email"
              @blur="onInputBlur($event, 'member_email')"
            />
            <ul
              class="input-error-style"
              v-if="errors.member_email && errors.member_email.length"
            >
              <li v-for="(error, index) in errors.member_email" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="mt-3 w-75">
            <label for="phone" class="w-100 d-flex">電話號碼</label>
            <input
              type="text"
              id="phone"
              name="phone"
              class="form-control"
              v-model="member.member_phone"
              @blur="onInputBlur($event, 'member_phone')"
            />
            <ul
              class="input-error-style"
              v-if="errors.member_phone && errors.member_phone.length"
            >
              <li v-for="(error, index) in errors.member_phone" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="mt-5 w-75 d-flex justify-content-end">
            <!-- <button class="btn-style save-btn me-3">變更密碼</button> -->
            <PersonalPwd />
            <button
              class="btn-style save-btn"
              style="white-space: nowrap"
              @click="handleUpdateMemberData"
              :disabled="!isFormValid"
            >
              儲存
            </button>
          </div>
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
</style>