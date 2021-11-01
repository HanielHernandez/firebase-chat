import MessengerConversation from '@/views/MessengerConversation.vue'

export default [
  {
    path: ':conversationId',
    name: 'Messenger Conversation',
    component: (): unknown => import('@/views/MessengerConversation.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
