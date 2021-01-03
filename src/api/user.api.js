import utils from '@/utils'
const { api } = utils

export default {
  async login(user) {
    const data = await api.post('/api/user/login', user)
    return data
  },
  async register(user) {
    const data = await api.post('/api/user/register', user)
    return data
  },
  async getBookshelf() {
    const data = await api.get('/api/user/getBookshelf')
    return data
  },
  //data传入对象，4个属性，bookId,collection,readAt,time
  async setBookshelf(data) {
    const res = await api.post('/api/user/setBookCollection', data)
    return res
  },
  async getUser() {
    const res = await api.get('/api/user/getUser')
    return res
  }
}
