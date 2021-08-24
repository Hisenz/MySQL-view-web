import {createApp} from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import api from "@/request/api/index"


const app = createApp(App).use(router, VueAxios, axios)
app.config.globalProperties.$api = api
installElementPlus(app)
app.mount('#app')