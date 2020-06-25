export default {
  namespaced: true,
  state: {
    loading: 0
  },
  mutations: {
    SET_LOADING(state, status) {
      status ? ++state.loading : --state.loading
    },
    RESET_LOADING(state) {
      state.loading = 0
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
