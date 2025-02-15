<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/products";
import { useOrderStore } from "@/stores/order";
import { Modal } from "bootstrap";

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const orderStore = useOrderStore();
const { insertProductData } = storeToRefs(orderStore);

const propsId = defineProps({
  id: Number,
});
const productNumber = ref(1);
const totalPrice = computed(() => {
  return product.value.product_price * productNumber.value;
});

const handleProductData = () => {
  sweetnessOptions.value = [];
  iceOptions.value = [];
  addOptions.value = [];
  console.log(propsId.id);
  productStore.getOneProductData(propsId.id);
};

const selectedSweetness = ref("");
const selectedIce = ref("");
const selectedAdditions = ref([]); // 儲存多選的加料選項

const sweetnessOptions = ref([]);
const iceOptions = ref([]);
const addOptions = ref([]);

// 定義可選擇的甜度順序
const sweetnessOrder = ["全糖", "半糖", "少糖", "無糖"];

// 監控 product.product_sweetness 的變化
// 監控 product_sweetness、product_ice 和 product_add 的變化
watch(
  () => [
    product.value.product_sweetness,
    product.value.product_ice,
    product.value.product_add,
  ],
  ([newSweetness, newIce, newAdd]) => {
    if (newSweetness) {
      const sweetnessArray = newSweetness.split(",");
      // 根據 sweetnessOrder 的順序排序
      sweetnessOptions.value = sweetnessArray
        .filter((sweetness) => sweetnessOrder.includes(sweetness))
        .sort((a, b) => sweetnessOrder.indexOf(a) - sweetnessOrder.indexOf(b));
    }
    if (newIce) {
      iceOptions.value = newIce.split(",");
    }
    if (newAdd && newAdd.trim() !== "") {
      addOptions.value = newAdd.split(",");
    } else {
      addOptions.value = [];
    }
  }
);

const closeModal = () => {
  productNumber.value = 1; // 重置數量
  sweetnessOptions.value = [];
  iceOptions.value = [];
  addOptions.value = [];
};

// RWD
const isSmallScreen = ref(window.innerWidth < 990);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 990;
};

onMounted(() => {
  const modalElement = document.getElementById("exampleModal");
  modalElement.addEventListener("hidden.bs.modal", closeModal);

  // RWD
  updateScreenSize(); // 初始化
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  const modalElement = document.getElementById("exampleModal");
  modalElement.removeEventListener("hidden.bs.modal", closeModal);

  // RWD
  window.removeEventListener("resize", updateScreenSize);
});

// 產品加入購物車
const insertProductToShoppingCart = () => {
  try {
    let memberData = JSON.parse(localStorage.getItem("member_data"));
    if (!memberData) {
      // 檢查甜度和冰量是否選擇
      if (!selectedSweetness.value || !selectedIce.value) {
        throw new Error("請選擇甜度和冰量後再加入購物車！");
      }

      console.warn("會員資料不存在，將商品資料暫存到 localStorage。");

      // 商品資料
      const tempProductData = {
        productId: product.value.id,
        shop_name: product.value.product_name,
        shop_price: product.value.product_price,
        shop_img: product.value.product_img,
        shop_quantity: String(productNumber.value),
        shop_total: String(totalPrice.value),
        shop_sweetness: selectedSweetness.value,
        shop_ice: selectedIce.value,
        shop_add: selectedAdditions.value.join(", "),
      };

      // 檢查是否已存在暫存的購物車資料
      let tempCart = JSON.parse(localStorage.getItem("temp_cart")) || [];
      tempCart.push(tempProductData);

      // 更新到 localStorage
      localStorage.setItem("temp_cart", JSON.stringify(tempCart));
      console.log("暫存商品資料到 localStorage:", tempCart);

      // 顯示提示訊息
      alert("商品已加入購物車");

      // 清除 Modal 資料
      productNumber.value = 1;
      selectedSweetness.value = "";
      selectedIce.value = "";
      selectedAdditions.value = [];

      // 關閉 Modal
      const modalElement = document.getElementById("exampleModal");
      const bootstrapModal = Modal.getOrCreateInstance(modalElement);

      // 移除焦點
      modalElement.querySelector("button:focus")?.blur(); // 尋找被焦點選中的 button 並移除焦點
      bootstrapModal.hide();

      return; // 結束流程
    }

    console.log(memberData);
    // 如果有會員資料，繼續插入購物車的流程
    const memberId = memberData.memberId;
    console.log("會員 ID:", memberId);

    insertProductData.value.memberId = memberId;

    // 商品ID和基本資料
    insertProductData.value.productId = product.value.id;
    insertProductData.value.shop_name = product.value.product_name;
    insertProductData.value.shop_price = product.value.product_price;
    insertProductData.value.shop_img = product.value.product_img;

    // 從表單中獲取數量和計算總金額
    insertProductData.value.shop_quantity = productNumber.value;
    insertProductData.value.shop_total = totalPrice.value;

    // 甜度、冰量和加料
    insertProductData.value.shop_sweetness = selectedSweetness.value;
    insertProductData.value.shop_ice = selectedIce.value;
    insertProductData.value.shop_add = selectedAdditions.value.join(", ");

    orderStore.insertShoppingCart();

    // 清除 Modal 資料
    productNumber.value = 1;
    selectedSweetness.value = "";
    selectedIce.value = "";
    selectedAdditions.value = [];

    // 關閉 Modal
    const modalElement = document.getElementById("exampleModal");
    const bootstrapModal = Modal.getOrCreateInstance(modalElement);
    bootstrapModal.hide();
  } catch (error) {
    console.error("加入購物車失敗:", error);
    alert(error.message); // 顯示錯誤訊息
  }
};
</script>

