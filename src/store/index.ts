import Auth from '@/plugins/firebase/auth'
import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.currentUser = payload
    }
  },
  actions: {
    async fetchCurrentUser({ commit }): Promise<void> {
      commit('setCurrentUser', await Auth.currentUser())
    }
  },
  modules: {}
})
