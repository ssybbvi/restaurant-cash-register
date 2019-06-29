import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import mixin from '@/mixin'
import filters from '@/filter'
import enumerate from '@/filter/enumerate'
import axios from '@/webapi'

import {
  sync
} from 'vuex-router-sync'
sync(store, router)

Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))
Vue.mixin(mixin)
Vue.config.productionTip = false

Vue.prototype.$Enumerate = enumerate
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')