<template>
  <button
    class="btn mt-3 menu-prodect-btn"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="handleProductData"
  >
    商品介紹
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg modal-sizeto990">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #d19b73">
          <p
            class="modal-title fs-5"
            id="exampleModalLabel"
            style="color: #ffffff; font-weight: 800; font-size: 20px !important"
          >
            產品介紹
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <div :class="[isSmallScreen ? 'col-6' : 'col-5']">
              <div class="col-10 d-flex justify-content-center">
                <div class="product-style-img">
                  <img
                    :src="product.product_img"
                    alt=""
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="mt-4 text-start">
                <label for="product_name">產品名稱</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="product.product_name"
                  readonly
                />
              </div>
              <div class="mt-4 text-start">
                <label for="product_price">產品價格</label>
                <input
                  type="number"
                  id="product_price"
                  name="product_price"
                  class="form-control"
                  v-model="product.product_price"
                  readonly
                />
              </div>
              <div class="mt-4 text-start">
                <label for="product_number">數量</label>
                <input
                  type="number"
                  id="product_number"
                  name="product_number"
                  class="form-control"
                  v-model="productNumber"
                />
              </div>
              <div class="mt-4 text-start">
                <label for="member_email">選擇甜度</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="selectedSweetness"
                >
                  <option value="" selected disabled>請選擇</option>
                  <option
                    v-for="sweetness in sweetnessOptions"
                    :key="sweetness"
                    :value="sweetness"
                  >
                    {{ sweetness }}
                  </option>
                </select>
              </div>
              <div class="mt-4 text-start">
                <label for="member_email">選擇溫度</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="selectedIce"
                >
                  <option value="" selected disabled>請選擇</option>
                  <option v-for="ice in iceOptions" :key="ice" :value="ice">
                    {{ ice }}
                  </option>
                </select>
              </div>
              <div class="mt-4 text-start">
                <label for="member_email">選擇加料(選擇)</label>
                <div
                  class="my-2 d-flex align-items-center product-row-add-style"
                >
                  <div
                    class="form-check form-check-inline product-check-add-style"
                    v-for="(add, index) in addOptions"
                    :key="index"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="'chkAdd' + index"
                      name="chkAdd"
                      :value="add"
                      v-model="selectedAdditions"
                    />
                    <label
                      :for="'chkAdd' + index"
                      class="form-check-label check-add-name"
                      >{{ add }}</label
                    >
                  </div>
                </div>
              </div>
              <div class="text-end fw-bold mt-4" style="margin-right: 0">
                <h3>總金額: NT $ {{ totalPrice.toFixed(0) }} 元</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn-style return-btn me-2"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn-style save-btn"
            style="margin-inline-end: 70px"
            @click="insertProductToShoppingCart"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.product-style-img {
  width: 300px;
  height: 400px;
  background-color: #d0d0d0;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  overflow: hidden;
}

.menu-prodect-btn {
  background-color: #d19b73 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  padding: 10px 50px !important;
  transition: background-color 1s ease !important;
  margin-bottom: 20px !important;
}

.menu-prodect-btn:hover {
  opacity: 0.8;
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

.return-btn {
  border: none;
  color: #ffffff;
  background-color: #e6367e;
}

.return-btn:hover {
  opacity: 0.8;
}

.check-add-name {
  white-space: nowrap; /* 防止文字換行 */
}

.product-check-add-style {
  flex: 0 0 10%;
}

@media (max-width: 990px) {
  .modal-lg {
    max-width: 750px !important; /* 固定寬度 */
  }

  .product-style-img {
    width: 270px;
    height: 360px;
  }
}

@media (max-width: 900px) {
  .modal-lg {
    max-width: 750px !important; /* 固定寬度 */
  }
}

@media (max-width: 800px) {
  .modal-lg {
    max-width: 650px !important; /* 固定寬度 */
  }

  .product-style-img {
    width: 240px;
    height: 320px;
  }
}

@media (max-width: 768px) {
  .menu-prodect-btn {
    font-size: 16px !important;
    font-weight: 700 !important;
    padding: 5px 20px !important;
    margin-bottom: 15px !important;
  }

  .modal-lg {
    max-width: 600px !important; /* 固定寬度 */
  }

  .product-row-add-style {
    flex-wrap: wrap !important; /* 允許項目換行 */
  }
}
</style>