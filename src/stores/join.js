import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useJoinStore = defineStore('joinStore', () => {
    // 新增 送出加盟
    const newJoinData = ref({
        join_us_name: '',
        join_us_phone: '',
        join_us_email: '',
        join_us_address: ''
    })
    const resetNewJoinData = () => {
        newJoinData.value = {
            join_us_name: '',
            join_us_phone: '',
            join_us_email: '',
            join_us_address: ''
        }
    }
    const insertNewJoin = async () => {
        try {
            // 發送 POST 請求到後端
            const res = await axios.post(
                "https://project01-back-end.onrender.com/joinUs/createJoinUs",
                newJoinData.value,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // 如果成功，處理響應
            alert("加盟已成功提交！");
            resetNewJoinData();
        } catch (error) {
            console.error("提交加盟時出現錯誤", error);
            alert("提交失敗，請稍後再試！");
        }
    }

    return {
        // 新增 送出加盟
        newJoinData, resetNewJoinData, insertNewJoin,
    }
})