import utils from '@/utils'
const { api } = utils

export default {
  async getBookInfo(bookId) {
    const data = await api.post('/api/detail/getBookInfo', { bookId })
    return data
  },
  async getChapterList(data) {
    const resData = await api.post('/api/detail/getChapterList', data)
    return resData
  },
  async getChapterInfo(bookId, chapterId) {
    const data = await api.post('/api/detail/getChapterInfo', {
      bookId,
      chapterId
    })
    return data
  }
}
