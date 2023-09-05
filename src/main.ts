import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VConsole from 'vconsole';
const vConsole = new VConsole();
console.log("启动")

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
