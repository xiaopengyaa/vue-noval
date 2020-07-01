const axios = require('axios')

// 封装api
const api = {
  async get(url, data, config = {}) {
    try {
      console.log(`url（${url}）请求中...`)
      const res = await axios.get(url, {
        params: data,
        ...config
      })
      console.log(`url（${url}）:`, res.statusText || res.status)
      return new Promise(resolve => {
        resolve(res.data)
      })
    } catch (err) {
      throw new Error(err)
    }
  },
  async post(url, data, config) {
    try {
      console.log(`url（${url}）请求中...`)
      const res = await axios.post(url, data, config)
      console.log(`url（${url}）:`, res.statusText || res.status)
      return new Promise(resolve => {
        resolve(res.data)
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = api
