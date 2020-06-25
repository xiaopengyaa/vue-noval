import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils'

Vue.use(Vuex)

// 动态store引入（文件命名格式为[fileName].[moduleName].js）
const modules = {}
const storeObj = utils.importAll(require.context('./', false, /\.store\.js$/))
const nameReg = /\.\/(.*)\.store\.js$/
Object.entries(storeObj).forEach(item => {
  const [name, value] = item
  const matchInfo = nameReg.exec(name)
  if (matchInfo) {
    const moduleName = matchInfo[1] || 'default'
    modules[moduleName] = value
  }
})

export default new Vuex.Store({
  modules
})
