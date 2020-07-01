import utils from '@/utils'
const { api } = utils

export default {
  async getRecommend() {
    const data = await api.get('/api/home/getRecommend')
    return data
  }
}
