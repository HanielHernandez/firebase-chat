import messagesApi from '@/api/messagesApi'
import { type Message } from '@/models/message'
import { endBefore, limitToLast, startAt } from '@firebase/firestore'
import { Unsubscribe } from '@firebase/util'
import { orderBy } from 'firebase/firestore'
import { ActionContext } from 'vuex'
import { PaginatedStoreState, RootState } from '.'
import { FETCH_ITEMS_ACTIONS, LISTEN_CHANGES_ACTION } from './actions'
import { createPaginatedStore } from './base.store'
import {
  SET_LOADING_MUTATION,
  CREATE_ITEM,
  ADD_ITEMS_MUTATION,
  SET_END_REACHED,
  UNSUBSCRIBE_MUTATION,
  SET_SUBSCRIPTION
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
    },
    [UNSUBSCRIBE_MUTATION]: (state: PaginatedStoreState<Message>): void => {
      if (state.subcription) {
        state.subcription()
      }
    },
    [SET_SUBSCRIPTION]: (
      state: PaginatedStoreState<Message>,
      payload: Unsubscribe
    ): void => {
      state.subcription = payload
    },
    [CREATE_ITEM]: (
      state: PaginatedStoreState<Message>,
      newItem: Message
    ): void => {
      state.items = [...state.items, newItem]
    }
  },
  getters: {
    lastMessageDate: (state: PaginatedStoreState<Message>): number => {
      return state.items[0].date
    },
    firstItem: (state: PaginatedStoreState<Message>): Message => {
      return state.items[state.items.length - 1]
    },
    firstMessageDate: (state: PaginatedStoreState<Message>) => {
      return state.items ? state.items[state.items.length - 1].date : 0
    }
  },
  actions: {
    ...messagesStr.actions,
    [FETCH_ITEMS_ACTIONS]: async (
      {
        dispatch,
        commit,
        getters,
        state
      }: ActionContext<PaginatedStoreState<Message>, RootState>,
      node: string
    ): Promise<Message[] | null> => {
      if (state.loading == false) {
        commit(SET_LOADING_MUTATION, true)
        // if subscriptions on unsubscribe
        if (state.subcription) {
          commit(UNSUBSCRIBE_MUTATION)
        }
        // set node to to message api
        messagesApi.setId(node)
        // get last message from to list message and create query
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
        // get items and set then to store
        const items = await messagesApi.index(queries)
        commit(ADD_ITEMS_MUTATION, items)
        // get first message in order to listen for hacengs
        const firstMessageDate = getters.firstMessageDate
        console.log(firstMessageDate)

        // listen  for changes and set subscription
        const subs = await dispatch(LISTEN_CHANGES_ACTION, [
          orderBy('date', 'asc'),
          startAt(firstMessageDate)
        ])
        commit(SET_SUBSCRIPTION, subs)

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
