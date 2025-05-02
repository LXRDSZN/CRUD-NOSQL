import { createRouter, createWebHistory } from 'vue-router'
import LoginViews from '@/views/Login/LoginViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginViews
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/DashboardViews.vue') 
    }
  ]
})

export default router
