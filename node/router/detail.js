const express = require('express')
const router = express.Router()
const api = require('../api/detail')
const { asyncHandler } = require('../utils')

const reqType = 'bqg'

// 书面内容
router.post(
  '/getBookInfo',
  asyncHandler(async (req, res) => {
    const data = await api[reqType].getBookInfo(req.body.bookId)
    res.send(data)
  })
)

// 章节列表
router.post(
  '/getChapterList',
  asyncHandler(async (req, res) => {
    const data = await api[reqType].getChapterList(req.body.bookId)
    res.send(data)
  })
)

// 小说内容
router.post(
  '/getChapterInfo',
  asyncHandler(async (req, res) => {
    const { bookId, chapterId } = req.body
    const data = await api[reqType].getChapterInfo(bookId, chapterId)
    res.send(data)
  })
)

module.exports = router
