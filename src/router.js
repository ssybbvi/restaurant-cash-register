import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Home from './views/Home.vue'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/',
      name: 'loyout',
      component: Layout,
      children: [{
          path: 'tables',
          component: () => import('./views/tables/Index.vue'),
          name: 'tables'
        },
        {
          path: 'products',
          component: () => import('./views/products/Index.vue'),
          name: 'products'
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
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
          path: '/setting/product-list',
          name: 'setting-product-list',
          component: () => import('./views/setting/ProductList.vue'),
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
      }, ]
    }




  ]
})


router.beforeEach((to, from, next) => {
  next()
})

export default router