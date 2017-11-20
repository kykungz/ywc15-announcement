import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    result: []
  },
  getters: {
    loading: (state) => state.loading,
    result: (state) => state.result
  },
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_RESULT (state, result) {
      state.result = result
    }
  },
  actions: {
    setLoading (context, loading) {
      context.commit('SET_LOADING', loading)
    },
    setResult (context, result) {
      context.commit('SET_RESULT', result)
    }
  }
})
