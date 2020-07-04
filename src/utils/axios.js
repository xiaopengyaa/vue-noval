/*
 * @Author: xiaopengyaa
 * @Date: 2020-03-02 11:47:04
 * @Description: axios封装
 */
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_URL, // 数据接口域名统一配置
  timeout: 1000 * 10 // 默认超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    store.dispatch('base/SET_LOADING', true)
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true
    })
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    store.dispatch('base/SET_LOADING', false)
    if (store.state.base.loading <= 0) {
      Toast.clear()
    }
    if (response.status != 200) {
      Toast.fail('请求失败')
    }
    return response
  },
  err => {
    const data = err.response.data
    store.dispatch('base/SET_LOADING', false)
    if (store.state.base.loading <= 0) {
      Toast.clear()
    }
    Toast.fail('请求失败')
    return Promise.reject(data || err)
  }
)

// 封装get、post方法
const api = {
  async get(url, data, config = {}) {
    try {
      const res = await service.get(url, {
        params: data,
        ...config
      })
      return Promise.resolve(res.data)
    } catch (err) {
      console.error(err)
    }
  },
  async post(url, data, config = {}) {
    try {
      const res = await service.post(url, data, config)
      return Promise.resolve(res.data)
    } catch (err) {
      console.error(err)
    }
  }
}

export default api
