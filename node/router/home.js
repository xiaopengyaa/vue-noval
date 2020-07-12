const express = require('express')
const router = express.Router()
const api = require('../api/home')
const { asyncHandler } = require('../utils')

const REQ_TYPE = 'bqg' // 笔趣阁

// 推荐小说
router.get(
  '/getRecommend',
  asyncHandler(async (req, res) => {
    const data = await api[REQ_TYPE].getRecommend()
    res.send(data)
  })
)

// 分类类型
router.get(
  '/getSortType',
  asyncHandler(async (req, res) => {
    const data = await api[REQ_TYPE].getSortType()
    res.send(data)
  })
)

// 获取类型小说
router.post(
  '/getTypeList',
  asyncHandler(async (req, res) => {
    const { type } = req.body
    const data = await api[REQ_TYPE].getTypeList(type)
    res.send(data)
  })
)

// 小说搜索
router.post(
  '/search',
  asyncHandler(async (req, res) => {
    const { keyword = '', page = 1 } = req.body
    const data = await api[REQ_TYPE].search(keyword, page)
    res.send(data)
  })
)

module.exports = router
