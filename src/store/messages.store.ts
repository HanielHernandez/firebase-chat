import messagesApi, { MessagesApi } from '@/api/messagesApi'
import nodesApi from '@/api/nodesApi'
import { Message } from '@/models/message'
import {
  endAt,
  endBefore,
  limitToLast,
  QueryConstraint
} from '@firebase/firestore'
import { Unsubscribe } from '@firebase/util'
import { where, orderBy, limit } from 'firebase/firestore'
import { ActionContext } from 'vuex'
import { CommitFunction, PaginatedStoreState, RootState } from '.'
import { FETCH_ITEMS_ACTIONS } from './actions'
import { createPaginatedStore } from './base.store'
import {
  SET_LOADING_MUTATION,
  SET_ITEMS_MUTATION,
  CREATE_ITEM,
  ADD_ITEMS_MUTATION,
  SET_END_REACHED
} from './mutations'

const messagesStr = createPaginatedStore<Message>(messagesApi)

export default {
  ...messagesStr,
  mutations: {
    ...messagesStr.mutations,
    [ADD_ITEMS_MUTATION]: (
      state: PaginatedStoreState<Message>,
      paylod: Message[]
    ): void => {
      state.items = [...paylod, ...state.items]
    }
  },
  getters: {
    lastMessageDate: (state: PaginatedStoreState<Message>) => {
      return state.items[0].date
    }
  },
  actions: {
    ...messagesStr.actions,
    [FETCH_ITEMS_ACTIONS]: async (
      {
        commit,
        getters,
        state
      }: ActionContext<PaginatedStoreState<Message>, RootState>,
      node: string
    ): Promise<Message[] | null> => {
      if (state.loading == false) {
        commit(SET_LOADING_MUTATION, true)
        messagesApi.setId(node)
        const lastMessageDate =
          state.items.length > 0
            ? getters.lastMessageDate
            : new Date().getTime()
        console.log(lastMessageDate)
        const queries = [
          orderBy('date', 'asc'),
          endBefore(lastMessageDate),
          limitToLast(10)
        ]
        const items = await messagesApi.index(queries)
        commit(ADD_ITEMS_MUTATION, items)
        if (items.length == 0) {
          commit(SET_END_REACHED, true)
        }

        commit(SET_LOADING_MUTATION, false)
        return items
      }
      return null
    }
  }
}
