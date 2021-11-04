<script setup lang="ts">
import MessageList from '@/components/Messenger/MessageList.vue'
import { useStoreModule, useUser } from '@/mixins'
import { Message, MessageType } from '@/models/message'
import { limit, orderBy } from '@firebase/firestore'
import dayjs from 'dayjs'
import { where } from 'firebase/firestore'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { currentUser } = useUser()
const conversationId = computed(() => {
  return route.params.conversationId as string
})

let unsubscribe = () => {
  // // console.log('unsibscribg')
}

const { selected: conversation, find: findConversation } =
  useStoreModule('conversations')
const { store: storeMessage, listenChanges: listenMessagesChanges } =
  useStoreModule('messages')
const {
  items: messages,
  loading,
  fetch: fetchMessages
} = useStoreModule('messages')
//const getConversation = () => {}

// watch(
//   () => conversation.value,
//   async (newval, oldval) => {
//     // // console.log('Conversación cargada', newval)
//     await fetchMessages({
//       node: newval.node,
//       queries: [orderBy('date'), limit(25)]
//     })
//     scrollToBottom()
//     // unsubscribe = await listenMessagesChanges([
//     //   orderBy('date', 'desc'),
//     //   limit(25)
//     // ])
//   }
// )
onMounted(async () => {
  await findConversation(conversationId.value)

  // scrollToBottom()
})
onUnmounted(() => {
  unsubscribe()
})
const sending = ref(false)
const scrollToBottom = () => {
  const messageList = document.getElementById('messagesList')
  if (messageList) {
    // // console.log('messagesList', messageList)
    messageList.scrollTo(0, messageList.scrollHeight)
  }
}

// methods
const sendMessage = async (
  values: { text: string },
  { resetForm }: { resetForm: () => void }
) => {
  // // console.log('sending', values)
  const newMessage: Message = {
    text: values.text,
    type: MessageType.SMS,
    date: new Date().getTime(),
    status: 'sended',
    senderId: currentUser.value.id,
    senderImageUrl: currentUser.value.profileImageUrl
  }
  try {
    sending.value = true
    const message = await storeMessage(newMessage)
    sending.value = false
    scrollToBottom()
    resetForm()
  } catch (e) {
    sending.value = false

    console.error(e)
  }
}
</script>

<template>
  <div class="h-full container-xl mx-auto container-lg relative">
    <MessageList ref="messagesList" :messages="messages" />
    <div class="w-full p-4 bg-white">
      <vee-form
        class="w-full flex items-center justify-center"
        @submit="sendMessage"
      >
        <text-field id="text" class="mr-4" rules="" name="text"> </text-field>

        <fr-button :loading="sending" flat rounded type="submit">
          <i class="material-icons">send</i>
        </fr-button>
      </vee-form>
    </div>
  </div>
</template>
<style scoped></style>
