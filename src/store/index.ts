import { type User } from '@/models/auth'
import Auth from '@/plugins/firebase/auth'
import { Unsubscribe } from '@firebase/util'
import { createStore } from 'vuex'
import conversationsStore from './conversations.store'
import messages from './messages.store'

export interface PaginatedStoreState<I> {
  items: I[]
  loading: boolean
  page: number
  endReach: boolean
  selected: I | null
  subcription: Unsubscribe | null
}

export type CommitFunction = (key: string, payload: unknown) => void
export type ActionFunction = (key: string, payload: unknown) => Promise<unknown>

export type SetterFunction = (
  state: { [key: string]: unknown },
  payload: unknown
) => void
export const setterFunction = (key: string): SetterFunction => {
  return (state: { [key: string]: unknown }, payload: unknown): void => {
    // // console.log('state', state)
    state[key] = payload
  }
}
export type RootState = {
  currentUser: User | null
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
