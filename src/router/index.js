import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import pcRoutes from './modules/pc-routes'
import mobileRoutes from './modules/mobile-routes'

// 动态添加路由
const routes = isMobileTerminal.value ? mobileRoutes : pcRoutes

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
