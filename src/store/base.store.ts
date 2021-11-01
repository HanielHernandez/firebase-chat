import { FirebaseApiService } from '@/api/firebaseApi'
import { QueryConstraint } from '@firebase/firestore'
import { async, Unsubscribe } from '@firebase/util'
import { createNamespacedHelpers, createStore, Store } from 'vuex'
import { CommitFunction, PaginatedStoreState } from '.'
import { FETCH_ITEMS_ACTIONS, FIND_ITEM_ACTION } from './actions'
import {
  SET_ITEMS_MUTATION,
  SET_LOADING_MUTATION,
  SET_SELECTED_MUTATION
} from './mutations'

export type onChagesCallback = (items: any[]) => void
export type onChangesFunction = (
  id: string,
  callback: onChagesCallback
) => Unsubscribe

export const createPaginatedStore = <T>(service: FirebaseApiService<any>) => {
  const state: PaginatedStoreState<T> = {
    items: [],
    selected: null,
    loading: false
  }

  const mutations = {
    [SET_LOADING_MUTATION]: (
      state: PaginatedStoreState<T>,
      payload: boolean
    ) => {
      state.loading = payload
    },
    [SET_ITEMS_MUTATION]: (state: PaginatedStoreState<T>, payload: T[]) => {
      state.items = payload
    },
    [SET_SELECTED_MUTATION]: (state: PaginatedStoreState<T>, payload: T) => {
      state.selected = payload
    }
  }

  const actions = {
    [FETCH_ITEMS_ACTIONS]: async (
      {
        commit
      }: {
        commit: CommitFunction
      },
      payload: QueryConstraint[]
    ): Promise<Unsubscribe> => {
      commit(SET_LOADING_MUTATION, true)
      return service.onChanges(payload, (items: T[]) => {
        commit(SET_LOADING_MUTATION, false)
        commit(SET_ITEMS_MUTATION, items)
      })
    },
    [FIND_ITEM_ACTION]: async (
      {
        commit
      }: {
        commit: CommitFunction
      },
      id: string
    ) => {
      const item = await service.find(id)
      commit(SET_SELECTED_MUTATION, item)
      return item
    }
  }

  return {
    namespaced: true,
    state,
    mutations,
    actions
  }
}
