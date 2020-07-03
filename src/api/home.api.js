import utils from '@/utils'
const { api } = utils

export default {
  async getRecommend() {
    const data = await api.get('/api/home/getRecommend')
    return data
  },
  async search(keyword) {
    const data = await api.post('/api/home/search', { keyword })
    return data
  }
}
