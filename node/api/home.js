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
    },
    // 分类类型
    async getSortType() {
      const url = 'https://m.biquge.com.cn/sort.html'
      const html = await api.get(url)
      const $ = cheerio.load(html)
      const typeList = []
      // 获取推荐小说
      $('.content li a').each((index, elem) => {
        const type = $(elem)
          .attr('href')
          .replace(/\//g, '')
        const typeName = $(elem).text()
        typeList.push({
          type,
          typeName
        })
      })
      return { typeList }
    },
    // 获取类型小说
    async getTypeList(type) {
      const url = `https://m.biquge.com.cn/${type}/`
      const html = await api.get(url)
      const $ = cheerio.load(html)
      const list = []
      // 获取推荐小说
      $('.bookbox').each((index, elem) => {
        const image = $(elem)
          .find('.bookimg img')
          .attr('src')
        const $bookinfo = $(elem).find('.bookinfo')
        const name = $bookinfo.find('.bookname a').text()
        const bookId = $bookinfo
          .find('.bookname a')
          .attr('href')
          .split('/')[2]
        const author = $bookinfo
          .find('.author')
          .text()
          .replace('作者：', '')
        const desc = $bookinfo
          .find('.intro_line')
          .text()
          .replace('简介：', '')
        list.push({
          image,
          author,
          desc,
          bookId,
          name
        })
      })
      return { list }
    },
    // 小说搜索
    async search(keyword) {
      const url = 'https://www.biquge.com.cn/search.php'
      const html = await api.get(url, { q: keyword })
      const $ = cheerio.load(html)
      const listMap = {}
      $('.result-list .result-item').each((index, elem) => {
        const image = $(elem)
          .find('.result-game-item-pic img')
          .attr('src')
        const bookId = image.split('/').reverse()[1]
        // 数据去重
        if (bookId && listMap[bookId]) return false
        const name = $(elem)
          .find('.result-game-item-title a')
          .attr('title')
        const desc = $(elem)
          .find('.result-game-item-desc')
          .text()
        const $span = $(elem).find('.result-game-item-info span')
        const author = $($span[1]).text()
        const type = $($span[3]).text()
        const updateTime = $($span[5]).text()
        listMap[bookId] = {
          bookId,
          name,
          image,
          desc,
          author,
          type,
          updateTime
        }
      })
      return Object.values(listMap)
    }
  }
}
// homeApi.bqg.getTypeList('xuanhuan')
module.exports = homeApi
