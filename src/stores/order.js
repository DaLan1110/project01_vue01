import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useOrderStore = defineStore('orderStore', () => {
    // 取得會員訂單 List
    const orders = ref([]);
    const getMemberOrderList = async (routePathId) => {
        try {
            const res = await axios.get(`https://project01-back-end.onrender.com/orders/getByMemberId/${routePathId}`);
            orders.value = res.data;

            // 格式化每個訂單的 create_at 和 update_at 時間
            orders.value.forEach((orderItem) => {
                // 格式化 create_at
                const createDate = new Date(orderItem.create_at);
                const formattedCreateDate = `${createDate.getFullYear()}-${(createDate.getMonth() + 1).toString().padStart(2, '0')}-${createDate.getDate().toString().padStart(2, '0')} ${createDate.getHours().toString().padStart(2, '0')}:${createDate.getMinutes().toString().padStart(2, '0')}`;
                orderItem.create_at = formattedCreateDate;

                // 格式化 update_at
                const updateDate = new Date(orderItem.update_at);
                const formattedUpdateDate = `${updateDate.getFullYear()}-${(updateDate.getMonth() + 1).toString().padStart(2, '0')}-${updateDate.getDate().toString().padStart(2, '0')} ${updateDate.getHours().toString().padStart(2, '0')}:${updateDate.getMinutes().toString().padStart(2, '0')}`;
                orderItem.update_at = formattedUpdateDate;
            });

            console.log(orders.value);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    // 取得單筆訂單資料
    const order = ref({})
    const getOneOrderData = async (routePathOrderId) => {
        try {
            const res = await axios.get(`https://project01-back-end.onrender.com/orders/get/${routePathOrderId}`);

            // 格式化日期
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });
            };

            // 取得資料並格式化日期
            order.value = {
                ...res.data,
                create_at: formatDate(res.data.create_at),
                update_at: formatDate(res.data.update_at)
            };

            console.log(order.value);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    // 更新 訂單狀態
    const updateOrderState = async (orderId) => {
        try {
            const updateData = ({
                orderState: '取消訂單'
            });
            const response = await axios.put(`https://project01-back-end.onrender.com/orders/updateOrderState/${orderId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            // 處理成功響應
            console.log('訂單狀態更新成功:', response.data);
            alert('已取消訂單');

            // 重新獲取訂單資料以確保狀態同步
            await getOneOrderData(orderId);
        } catch (error) {
            // 處理錯誤
            console.error('更新訂單狀態時發生錯誤:', error);
            let errorMsg = '發生錯誤，請稍後再試。';

            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
            } else if (error.request) {
                errorMsg = '請求未收到回應。';
            }

            alert(errorMsg);
        }
    }

    // 新增產品至購物車
    const insertProductData = ref({
        memberId: '',
        productId: '',
        shop_name: '',
        shop_quantity: '',
        shop_total: '',
        shop_price: '',
        shop_img: '',
        shop_sweetness: '',
        shop_ice: '',
        shop_add: ''
    });
    const resetInsertProductData = () => {
        insertProductData.value = {
            memberId: '',
            productId: '',
            shop_name: '',
            shop_quantity: '',
            shop_total: '',
            shop_price: '',
            shop_img: '',
            shop_sweetness: '',
            shop_ice: '',
            shop_add: ''
        };
    };
    const insertShoppingCart = async () => {
        try {
            const res = await axios.post(
                "https://project01-back-end.onrender.com/orders/insertShoppingCart",
                insertProductData.value,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("建立成功", res.data);
            alert("商品已加入購物車");
            resetInsertProductData();
        } catch (error) {
            // 處理錯誤
            console.error('更新訂單狀態時發生錯誤:', error);
            let errorMsg = '發生錯誤，請稍後再試。';

            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
            } else if (error.request) {
                errorMsg = '請求未收到回應。';
            }

            alert(errorMsg);
        }
    }

    // 查看購物車清單
    const shoppingList = ref([])
    const getShoppingList = async (routePathMemberId) => {
        try {
            const res = await axios.get(`https://project01-back-end.onrender.com/orders/getShoppingList/${routePathMemberId}`);
            shoppingList.value = res.data;

            console.log("購物清單", shoppingList.value);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    // 更新產品數量
    const updateShopQuantity = async (shopQuantity, id) => {
        try {
            const updateData = {
                shop_quantity: shopQuantity
            }
            // 將資料發送到後端進行更新
            const response = await axios.put(
                `https://project01-back-end.onrender.com/orders/updateShopQuantity/${id}`,
                updateData
            );

            // 成功的響應處理
            console.log("資料已更新成功", response.data);
        } catch (error) {
            // 更詳細的錯誤處理
            if (error.response) {
                // 後端有返回錯誤響應
                console.error(
                    `更新資料失敗，錯誤碼: ${error.response.status}, 訊息: ${error.response.data.error}`
                );
            } else if (error.request) {
                // 請求已發送，但未收到響應
                console.error("未收到伺服器的響應，請檢查伺服器狀態");
            } else {
                // 其他錯誤
                console.error("更新資料時發生錯誤:", error.message);
            }
        }
    }

    // 刪除購物車上的單一產品
    const deleteOneProductInShoppingCart = async (id, routePathId) => {
        try {
            // 使用 DELETE 請求刪除選定的成員
            const response = await axios.delete(`https://project01-back-end.onrender.com/orders/deleteShoppingProduct/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("刪除成功:", response.data);
            alert("已取消商品");
            await getShoppingList(routePathId);
        } catch (error) {
            console.error("刪除失敗:", error);

            let errorMsg = "發生錯誤，請稍後再試。";
            if (error.response) {
                // 伺服器有回應
                errorMsg = error.response.data?.message || `伺服器錯誤：${error.response.status}`;
            } else if (error.request) {
                // 未收到伺服器回應
                errorMsg = "伺服器未回應，請檢查網路連線或稍後再試。";
            } else {
                // 其他錯誤
                errorMsg = error.message;
            }

            alert(errorMsg);
        }
    }

    // 新增 送出訂單
    const newOrderData = ref({
        order_number: '',
        order_pay: '',
        order_total: ''
    })
    const generateOrderNumber = () => {
        const randomNum = Math.floor(Math.random() * 10000000000); // 生成 10 位隨機數字
        return `SC${randomNum.toString().padStart(10, '0')}`;
    };
    const insertNewOrder = async (memberId) => {
        try {
            // 生成訂單編號並賦值給 newOrderData
            newOrderData.value.order_number = generateOrderNumber();

            // 發送 POST 請求到後端
            const res = await axios.post(
                `https://project01-back-end.onrender.com/orders/insertOrder/${memberId}`,
                newOrderData.value,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // 如果成功，處理響應
            alert("訂單已成功提交！");
            await getShoppingList(memberId);
        } catch (error) {
            console.error("提交訂單時出現錯誤", error);
            alert("提交失敗，請稍後再試！");
        }
    }

    return {
        // 取得會員訂單 List
        orders, getMemberOrderList,
        // 取得單筆訂單資料
        order, getOneOrderData,
        // 更新 訂單狀態
        updateOrderState,
        // 新增產品至購物車
        insertProductData, insertShoppingCart,
        // 查看購物車清單
        shoppingList, getShoppingList,
        // 更新產品數量
        updateShopQuantity,
        // 刪除購物車上的單一產品
        deleteOneProductInShoppingCart,
        // 新增 送出訂單
        newOrderData, insertNewOrder,
    }
})