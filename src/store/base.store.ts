import { FirebaseApiService } from '@/api/firebaseApi'
import { ItemWithId } from '@/models/message'
import {
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@firebase/firestore'
import { async, Unsubscribe } from '@firebase/util'
import {
  ActionContext,
  createNamespacedHelpers,
  createStore,
  Store
} from 'vuex'
import { CommitFunction, PaginatedStoreState, RootState } from '.'
import {
  FETCH_ITEMS_ACTIONS,
  FIND_ITEM_ACTION,
  LISTEN_CHANGES_ACTION,
  LOAD_MORE_ACTION
} from './actions'
import { GET_ITEM_BY_ID_GETTER, GET_ITEM_INDEX_GETTER } from './getters'
import {
  ADD_ITEMS_MUTATION,
  CREATE_ITEM,
  REMOVE_ITEM,
  SET_END_REACHED,
  SET_ITEMS_MUTATION,
  SET_LOADING_MUTATION,
  SET_PAGE_MUTATION,
  SET_SELECTED_MUTATION,
  UPDATE_ITEM
} from './mutations'

export type onChagesCallback = (items: any[]) => void
export type onChangesFunction = (
  id: string,
  callback: onChagesCallback
) => Unsubscribe

export const createPaginatedStore = <T extends ItemWithId>(
  service: FirebaseApiService<any>
) => {
  const state: PaginatedStoreState<T> = {
    items: [],
    page: 1,
    endReach: false,
    selected: null,
    loading: true
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
    [ADD_ITEMS_MUTATION]: (state: PaginatedStoreState<T>, payload: T[]) => {
      state.items = [...state.items, ...payload]
    },
    [SET_SELECTED_MUTATION]: (state: PaginatedStoreState<T>, payload: T) => {
      state.selected = payload
    },
    [UPDATE_ITEM]: (
      state: PaginatedStoreState<T>,
      { item, index }: { item: T; index: number }
    ): void => {
      state.items[index] = item
      console.log('Item updated: ', item)
    },
    [CREATE_ITEM]: (state: PaginatedStoreState<T>, newItem: T): void => {
      state.items = [newItem, ...state.items]
    },
    [REMOVE_ITEM]: (state: PaginatedStoreState<T>, index: number): void => {
      state.items.splice(index, 1)
      console.log('Item removed at index: ', index)
    }
  }

  const getters = {
    [GET_ITEM_BY_ID_GETTER]:
      (state: PaginatedStoreState<T>) => (id: number) => {
        return state.items.find((x) => (x.id = id))
      },
    [GET_ITEM_INDEX_GETTER]:
      (state: PaginatedStoreState<T>) => (id: number) => {
        return state.items.findIndex((x) => (x.id = id))
      }
  }

  const actions = {
    [LISTEN_CHANGES_ACTION]: async (
      {
        commit,
        dispatch,
        getters
      }: ActionContext<PaginatedStoreState<T>, RootState>,
      payload?: QueryConstraint[]
    ): Promise<Unsubscribe> => {
      return service.onChanges(payload, (snapshot: QuerySnapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = { id: change.doc.id, ...change.doc.data() }
          if (change.type === 'added') {
            const index = getters[GET_ITEM_BY_ID_GETTER](item.id)
            if (!index) {
              commit(CREATE_ITEM, item)
            }
          }
          if (change.type === 'modified') {
            const index = getters[GET_ITEM_INDEX_GETTER](item.id)
            commit(UPDATE_ITEM, { item, index })
          }
          if (change.type === 'removed') {
            const index = getters[GET_ITEM_INDEX_GETTER](item.id)
            commit(REMOVE_ITEM, index)
          }
        })
      })
    },
    [FETCH_ITEMS_ACTIONS]: async (
      {
        state,
        commit,
        dispatch
      }: ActionContext<PaginatedStoreState<T>, RootState>,
      payload?: QueryConstraint[]
    ): Promise<void> => {
      commit(SET_END_REACHED, false)
      commit(SET_LOADING_MUTATION, true)
      const items = await service.index(payload)
      commit(SET_LOADING_MUTATION, false)
      if (state.page == 1) {
        commit(SET_ITEMS_MUTATION, items)
      } else {
        commit(ADD_ITEMS_MUTATION, items)
      }
      if (items.length == 0) {
        commit(SET_END_REACHED, true)
      }
    },
    [LOAD_MORE_ACTION]: async ({
      state,
      commit
    }: ActionContext<PaginatedStoreState<T>, RootState>) => {
      if (!state.endReach) {
        commit(SET_PAGE_MUTATION, state.page++)
      }
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
    getters,
    actions
  }
}
