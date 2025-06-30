import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/incomes',
      name: 'incomes',
      component: () => import('../views/Incomes.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue'),
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('../views/Sales.vue'),
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: () => import('../views/Stocks.vue'),
    },
  ],
})

export default router
