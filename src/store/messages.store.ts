import messagesApi, { MessagesApi } from '@/api/messagesApi'
import nodesApi from '@/api/nodesApi'
import { Message } from '@/models/message'
import { QueryConstraint } from '@firebase/firestore'
import { Unsubscribe } from '@firebase/util'
import { CommitFunction } from '.'
import { FETCH_ITEMS_ACTIONS } from './actions'
import { createPaginatedStore } from './base.store'
import { SET_LOADING_MUTATION, SET_ITEMS_MUTATION } from './mutations'
const messagesStr = createPaginatedStore<Message>(nodesApi)

export default {
  ...messagesStr,
  actions: {
    ...messagesStr.actions,
    [FETCH_ITEMS_ACTIONS]: async (
      {
        commit
      }: {
        commit: CommitFunction
      },
      payload: { nodeId: string; queries: QueryConstraint[] }
    ): Promise<Unsubscribe> => {
      commit(SET_LOADING_MUTATION, true)
      messagesApi.setId(payload.nodeId)
      return messagesApi.onChanges(payload.queries, (items: Message[]) => {
        commit(SET_LOADING_MUTATION, false)
        commit(SET_ITEMS_MUTATION, items)
      })
    }
  }
}
