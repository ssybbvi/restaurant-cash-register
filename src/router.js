import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Login from './views/auth/Login.vue'


import {
  getUserInfo
} from "./webapi/tool"
Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/tables',
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'loyout',
      component: Layout,
      children: [{
        path: 'tables',
        component: () => import('./views/tables/Index.vue'),
        name: 'tables'
      }]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: Layout,
      children: [{
          path: '/setting/home',
          name: 'setting-home',
          component: () => import('./views/setting/Home.vue'),
        },
        {
          path: '/setting/table-list',
          name: 'setting-table-list',
          component: () => import('./views/setting/TableList.vue'),
        },
        {
          path: '/setting/table-area-list',
          name: 'setting-table-area-list',
          component: () => import('./views/setting/TableAreaList.vue'),
        },
        {
          path: '/setting/product-list',
          name: 'setting-product-list',
          component: () => import('./views/setting/ProductList.vue'),
        },
        {
          path: '/setting/product-type-list',
          name: 'setting-product-type-list',
          component: () => import('./views/setting/ProductTypeList.vue'),
        },
        {
          path: '/setting/user-list',
          name: 'setting-user-list',
          component: () => import('./views/setting/UserList.vue'),
        }
      ]
    },
    {
      path: '/orders',
      component: Layout,
      name: '桌台',
      iconCls: '',
      children: [{
        path: '/orders/shoppingcart',
        component: () => import('@/views/orders/ShoppingCart.vue'),
        name: 'shoppingcart'
      }, {
        path: '/orders/list',
        component: () => import('@/views/orders/List.vue'),
        name: 'order-list'
      }]
    },
    {
      path: '/scheduling',
      name: 'scheduling',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/scheduling/Index.vue'),
        name: 'scheduling-index'
      }]
    },
  ]
})


router.beforeEach((to, from, next) => {
  if (to.name == "login") {
    next()
    return
  }

  let userInfo = getUserInfo()
  if (!userInfo) {
    next({
      name: 'login'
    })
    return
  }
  next()
})

export default router