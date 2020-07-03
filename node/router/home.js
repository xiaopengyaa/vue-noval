const express = require('express')
const router = express.Router()
const api = require('../api/home')
const { asyncHandler } = require('../utils')

const reqType = 'bqg'

// 推荐小说
router.get(
  '/getRecommend',
  asyncHandler(async (req, res) => {
    const data = await api[reqType].getRecommend()
    res.send(data)
  })
)

// 小说搜索
router.post(
  '/search',
  asyncHandler(async (req, res) => {
    const { keyword = '' } = req.body
    const data = await api[reqType].search(keyword)
    res.send(data)
  })
)

module.exports = router
