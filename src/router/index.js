import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '產品頁面',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'coupons',
        name: '優惠卷列表',
        component: () => import('../views/backend/Coupons.vue')
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'customer_orders',
        name: '模擬下單系統',
        component: () => import('../views/backend/CustomerOrders.vue')
      },
      {
        path: 'customer_checkout',
        name: '用戶訂單列表',
        component: () => import('../views/backend/CustomerCheckOut.vue')
      },
      {
        path: 'customer_payorder/:id',
        name: '用戶訂單結帳',
        component: () => import('../views/backend/CustomerPayOrder.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
