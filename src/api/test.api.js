import utils from '@/utils'
const { api } = utils

export default {
  async test() {
    const data = await api.get('/test/a')
    console.log(data)
  },
  async test1() {
    const data = await api.get('/test/a1')
    console.log(data)
  }
}
