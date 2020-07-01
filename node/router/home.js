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

module.exports = router
