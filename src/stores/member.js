import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useMemberStore = defineStore('memberStore', () => {
    // 新增會員
    const newMemberData = ref({
        member_account: '',
        member_password: '',
        member_email: '',
        member_phone: ''
    });
    const resetNewMemberData = () => {
        newMemberData.value = {
            member_account: '',
            member_password: '',
            member_email: '',
            member_phone: ''
        };
    };
    const createMemberAccount = async () => {
        try {
            const res = await axios.post(
                "https://project01-back-end.onrender.com/members/createMember",
                newMemberData.value,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("檔案建立成功", res.data);

            alert("註冊成功");
            resetNewMemberData();

            return true;  // 返回成功
        } catch (error) {
            console.error("失敗:", error);

            let errorMsg = "發生錯誤，請稍後再試。";
            if (error.response && error.response.data && error.response.data.message) {
                errorMsg = error.response.data.message;
            } else if (error.request) {
                errorMsg = "請求未收到回應。";
            }

            alert(errorMsg);

            return false;  // 返回失敗
        }
    }

    // 登入會員
    const memberLogin = ref({
        member_account: "",
        member_password: "",
    });
    const errorLogin = ref({});
    const member_data = ref({
        member_name: "",
        member_permissions: "",
        member_avatar: "",
    });
    const setMember = (data) => {
        member_data.value = data;
    };
    const resetMemberLogin = () => {
        memberLogin.value = {
            member_account: "",
            member_password: "",
        };
    };
    const isAuthenticated = ref(false); // 用來檢查用戶是否已登入
    const loginMemberAccount = async () => {

        try {
            const res = await axios.post(
                "https://project01-back-end.onrender.com/members/login",
                memberLogin.value,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("登入成功", res.data);

            // 檢查權限是否為 '關閉'
            const memberPermissions = res.data.member.member_permissions;
            if (memberPermissions === '關閉') {
                alert('權限已關閉，請聯絡客服');
                // 如果權限是'關閉'，直接返回，不繼續執行以下的登入邏輯
                return { success: false, data: null, errorMsg: '權限已關閉，請聯絡客服' };
            }

            // 儲存 JWT
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("member_data", JSON.stringify(res.data.member.member_data));

            setMember({
                member_name: res.data.member.member_data.member_name || "使用者",
                member_permissions: res.data.member.member_data.member_permissions || "等級",
                member_avatar: res.data.member.member_data.member_avatar,
            });

            isAuthenticated.value = true;

            alert(res.data.message || "登入成功");
            resetMemberLogin();

            return { success: true, data: res.data };
        }
        catch (error) {
            let errorMsg = "發生錯誤，請稍後再試。";
            if (error.response) {
                // 請求成功發出且伺服器也回應了狀態碼，但狀態代碼超出了 2xx 的範圍
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                // 顯示錯誤信息
                if (error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
            } else if (error.request) {
                // 請求已經成功發起，但沒有收到回應
                // `error.request` 在瀏覽器中是 XMLHttpRequest 的實例，
                // 而在node.js中是 http.ClientRequest 的實例
                console.log(error.request);
                errorMsg = "請求未收到回應。";
            } else {
                // 發送請求時出了點問題
                console.log("Error", error.message);
            }
            errorLogin.value = { general: errorMsg };

            return { success: false, data: null, errorMsg }; // 返回失敗
        }
    }
    // 檢查 JWT
    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token');
        const storedMemberData = localStorage.getItem('member_data');
        if (token && storedMemberData) {
            try {
                const res = await axios.get('https://project01-back-end.onrender.com/members/checkJwt', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                isAuthenticated.value = res.data.valid;
                setMember(JSON.parse(storedMemberData)); // 恢復用戶數據
                console.log("驗證成功")
            } catch (error) {
                isAuthenticated.value = false;
                // console.error("JWT 驗證失敗", error);
            }
        } else {
            isAuthenticated.value = false;
        }
    };

    // 登出會員
    const logoutMemberAccount = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('member_data'); // 移除存储的用户数据
        isAuthenticated.value = false;
        console.log("登出成功");
    };

    // 取得單筆會員資料
    const member = ref({});
    const getOneMemberData = async (routePathId) => {
        try {
            const res = await axios.get(`https://project01-back-end.onrender.com/members/get/${routePathId}`);
            member.value = res.data;
            console.log(member.value);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    // 更新會員資料
    const tempImageUrl = ref(""); // 臨時存放上傳的頭像 URL
    const tempImageUrlName = ref(""); // 臨時存放上傳的頭像 檔名
    const generateRandomString = (length) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };
    const updateMemberData = async (routePathId) => {
        try {
            // 刪除舊頭像
            // 1. 確認是否有新頭像要上傳
            let avatarFilename =
                tempImageUrl.value || member.value.member_avatar;

            // 如果存在，表示要上傳新頭像
            if (tempImageUrl.value) {
                // 獲取當前的用戶數據以便刪除舊的圖檔
                const currentMemberData = await axios.get(`https://project01-back-end.onrender.com/members/get/${routePathId}`);
                const oldAvatarFilename = currentMemberData.data.member_avatar;
                if (oldAvatarFilename && oldAvatarFilename.trim() !== "") {
                    const publicIdToImg = oldAvatarFilename
                        .split("/")          // 先按 "/" 切割
                        .pop()                // 取得最後一段（即檔名和副檔名）
                        .replace(/\.[^.]+$/, ""); // 移除副檔名

                    console.log('publicIdToImg', publicIdToImg);

                    // 2. 刪除舊的圖檔（如果存在且不為空）
                    if (publicIdToImg && publicIdToImg.trim() !== "") {
                        try {
                            await axios.delete(`https://project01-back-end.onrender.com/uploadImg/deleteImageToMember/${publicIdToImg}`);
                            console.log("舊頭像已刪除:", oldAvatarFilename);
                        } catch (error) {
                            console.error("刪除舊頭像時發生錯誤:", error);
                        }
                    }
                }

                // 上傳頭像
                const base64Response = await fetch(tempImageUrl.value);
                const blob = await base64Response.blob(); // 将 Data URL 轉換為 Blob

                // 取得文件 .jpg / .png 檔類型
                const fileExtension = tempImageUrlName.value.split(".").pop();

                const randomFileName = `${generateRandomString(10)}.${fileExtension}`; // 10 為隨機字符長度

                const file = new File([blob], randomFileName, {
                    type: `image/${fileExtension}`,
                }); // 創建文件對象

                const formData = new FormData();
                formData.append("image", file);

                const uploadResponse = await axios.post(
                    "https://project01-back-end.onrender.com/uploadImg/uploadImgToMember",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                // 上传成功后，获取文件名
                avatarFilename = uploadResponse.data.data.imageUrl;
                console.log("頭像上傳成功:", avatarFilename);
            }

            // 3. 構造更新的數據
            const updatedData = {
                member_avatar: avatarFilename,
                member_name: member.value.member_name,
                member_email: member.value.member_email,
                member_phone: member.value.member_phone,
            };
            // 從 localStorage 中讀取現有的 memberData
            let existingData = JSON.parse(localStorage.getItem("memberData")) || {};

            // 將資料發送到後端進行更新
            const response = await axios.put(
                `https://project01-back-end.onrender.com/members/updateMember/${routePathId}`,
                updatedData
            );

            // 合併 existingData 和 updatedData
            const mergedData = { ...existingData, ...updatedData };
            // 將合併後的資料儲存回 localStorage
            localStorage.setItem("memberData", JSON.stringify(mergedData));
            // console.log("更新後的 memberData:", mergedData);

            console.log("資料已更新成功");
            console.log(member);
            alert(response.data.message);

        } catch (error) {
            console.error("更新資料時發生錯誤:", error);
        }
    }

    // 更新會員密碼
    const updateMemberPwdData = ref('');

    const updateMemberPwd = async (pathMemberId, member_password) => {
        try {
            // 確保 member_password 是普通的 JavaScript 變數
            const updateDataPwd = {
                member_password
            };

            const res = await axios.put(
                `https://project01-back-end.onrender.com/members/updateMemberPwd/${pathMemberId}`,
                updateDataPwd,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("密碼修改成功", res.data);

            alert("密碼修改成功");
        } catch (error) {
            console.error("失敗:", error);

            let errorMsg = "發生錯誤，請稍後再試。";
            if (error.response && error.response.data && error.response.data.message) {
                errorMsg = error.response.data.message;
            } else if (error.request) {
                errorMsg = "請求未收到回應。";
            }

            alert(errorMsg);
        }
    }


    return {
        // 新增會員
        newMemberData, resetNewMemberData, createMemberAccount,
        // 登入會員
        memberLogin, errorLogin, member_data, setMember, loginMemberAccount, checkAuthStatus, isAuthenticated, resetMemberLogin,
        // 登出會員
        logoutMemberAccount,
        // 取得單筆會員資料
        member, getOneMemberData,
        // 更新會員資料
        tempImageUrl, tempImageUrlName, updateMemberData,
        // 更新會員密碼
        updateMemberPwd,
    }
})