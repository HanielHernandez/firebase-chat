import conversationsApi from '@/api/conversationsApi'
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
import { CommitFunction } from '.'
import { FIND_ITEM_ACTION, STORE_ITEM_ACTION } from './actions'
import { createPaginatedStore } from './base.store'
import { SET_SELECTED_MUTATION } from './mutations'

export const storeConversation = async (
  state: unknown,
  phoneNumber: string
): Promise<Conversation> => {
  // // console.log(phoneNumber)
  //verify if user exist
  const recipient = await users.findBy('phoneNumber', phoneNumber)
  const currentUser = await auth.currentUserProfile()

  // if recipient does not exist throw exception
  if (!recipient) {
    throw USER_NOT_FOUND
  }
  // get current user
  if (!currentUser) {
    throw NOT_LOG_IN
  }

  const conversations = await conversationsApi.index([
    where('senderId', '==', currentUser.code),
    where('recipient.code', '==', recipient.code)
  ])
  // // console.log(conversations)
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

  const node = await nodesApi.store({ messages: [lastMessage] })
  // saveCurrentConversation
  const conversation = await conversationsApi.store({
    recipient,
    title: recipient.name,
    conversationImageUrl: recipient.profileImageUrl,
    node: node.id,
    senderPhoneNumber: currentUser.phoneNumber,
    updatedAt: new Date(),
    unreadedMessages: 0,
    lastMessage
  } as Conversation)
  return conversation
}

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
const store = createPaginatedStore(conversationsApi)
export default {
  ...store,
  actions: {
    ...store.actions,
    [STORE_ITEM_ACTION]: storeConversation,
    [FIND_ITEM_ACTION]: async (
      {
        commit
      }: {
        commit: CommitFunction
      },
      id: string
    ) => {
      const item = await conversationsApi.find(id)
      commit(SET_SELECTED_MUTATION, item)
      if (item) {
        await conversationsApi.update(item?.id as string, {
          ...item,
          unreadedMessages: 0
        })
      }

      return item
    }
  }
}
