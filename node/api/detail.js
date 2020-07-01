const cheerio = require('cheerio')
const { api } = require('../utils')

const homeApi = {
  bqg: {
    // 获取书面内容
    async getBookInfo(bookId) {
      const url = `https://m.biquge.com.cn/book/${bookId}/`
      const html = await api.get(url)
      const $ = cheerio.load(html)
      const image = $('.block_img2 img').attr('src')
      const author = $('.block_txt2 p')
        .eq(2)
        .text()
        .replace('作者：', '')
      const name = $('.block_txt2 h2 a').text()
      const type = $('.block_txt2 a')
        .eq(2)
        .text()
      const status = $('.block_txt2 p')
        .eq(4)
        .text()
        .replace('状态：', '')
      const updateTime = $('.block_txt2 p')
        .eq(5)
        .text()
        .replace('更新：', '')
      const newestChapterName = $('.block_txt2 a')
        .eq(3)
        .text()
      const newestChapterId = $('.block_txt2 a')
        .eq(3)
        .attr('href')
        .split('/')
        .pop()
        .replace('.html', '')
      const desc = $('.intro_info').text()
      const chapterId = $('.ablum_read .margin_right a')
        .attr('href')
        .split('/')
        .pop()
        .replace('.html', '')
      // 获取最新章节
      const recentChapterList = []
      $('.chapter')
        .eq(0)
        .find('li a')
        .each((index, elem) => {
          const chapterId = $(elem)
            .attr('href')
            .split('/')
            .pop()
            .replace('.html', '')
          const chapterName = $(elem).text()
          recentChapterList.push({
            chapterId,
            chapterName
          })
        })
      return {
        bookId,
        name,
        author,
        image,
        type,
        status,
        updateTime,
        newestChapterName,
        newestChapterId,
        desc,
        chapterId,
        recentChapterList
      }
    },
    // 获取章节列表
    async getChapterList(bookId) {
      const url = `https://biquge.com.cn/book/${bookId}/`
      const html = await api.get(url)
      const $ = cheerio.load(html)
      const list = []
      $('#list dd a').each((index, elem) => {
        const chapterId = $(elem)
          .attr('href')
          .split('/')
          .pop()
          .replace('.html', '')
        const chapterName = $(elem).text()
        list.push({
          chapterId,
          chapterName
        })
      })
      return list
    },
    // 获取小说内容
    async getChapterInfo(bookId, chapterId) {
      const url = `https://biquge.com.cn/book/${bookId}/${chapterId}.html`
      const html = await api.get(url)
      const $ = cheerio.load(html, { decodeEntities: false })
      const prevChapterId = $('.bookname .bottem1 a')
        .eq(0)
        .attr('href')
        .split('/')
        .pop()
        .replace('.html', '')
      const nextChapterId = $('.bookname .bottem1 a')
        .eq(2)
        .attr('href')
        .split('/')
        .pop()
        .replace('.html', '')
      const title = $('.bookname h1').text()
      const content = $('#content').html()
      return {
        title,
        content,
        prevChapterId,
        nextChapterId
      }
    }
  }
}
// homeApi.bqg.getChapterInfo('32883', '196852')
module.exports = homeApi
