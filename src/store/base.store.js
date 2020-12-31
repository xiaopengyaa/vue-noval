export default {
  namespaced: true,
  state: {
    loading: 0,
    baseRouteName: 'recommend',
    login: false,
    viewMode: 'day',
    dayBgColor: '#c4b395'
  },
  mutations: {
    SET_LOADING(state, status) {
      status ? ++state.loading : --state.loading
    },
    RESET_LOADING(state) {
      state.loading = 0
    },
    SET_BASE_ROUTE_NAME(state, name) {
      state.baseRouteName = name
    },
    SET_LOGIN(state, status) {
      state.login = status
    },
    SET_VIEW_MODE(state, mode) {
      state.viewMode = mode
    },
    SET_DAYBGCOLOR(state, color) {
      state.dayBgColor = color
    }
  },
  actions: {
    SET_LOADING({ commit }, status) {
      commit('SET_LOADING', status)
    },
    RESET_LOADING({ commit }) {
      commit('RESET_LOADING')
    }
  }
}
