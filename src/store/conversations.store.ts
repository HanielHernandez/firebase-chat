import conversationsApi, { Conversations } from '@/api/conversationsApi'
import nodesApi from '@/api/nodesApi'
import {
  CONVERSATION_CREATED,
  CONVRESATION_AREADY_EXIST,
  NOT_LOG_IN,
  USER_NOT_FOUND
} from '@/config/variables'
import { Conversation } from '@/models/conversation'
import { Message, MessageType } from '@/models/message'
import auth from '@/plugins/firebase/auth'
import users from '@/plugins/firebase/users'
import { where } from '@firebase/firestore'
import { Unsubscribe } from '@firebase/util'
import {
  CommitFunction,
  PaginatedStoreState,
  SetterFunction,
  setterFunction
} from '.'
import { FETCH_ITEMS_ACTIONS, STORE_ITEM_ACTION } from './actions'
import { createPaginatedStore } from './base.store'
import { SET_ITEMS_MUTATION, SET_LOADING_MUTATION } from './mutations'

const state: PaginatedStoreState<Conversation> = {
  items: [],
  selected: null,
  loading: false
}

const setItemsFn = (): SetterFunction => setterFunction('items')
const setLoadingFn = (): SetterFunction => setterFunction('loading')
/*
const mutations = {
  [SET_ITEMS_MUTATION]: (
    state: { [key: string]: unknown },
    payload: unknown
  ): void => {
    state['items'] = payload
  },
  [SET_LOADING_MUTATION]: (state: any, payload: any) => {
    state['loading'] = payload
  }
}

const actions = {
  [FETCH_ITEMS_ACTIONS]: (
    { commit }: { commit: CommitFunction },
    userCode: string
  ): Unsubscribe => {
    console.log('commiting conversations')
    commit(SET_LOADING_MUTATION, true)
    return conversationsApi.onChanges(
      userCode,
      (coversations: Conversation[]) => {
        console.log('conversations where updated', coversations)
        commit(SET_LOADING_MUTATION, false)
        commit(SET_ITEMS_MUTATION, coversations)
      }
    )
  },
  [STORE_ITEM_ACTION]: async (
    state: unknown,
    recipientId: string
  ): Promise<Conversation> => {
    console.log(recipientId)
    //verify if user exist
    const recipient = await users.find(recipientId)
    const currentUser = await auth.currentUserProfile()

    // if recipient does not exist throw exception
    if (!recipient) {
      throw USER_NOT_FOUND
    }
    // get current user

    if (!currentUser) {
      throw NOT_LOG_IN
    }

    const conversations = await conversationsApi.index(
      where('senderId', '==', currentUser.code),
      where('recipient.code', '==', recipient.code)
    )
    console.log(conversations)
    if (conversations.length > 0) {
      throw CONVRESATION_AREADY_EXIST
    }

    const lastMessage = {
      date: new Date().getTime(),
      type: MessageType.SYSTEM,
      text: CONVERSATION_CREATED,
      status: 'sended',
      senderId: 'SYSTEM'
    } as Message

    const node = await nodesApi.store(lastMessage)
    // saveCurrentConversation
    const conversation = await conversationsApi.store({
      recipient,
      node,
      senderId: currentUser.code,
      updatedAt: new Date(),
      lastMessage
    })
    return conversation
  },
  []
}*/

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
const store = createPaginatedStore(conversationsApi)
export default store
