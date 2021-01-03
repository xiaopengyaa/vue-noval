const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()
const homeRouter = require('./router/home')
const detailRouter = require('./router/detail')
const user = require('./router/user')
const { dbs, secretKey, blackApiList } = require('./dbs/config')

// 连接数据库
mongoose.set('useCreateIndex', true)
mongoose.connect(dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('数据库连接成功')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 添加拦截器
app.use(function(req, res, next) {
  // 获取请求头中的Authorization认证字符
  const authorization = req.get('Authorization')
  jwt.verify(authorization, secretKey, function(err, data) {
    const username = err ? '' : data.username
    if (!req.body.username) {
      req.body.username = username
    }
  })
  if (!blackApiList.includes(req.path)) {
    // 排除不需要授权的路由
    next()
  } else {
    jwt.verify(authorization, secretKey, function(err, data) {
      if (err) {
        // 认证出错
        res.status(403).send('认证无效，请重新登录。')
      } else {
        req.body.username = data.username
        next()
      }
    })
  }
})

app.use(`/api/user`, user)
app.use(`/api/home`, homeRouter)
app.use('/api/detail', detailRouter)

// 错误处理
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('err:', err)
  res.status(500).send(err.message)
})

const server = app.listen(3000, () => {
  const port = server.address().port
  console.log(`server is listen on port ${port}!`)
})
