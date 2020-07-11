import api from './axios'
import common from './common'
import storage from './storage'

export default {
  api,
  ...storage,
  ...common
}
