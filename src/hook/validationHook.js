import { ref, watch } from 'vue';

const EMAIL_REGEX = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.com$/;
const LOWER_CASE_REGEX = /(.*[a-z].*)/;
const UPPER_CASE_REGEX = /(.*[A-Z].*)/;
const DIGITS_REGEX = /(.*\d.*)/;
const SYMBOLS_REGEX = /[-+_!/\\@#$%^&*.,?()]/;
const PHONE_REGEX = /^(09\d{8}|0[1-8]\d{7})$/;
const RANGE_1_100_REGEX = /^(100|[1-9][0-9]?)$/;

const validationRules = ref({
    user_account: {
        rules: [
            value => value.length > 3 || '使用者帳號長度必須至少為4個字符'
        ]
    },
    user_password: {
        rules: [
            value => value.length > 4 || '密碼長度必須至少為5個字符',
            value => LOWER_CASE_REGEX.test(value) || '密碼應至少包含一個小寫字母',
            value => UPPER_CASE_REGEX.test(value) || '密碼應至少包含一個大寫字母',
            value => DIGITS_REGEX.test(value) || '密碼應至少包含一為數字',
            value => SYMBOLS_REGEX.test(value) || '密碼應至少包含一個符號'
        ]
    },
    confirm_password: {
        rules: [
            value => value === validationRules.user_password || '兩次密碼不一致'
        ]
    },
    user_email: {
        rules: [
            value => EMAIL_REGEX.test(value) || '請輸入有效的電子郵件地址',
        ]
    },
    username: {
        rules: [
            value => value.length > 2 || '使用者名稱長度必須至少為3個字符'
        ]
    },
    member_account: {
        rules: [
            value => value.length > 3 || '會員帳號長度必須至少為4個字符'
        ]
    },
    member_name: {
        rules: [
            value => value.length > 2 || '使用者名稱長度必須至少為3個字符'
        ]
    },
    member_password: {
        rules: [
            value => value.length > 4 || '密碼長度必須至少為5個字符',
            value => LOWER_CASE_REGEX.test(value) || '密碼應至少包含一個小寫字母',
            value => UPPER_CASE_REGEX.test(value) || '密碼應至少包含一個大寫字母',
            value => DIGITS_REGEX.test(value) || '密碼應至少包含一為數字',
            value => SYMBOLS_REGEX.test(value) || '密碼應至少包含一個符號'
        ]
    },
    confirm_member_password: {
        rules: [
            value => value === validationRules.member_password || '兩次密碼不一致'
        ]
    },
    member_email: {
        rules: [
            value => EMAIL_REGEX.test(value) || '請輸入有效的電子郵件地址',
        ]
    },
    member_phone: {
        rules: [
            value => PHONE_REGEX.test(value) || '請輸入有效的電話號碼',
        ]
    },
    product_name: {
        rules: [
            value => value.length > 1 || '產品名稱長度必須至少為2個字符'
        ]
    },
    product_price: {
        rules: [
            value => RANGE_1_100_REGEX.test(value) || '請輸入1-100之間的產品價格',
        ]
    },
    product_img: {
        rules: [
            value => !!value || '請輸入有效的產品圖'
        ]
    },
    product_sweetness: {
        rules: [
            value => Array.isArray(value) && value.length > 0 || '請至少選擇一個甜度選項'
        ]
    },
    product_ice: {
        rules: [
            value => Array.isArray(value) && value.length > 0 || '請至少選擇一個溫度選項'
        ]
    },
    product_exhibit: {
        rules: [
            value => !!value || '請選擇的產品上/下架'
        ]
    },
    product_classify: {
        rules: [
            value => !!value || '請選擇的產品類別'
        ]
    },
    product_address: {
        rules: [
            value => Array.isArray(value) && value.length > 0 || '請至少選擇一個販賣地址選項'
        ]
    },
    join_us_name: {
        rules: [
            value => value.length > 2 || '加盟者名稱長度必須至少為3個字符'
        ]
    },
    join_us_phone: {
        rules: [
            value => PHONE_REGEX.test(value) || '請輸入有效的電話號碼',
        ]
    },
    join_us_email: {
        rules: [
            value => EMAIL_REGEX.test(value) || '請輸入有效的電子郵件地址',
        ]
    },
    join_us_address: {
        rules: [
            value => /市|縣/.test(value) || '地址必須包含至少一個"市"或"縣"',
            value => value.length > 8 || '地址長度必須至少為8個字以上',
        ]
    },
})

const validationField = (inputText, value) => {
    return validationRules.value[inputText].rules
        .filter(rule => {
            const isValid = rule(value);

            if (isValid !== true) {
                return isValid;
            }
        })
        .map(rule => rule(value));
}

const validationForm = (form) => {
    const formErrors = ref({});
    let formIsValid = true;

    for (let property in form) {
        const errors = validationField(property, form[property]);

        if (errors.length) {
            formIsValid = false;
        }

        formErrors[property] = errors;
    }
    formErrors.formIsValid = formIsValid;

    return formErrors
}

const validationFormPwd = (form, user_password) => {
    const formErrors = ref({});
    let formIsValid = true;

    validationRules.value.confirm_password.rules[0] =
        value => value === user_password || '兩次密碼不一致';

    for (let property in form) {
        const errors = validationField(property, form[property], user_password);

        if (errors.length) {
            formIsValid = false;
        }

        formErrors[property] = errors;
    }
    formErrors.formIsValid = formIsValid;

    return formErrors
}

const validationFormMemberPwd = (form, member_password) => {
    const formErrors = ref({});
    let formIsValid = true;

    validationRules.value.confirm_member_password.rules[0] =
        value => value === member_password || '兩次密碼不一致';

    for (let property in form) {
        const errors = validationField(property, form[property], member_password);

        if (errors.length) {
            formIsValid = false;
        }

        formErrors[property] = errors;
    }
    formErrors.formIsValid = formIsValid;

    return formErrors
}

export { validationField, validationForm, validationFormPwd, validationFormMemberPwd };