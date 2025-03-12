import { type User } from '@/models/auth'
import Auth from '@/plugins/firebase/auth'
import { type Unsubscribe } from '@firebase/util'

import { defineStore } from 'pinia'

export interface PaginatedStoreState<I> {
  items: I[]
  loading: boolean
  page: number
  endReach: boolean
  selected: I | null
  subscription: Unsubscribe | null
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

const useRootStore = defineStore("root", {
  state: (): RootState => ({
    currentUser: null,
  }),
  actions: {
    setCurrentUser(payload: User) {
      this.currentUser = payload;
    },

    async fetchCurrentUser(): Promise<void> {
      const currentuser = await Auth.currentUserProfile();
      if (currentuser) this.setCurrentUser(currentuser);
    },
  },
  // modules: {
  //   conversations: conversationsStore,
  //   messages
  // }
});
// store.registerModule('conversations', conversationsStore)
export default useRootStore;