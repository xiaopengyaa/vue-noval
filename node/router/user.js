const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../dbs/models/user')
const Collection = require('../dbs/models/collection')
const { asyncHandler } = require('../utils')
const { secretKey } = require('../dbs/config')
const api = require('../api/detail')

const REQ_TYPE = 'bqg' // 笔趣阁

// 获取用户
router.get(
  '/getUser',
  asyncHandler(async (req, res) => {
    const { username } = req.body
    res.send({
      user: username || ''
    })
  })
)

// 注册
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body
    // 是否合法的参数
    if (!username || !password) {
      res.send({
        code: -1,
        mmessage: '用户名、密码不能为空'
      })
      return
    }
    // 判断用户名是否被注册
    const user = await User.find({
      username
    })
    if (user.length) {
      res.send({
        code: -1,
        mmessage: '用户已被注册'
      })
      return
    }
    // 存入用户数据
    const newUser = await User.create({
      username,
      password
    })
    if (newUser) {
      res.send({
        code: 200,
        mmessage: '注册成功',
        data: {
          username: newUser.username
        }
      })
    } else {
      res.send({
        code: -1,
        mmessage: '注册失败'
      })
    }
  })
)

// 登陆
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body
    // 是否合法的参数
    if (!username || !password) {
      res.send({
        code: -1,
        message: '用户名、密码不能为空'
      })
      return
    }
    const result = await User.findOne({
      username
    })
    if (result) {
      if (result.password === password) {
        // jwt生成token
        const content = { username } // 要生成token的信息
        const token = jwt.sign(content, secretKey, {
          expiresIn: '1d' // 一天过期
        })
        res.send({
          code: 200,
          message: '登陆成功',
          data: {
            token,
            username
          }
        })
        return
      } else {
        res.send({
          code: -1,
          message: '密码错误'
        })
        return
      }
    } else {
      res.send({
        code: -1,
        message: '用户不存在'
      })
      return
    }
  })
)

// 获取书架内容
router.get(
  '/getBookshelf',
  asyncHandler(async (req, res) => {
    const { username } = req.body
    const list =
      (await Collection.find({
        username
      })) || []
    const promiseArr = []
    const newList = []
    list.forEach(item => {
      promiseArr.push(api[REQ_TYPE].getBookInfo(item.bookId, username))
    })
    const result = await Promise.all(promiseArr)
    result.forEach((item, index) => {
      const { readAt, time } = list[index]
      newList.push({
        ...item,
        readAt,
        time
      })
    })
    res.send(newList)
  })
)

// 书架收藏：0为取消收藏|1为收藏
router.post(
  '/setBookCollection',
  asyncHandler(async (req, res) => {
    const { username, bookId, collection, readAt, time } = req.body
    if (collection === 1) {
      const result = await Collection.findOne({
        username,
        bookId
      })
      const data = {
        username,
        bookId,
        readAt,
        time
      }
      if (result) {
        await Collection.findByIdAndUpdate(result._id, data)
      } else {
        await Collection.create(data)
      }
      res.send({
        code: 200,
        message: '收藏成功'
      })
    } else {
      const result = await Collection.deleteOne({
        username,
        bookId
      })
      if (result) {
        res.send({
          code: 200,
          message: '取消收藏成功'
        })
      }
    }
  })
)

module.exports = router
