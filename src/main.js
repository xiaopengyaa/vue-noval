import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'

// 全局引入css
import '@assets/css/index.scss'

// 全局引入api
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
