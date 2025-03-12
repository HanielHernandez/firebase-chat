export default [
  {
    path: ':conversationId',
    name: 'Messenger Conversation',
    component: (): unknown =>
      /* webpackChunkName: "messenger-conversation" */ import(
        '@/views/MessengerConversation.vue'
      ),
    meta: {
      requiresAuth: true
    }
  }
]
