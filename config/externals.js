// 使用外部扩展的依赖
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  axios: 'axios',
  'vue-router': 'VueRouter'
}
const externalsUrl = {
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js'
  ],
  css: []
}

module.exports = {
  externals,
  externalsUrl
}
