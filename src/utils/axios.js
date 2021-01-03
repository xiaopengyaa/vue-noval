/*
 * @Author: xiaopengyaa
 * @Date: 2020-03-02 11:47:04
 * @Description: axios封装
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
import storage from './storage'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 数据接口域名统一配置
  timeout: 1000 * 20 // 默认超时时间20s
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 注入token
    const token = storage.localStorage.get('noval_token') || ''
    if (token) {
      config.headers['Authorization'] = token
    }
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
    // 设置200ms判断延迟，防止排队请求
    setTimeout(() => {
      if (store.state.base.loading <= 0) {
        Toast.clear()
      }
      if (response.status != 200) {
        Toast.fail('请求失败')
      }
      if (response.data.code && response.data.code !== 200) {
        Toast.fail(response.data.message)
      }
    }, 200)
    return response
  },
  err => {
    const data = err.response && err.response.data
    store.dispatch('base/SET_LOADING', false)
    if (store.state.base.loading <= 0) {
      Toast.clear()
    }
    if (err.response && err.response.status === 403) {
      router.push('/login')
    } else {
      Toast.fail('请求失败')
    }
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
      return Promise.reject(err)
    }
  },
  async post(url, data, config = {}) {
    try {
      const res = await service.post(url, data, config)
      return Promise.resolve(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default api
