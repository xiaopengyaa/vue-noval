const express = require('express')
const app = express()
const homeRouter = require('./node/router/home')
const detailRouter = require('./node/router/detail')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/home', homeRouter)
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
