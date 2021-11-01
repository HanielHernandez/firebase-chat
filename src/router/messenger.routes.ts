import MessengerConversation from '@/views/MessengerConversation.vue'

export default [
  {
    path: ':conversationId',
    name: 'Messenger Conversation',
    component: MessengerConversation,
    meta: {
      requiresAuth: true
    }
  }
]
