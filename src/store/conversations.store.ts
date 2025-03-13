import conversationsApi from '@/api/conversationsApi'
import nodesApi from '@/api/nodesApi'
import {
  CONVERSATION_CREATED,
  CONVRESATION_AREADY_EXIST,
  NOT_LOG_IN,
  USER_NOT_FOUND
} from '@/config/variables'
import { type Conversation } from '@/models/conversation'
import { type Message,  MessageType } from '@/models/message'
import auth from '@/plugins/firebase/auth'
import users from '@/plugins/firebase/users'
import { where } from '@firebase/firestore'
import { type CommitFunction } from '.'
import { FIND_ITEM_ACTION, STORE_ITEM_ACTION } from './actions'
import { createPaginatedStore } from './base.store'
import { SET_SELECTED_MUTATION } from './mutations'
import { defineStore } from 'pinia'

export const startConversation = async (
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

  if (conversations.length > 0) {
    throw CONVRESATION_AREADY_EXIST
  }

  const newConversation = conversations[0];

  const lastMessage = {
    date: new Date().getTime(),
    type: MessageType.SYSTEM,
    text: CONVERSATION_CREATED,
    status: 'sended',
    senderId: 'SYSTEM'
  } as Message



  //const node = await nodesApi.store({ messages: [lastMessage] })
  // saveCurrentConversation
  const conversation = await conversationsApi.store({
    recipient,
    title: recipient.name,
    conversationImageUrl: recipient.profileImageUrl,
    node: newConversation.node,
    senderPhoneNumber: currentUser.phoneNumber,
    updatedAt: new Date(),
    unreadedMessages: 0,
    lastMessage,
  } as Conversation);
  return conversation
}

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

// const store = createPaginatedStore(conversationsApi)
// export default {
//   ...store,
//   actions: {
//     ...store.actions,
//     [STORE_ITEM_ACTION]: startConversation,
//     [FIND_ITEM_ACTION]: async (
//       {
//         commit
//       }: {
//         commit: CommitFunction
//       },
//       id: string
//     ) => {
//       const item = await conversationsApi.find(id)
//       commit(SET_SELECTED_MUTATION, item)
//       if (item) {
//         await conversationsApi.update(item?.id as string, {
//           ...item,
//           unreadedMessages: 0
//         })
//       }

//       return item
//     }
//   }
// }

const store = createPaginatedStore<Conversation>(conversationsApi)

export const useConversationsStore = defineStore("conversations", {
  ...store,
  actions: {
    ...store.actions,
    startConversation(phoneNumber: string): Promise<Conversation> {
      return startConversation(phoneNumber);
    },
    async findeItem(id: string) {
      const item = await conversationsApi.find(id);
      if (item) {
        this.setSelected(item);
        await conversationsApi.update(item?.id as string, {
          ...item,
          unreadedMessages: 0,
        });
      }

      return item;
    },
  },
});  