<script setup>
import { ref, computed, onMounted, onBeforeUnmount, toRaw, unref } from "vue";
import {
  validationField,
  validationFormMemberPwd,
} from "@/hook/validationHook";
import { useRoute } from "vue-router";
import { useMemberStore } from "@/stores/member";
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";

const route = useRoute();
const routePathId = route.params.id;

const memberStore = useMemberStore();

const isNewPasswordVisible = ref(false);

const isConfirmPasswordVisible = ref(false);

const member_password = ref("");

const confirm_member_password = ref(""); // 保存二次密碼

const errors = ref({});

const showNewPassword = () => {
  isNewPasswordVisible.value = true;
};

const showConfirmPassword = () => {
  isConfirmPasswordVisible.value = true;
};

const hideNewPassword = () => {
  isNewPasswordVisible.value = false;
};

const hideConfirmPassword = () => {
  isConfirmPasswordVisible.value = false;
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
  return validationFormMemberPwd(
    {
      member_password: member_password.value,
      confirm_member_password: confirm_member_password.value,
    },
    member_password.value
  ).formIsValid; // 將 member_password 傳入
});

const handlePwd = () => {
  const plainPassword = toRaw(unref(member_password));
  memberStore.updateMemberPwd(routePathId, plainPassword);

  // 確認密碼更新後，手動關閉模態窗口
  const modalElement = document.getElementById("ModalChangePwd");
  const modalInstance = Modal.getInstance(modalElement); // 獲取模態實例
  if (modalInstance) {
    modalInstance.hide(); // 手動關閉模態
  }
};

onMounted(() => {
  // Modal 關閉時重置資料
  const modalElement = document.getElementById("ModalChangePwd");
  modalElement.addEventListener("hidden.bs.modal", resetForm);

  function resetForm() {
    member_password.value = "";
    confirm_member_password.value = "";
    errors.value = {};
  }

  // 在組件卸載前移除事件監聽器
  onBeforeUnmount(() => {
    modalElement.removeEventListener("hidden.bs.modal", resetForm);
  });
});
</script>

<template>
  <div>
    <button
      class="btn-style save-btn me-3"
      data-bs-toggle="modal"
      data-bs-target="#ModalChangePwd"
    >
      修改密碼
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="ModalChangePwd"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">修改密碼</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-8 position-relative">
                  <input
                    :type="isNewPasswordVisible ? 'text' : 'password'"
                    class="form-control"
                    placeholder="請輸入新的密碼"
                    aria-label="請輸入新的密碼"
                    v-model="member_password"
                    @blur="onInputBlur($event, 'member_password')"
                  />
                  <i
                    class="material-icons position-absolute icon-position"
                    @mousedown="showNewPassword"
                    @mouseup="hideNewPassword"
                    @mouseleave="hideNewPassword"
                    >{{
                      isNewPasswordVisible ? "visibility_off" : "visibility"
                    }}</i
                  >
                </div>
              </div>
              <div class="d-flex justify-content-center mt-1">
                <ul
                  class="input-error-style-pwd col-8"
                  v-if="errors.member_password && errors.member_password.length"
                >
                  <li
                    v-for="(error, index) in errors.member_password"
                    :key="index"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <div class="col-8 position-relative">
                  <input
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    class="form-control"
                    placeholder="請輸入二次新密碼"
                    aria-label="請輸入二次新密碼"
                    v-model="confirm_member_password"
                    @blur="onInputBlur($event, 'confirm_member_password')"
                  />
                  <i
                    class="material-icons position-absolute icon-position"
                    @mousedown="showConfirmPassword"
                    @mouseup="hideConfirmPassword"
                    @mouseleave="hideConfirmPassword"
                    >{{
                      isConfirmPasswordVisible ? "visibility_off" : "visibility"
                    }}</i
                  >
                </div>
              </div>
              <div class="d-flex justify-content-center mt-1">
                <ul
                  class="input-error-style-pwd col-8"
                  v-if="
                    errors.confirm_member_password &&
                    errors.confirm_member_password.length
                  "
                >
                  <li
                    v-for="(error, index) in errors.confirm_member_password"
                    :key="index"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn-style return-btn"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn-style save-btn"
              @click="handlePwd"
              :disabled="!isFormValid"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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

.icon-position {
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #e0e0e0;
}

.input-error-style-pwd {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 0;
  list-style: none;
  font-size: 12px;
  color: #e6367e;
  margin: 0;
  margin-left: 5px;
  text-align: left;
}

.return-btn {
  border: none;
  color: #ffffff;
  background-color: #e6367e;
}

.return-btn:hover {
  opacity: 0.8;
}
</style>