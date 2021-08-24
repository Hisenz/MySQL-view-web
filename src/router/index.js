import { createRouter, createWebHashHistory } from 'vue-router'
import DataSourceInfo from "@/components/DataSourceInfo";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DataSourceInfo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
