import { createApp } from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import 'vant/lib/index.css';
import Vant from 'vant';
import * as VueRouter from "vue-router";
import routes from './config/route'
import 'vant/lib/index.css';
import '../global.css'


// history模式实现
const router = VueRouter.createRouter({
    history:VueRouter.createWebHistory(),
    routes:routes
})



createApp(App).use(Vant).use(router).mount('#app')
