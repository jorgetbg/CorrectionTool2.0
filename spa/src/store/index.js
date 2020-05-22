import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    showMessage(state, payload) {
      state.notificationContent = payload.content
      state.noticicationError = payload.error
    }
  },
  actions: {
  },
  modules: {
  }
})
