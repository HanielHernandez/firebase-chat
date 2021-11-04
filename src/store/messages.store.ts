import messagesApi, { MessagesApi } from '@/api/messagesApi'
import nodesApi from '@/api/nodesApi'
import { Message } from '@/models/message'
import { endAt, limitToLast, QueryConstraint } from '@firebase/firestore'
import { Unsubscribe } from '@firebase/util'
import { where, orderBy, limit } from 'firebase/firestore'
import { ActionContext } from 'vuex'
import { CommitFunction, PaginatedStoreState, RootState } from '.'
import { FETCH_ITEMS_ACTIONS } from './actions'
import { createPaginatedStore } from './base.store'
import {
  SET_LOADING_MUTATION,
  SET_ITEMS_MUTATION,
  CREATE_ITEM
} from './mutations'

const messagesStr = createPaginatedStore<Message>(messagesApi)

export default {
  ...messagesStr,
  mutations: {
    ...messagesStr.mutations,
    [CREATE_ITEM]: (
      state: PaginatedStoreState<Message>,
      newItem: Message
    ): void => {
      state.items = [...state.items, newItem]
    }
  },
  getters: {
    lastMessageDate: ({ items }: PaginatedStoreState<Message>) => {
      return items.length > 0 ? items[0].date : new Date().getTime()
    }
  },
  actions: {
    ...messagesStr.actions,
    [FETCH_ITEMS_ACTIONS]: async (
      {
        commit,
        getters
      }: ActionContext<PaginatedStoreState<Message>, RootState>,
      { node }: { node: string }
    ): Promise<Message[]> => {
      commit(SET_LOADING_MUTATION, true)
      messagesApi.setId(node)
      // // console.log(getters)
      const lastMessageDate = getters.lastMessageDate
      // // console.log(lastMessageDate)
      const queries = [
        orderBy('date', 'asc'),
        endAt(lastMessageDate),
        limitToLast(25)
      ]
      const items = await messagesApi.index(queries)
      commit(SET_ITEMS_MUTATION, items)
      commit(SET_LOADING_MUTATION, false)

      return items
    }
  }
}
