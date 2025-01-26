import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHeadWaveStore = defineStore('headwave', () => {
    const headwave = ref('');

    const setHeadWavePath = (path) => {
        // 使用正則表達式來檢查路由是否以 `/menu` 開頭
        if (path.startsWith('/menu')) {
            headwave.value = '#FFD9EC'; // 設定所有 `/menu` 和其子路由的顏色
        } else if (path.startsWith('/personal')) {
            headwave.value = '#FFC78E'; // 設定 `/orderList` 和其子路由的顏色
        } else {
            switch (path) {
                case '/':
                    headwave.value = '#F1E1FF';
                    break;
                case '/about':
                    headwave.value = '#DAB1D5';
                    break;
                case '/advantage':
                    headwave.value = '#FFDCB9';
                    break;
                case '/branch':
                    headwave.value = '#d9d9d9';
                    break;
                case '/join-us':
                    headwave.value = '#C4E1E1';
                    break;
                case '/shoppingCart':
                    headwave.value = '#FFC78E';
                    break;
                default:
                    headwave.value = 'Default Value';
                    break;
            }
        }
        console.log('HeadWave:', headwave.value);
    };

    return {
        headwave,
        setHeadWavePath,
    };
});