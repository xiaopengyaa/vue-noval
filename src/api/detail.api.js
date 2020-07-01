import utils from '@/utils'
const { api } = utils

export default {
  async getBookInfo(bookId) {
    const data = await api.post('/api/detail/getBookInfo', { bookId })
    return data
  },
  async getChapterList(bookId) {
    const data = await api.post('/api/detail/getChapterList', { bookId })
    return data
  },
  async getChapterInfo(bookId, chapterId) {
    const data = await api.post('/api/detail/getChapterInfo', {
      bookId,
      chapterId
    })
    return data
  }
}
