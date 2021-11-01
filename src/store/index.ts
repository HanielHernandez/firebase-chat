import Auth from '@/plugins/firebase/auth'
import { createStore } from 'vuex'
import conversationsStore from './conversations.store'
import messages from './messages.store'

export interface PaginatedStoreState<I> {
  items: I[] | null
  loading: boolean
  selected: I | null
}

export type CommitFunction = (key: string, payload: unknown) => void
export type SetterFunction = (
  state: { [key: string]: unknown },
  payload: unknown
) => void
export const setterFunction = (key: string): SetterFunction => {
  return (state: { [key: string]: unknown }, payload: unknown): void => {
    console.log('state', state)
    state[key] = payload
  }
}

const store = createStore({
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
      commit('setCurrentUser', await Auth.currentUserProfile())
    }
  },
  modules: {
    conversations: conversationsStore,
    messages
  }
})
// store.registerModule('conversations', conversationsStore)
export default store
