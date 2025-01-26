import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useProductStore = defineStore('productStore', () => {
    // 取得所有產品資料
    const products = ref([])
    const getProductData = async () => {
        try {
            const res = await axios.get("https://project01-back-end.onrender.com/products");
            products.value = res.data;
            // console.log(prodcts.value);
            const formatDate = (dateStr) => {
                return new Date(dateStr).toISOString().substring(0, 10); // 格式化為 YYYY-MM-DD
            };

            // 立即格式化日期
            products.value = products.value.map((prodct) => ({
                ...prodct,
                create_at: formatDate(prodct.create_at),
                update_at: formatDate(prodct.update_at),
            }));
            console.log("處理", products.value);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    // 取得單筆產品資料
    const product = ref({});
    const getOneProductData = async (routePathId) => {
        try {
            const res = await axios.get(`https://project01-back-end.onrender.com/products/get/${routePathId}`);
            product.value = res.data;
            console.log(product.value);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return {
        // 取得所有產品資料
        products, getProductData,
        // 取得單筆產品資料
        product, getOneProductData,
    }
})