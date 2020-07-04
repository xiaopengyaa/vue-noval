/*
 * @Author: xiaopengyaa
 * @Date: 2020-01-20 10:51:48
 * @Description: vue-cli 4.x配置文件
 */
const path = require('path')
const { externals, externalsUrl } = require('./config')
const isProduction = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  lintOnSave: !isProduction,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '~@assets/css/variable.scss';`
      }
    }
  },
  configureWebpack(config) {
    // 生产环境时使用外部扩展
    isProduction && (config.externals = externals)
  },
  chainWebpack(config) {
    // 修复HMR
    config.resolve.symlinks(true)
    // 设置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
    // 生产环境html引入cdn
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0] = {
          ...args[0],
          externalsUrl
        }
        return args
      })
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8090,
    open: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY_URL, // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // '^/api': '/' // 重写之后url为 http://xxx:xxx/xxx
          '^/api': '/api' // 重写之后url为 http://xxx:xxx/api/xxx
        }
      }
    }
  }
}
