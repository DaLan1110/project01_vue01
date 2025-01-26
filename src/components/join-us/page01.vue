<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useJoinStore } from "@/stores/join";
import { validationField, validationForm } from "@/hook/validationHook";

const joinStore = useJoinStore();
const { newJoinData } = storeToRefs(joinStore);

const errors = ref({});

const handleInsertJoin = async () => {
  await joinStore.insertNewJoin();
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
  // 確保 join.value 存在並且所有屬性都有值
  if (
    !newJoinData.value ||
    !newJoinData.value.join_us_name ||
    !newJoinData.value.join_us_phone ||
    !newJoinData.value.join_us_email ||
    !newJoinData.value.join_us_address
  ) {
    return false; // 當任一屬性不存在時返回 false
  }
  const { join_us_name, join_us_phone, join_us_email, join_us_address } =
    newJoinData.value;
  // 輸出以檢查當前值
  console.log({ join_us_name, join_us_phone, join_us_email, join_us_address });
  // 驗證表單
  return validationForm({
    join_us_name,
    join_us_phone,
    join_us_email,
    join_us_address,
  }).formIsValid;
});

onMounted(() => {
  joinStore.resetNewJoinData();
});
</script>

<template>
  <div class="join-us">
    <div class="pb-5">
      <h2 style="color: #5b5b5b">Join Us</h2>
      <h1 class="join-usTitle">加入夏季</h1>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="input-group join-input-style">
          <input
            type="text"
            class="form-control join-input-font"
            placeholder="姓名*"
            aria-label="請輸入姓名"
            v-model="newJoinData.join_us_name"
            @blur="onInputBlur($event, 'join_us_name')"
          />
        </div>
      </div>
      <ul
        class="input-error-style mb-3 mt-1"
        v-if="errors.join_us_name && errors.join_us_name.length"
      >
        <li v-for="(error, index) in errors.join_us_name" :key="index">
          {{ error }}
        </li>
      </ul>
      <div class="d-flex justify-content-center mt-3">
        <div class="input-group join-input-style">
          <input
            type="text"
            class="form-control join-input-font"
            placeholder="聯絡電話*"
            aria-label="請輸入電話"
            v-model="newJoinData.join_us_phone"
            @blur="onInputBlur($event, 'join_us_phone')"
          />
        </div>
      </div>
      <ul
        class="input-error-style mb-3 mt-1"
        v-if="errors.join_us_phone && errors.join_us_phone.length"
      >
        <li v-for="(error, index) in errors.join_us_phone" :key="index">
          {{ error }}
        </li>
      </ul>
      <div class="d-flex justify-content-center mt-3">
        <div class="input-group join-input-style">
          <input
            type="text"
            class="form-control join-input-font"
            placeholder="電子郵件"
            aria-label="請輸入電子郵件"
            v-model="newJoinData.join_us_email"
            @blur="onInputBlur($event, 'join_us_email')"
          />
        </div>
      </div>
      <ul
        class="input-error-style mb-3 mt-1"
        v-if="errors.join_us_email && errors.join_us_email.length"
      >
        <li v-for="(error, index) in errors.join_us_email" :key="index">
          {{ error }}
        </li>
      </ul>
      <div class="d-flex justify-content-center mt-3 mb-1">
        <div class="input-group join-input-style">
          <input
            type="text"
            class="form-control join-input-font"
            placeholder="預計加盟地址*"
            aria-label="請輸入加盟地址"
            v-model="newJoinData.join_us_address"
            @blur="onInputBlur($event, 'join_us_address')"
          />
        </div>
      </div>
      <ul
        class="input-error-style"
        v-if="errors.join_us_address && errors.join_us_address.length"
      >
        <li v-for="(error, index) in errors.join_us_address" :key="index">
          {{ error }}
        </li>
      </ul>
      <div class="d-flex justify-content-center">
        <button
          class="btn mt-5 join-us-btn"
          @click="handleInsertJoin"
          :disabled="!isFormValid"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.join-us {
  height: 70vh;
  width: 60%;
}

.join-usTitle {
  font-size: 45px;
  font-weight: 700;
  color: #5b5b5b;
}

.join-input-style {
  width: 50%;
  height: 40px;
}

.join-input-font {
  font-size: 15px;
}

.join-us-btn {
  background-color: #d19b73 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  padding: 10px 50px !important;
  transition: background-color 1s ease !important;
}

.join-us-btn:hover {
  background-color: #d19b73 !important;
  color: #ffffff !important;
  opacity: 0.8 !important;
  font-weight: 900 !important;
}
</style>