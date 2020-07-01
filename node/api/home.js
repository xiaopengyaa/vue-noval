const cheerio = require('cheerio')
const { api } = require('../utils')

const homeApi = {
  bqg: {
    // 获取推荐页内容
    async getRecommend() {
      const url = 'https://www.biquge.com.cn/'
      const html = await api.get(url)
      const $ = cheerio.load(html)
      const recommendList = []
      const sortList = []
      // 获取推荐小说
      $('#hotcontent .l .item').each((index, elem) => {
        const $a = $(elem).find('dt a')
        const image = $(elem)
          .find('.image img')
          .attr('src')
        const author = $(elem)
          .find('dt span')
          .text()
        const desc = $(elem)
          .find('dd')
          .text()
        const name = $a.text()
        const bookId = $a.attr('href').split('/')[2]
        recommendList.push({
          image,
          author,
          desc,
          bookId,
          name
        })
      })
      // 获取分类小说
      $('.novelslist .content').each((index, elem) => {
        const $topA = $(elem).find('.top dt a')
        const type = $(elem)
          .find('h2')
          .text()
        const image = $(elem)
          .find('.top .image img')
          .attr('src')
        const name = $topA.text()
        const bookId = $topA.attr('href').split('/')[2]
        const desc = $(elem)
          .find('.top dd')
          .text()
        const list = []
        $(elem)
          .find('ul li')
          .each((index, cElem) => {
            list.push({
              name: $(cElem)
                .text()
                .split('/')[0],
              author: $(cElem)
                .text()
                .split('/')[1],
              bookId: $(cElem)
                .find('a')
                .attr('href')
                .split('/')[2]
            })
          })
        sortList.push({
          type,
          image,
          desc,
          bookId,
          name,
          list,
          author: ''
        })
      })
      return { recommendList, sortList }
    }
  }
}
// homeApi.bqg.getRecommend()
module.exports = homeApi
