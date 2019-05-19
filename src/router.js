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
          path: 'edit-tables',
          component: () => import('./views/tables/Edit.vue'),
          name: 'edit-tables'
        },
        {
          path: 'products',
          component: () => import('./views/products/Index.vue'),
          name: 'products'
        },
        {
          path: '/setting/tableList',
          name: 'setting-table-list',
          component: () => import('./views/setting/TableList.vue'),
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




  ]
})


router.beforeEach((to, from, next) => {
  next()
})

export default router