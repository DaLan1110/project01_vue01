import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap'
// import './assets/myall.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 的 CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 引入 Bootstrap 的 JS

import { FontAwesomeIcon } from './assets/awesome/awesome.js'

const app = createApp(App)

// 設定 icon
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
