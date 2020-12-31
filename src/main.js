import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import utils from '@/utils'
import Vant from 'vant'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import './utils/rem.js'

// 全局引入css
import '@assets/css/index.scss'

// 全局引入vant
Vue.use(Vant)

// 全局引入dayjs
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
Vue.prototype.$dayjs = dayjs

// 全局引入api,utils
Vue.prototype.$api = api
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
