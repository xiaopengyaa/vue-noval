import utils from '@/utils'
const { api } = utils

export default {
  async getRecommend() {
    const data = await api.get('/api/home/getRecommend')
    return data
  },
  async getSortType() {
    const data = await api.get('/api/home/getSortType')
    return data
  },
  async getTypeList(type) {
    const data = await api.post('/api/home/getTypeList', { type })
    return data
  },
  async search(data) {
    const resData = await api.post('/api/home/search', data)
    return resData
  }
}
