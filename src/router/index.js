import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import utils from '@/utils'

// 重写push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

// 动态路由引入（文件命名格式为[fileName].[moduleName].js）
let routes = []
const routesObj = utils.importAll(require.context('./', false, /\.routes\.js$/))
Object.values(routesObj).forEach(list => {
  routes = routes.concat(list)
})
const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  store.dispatch('base/RESET_LOADING')
  next()
})

export default router
