import utils from '@/utils'

// 动态api引入（文件命名格式为[fileName].[moduleName].js）
const api = {}
const apiObj = utils.importAll(require.context('./', false, /\.api\.js$/))
const nameReg = /\.\/(.*)\.api\.js$/
Object.entries(apiObj).forEach(item => {
  const [name, value] = item
  const matchInfo = nameReg.exec(name)
  if (matchInfo) {
    const moduleName = matchInfo[1] || 'default'
    api[moduleName] = value
  }
})

export default api
