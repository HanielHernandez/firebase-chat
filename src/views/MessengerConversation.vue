<script setup lang="ts">
import MessageList from '@/components/messenger/MessageList.vue'
import { useUser } from '@/mixins'
import { type Message, MessageType } from '@/models/message'
import { useConversationsStore } from '@/store/conversations.store'
import { useMessagesStore } from '@/store/messages.store'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { currentUser } = useUser()
const messageStore = useMessagesStore()
const conversationsStore = useConversationsStore()

const conversationId = computed(() => {
  return route.params.conversationId as string
})

let unsubscribe = () => {
  // // console.log('unsibscribg')
}

const conversation = computed(() => {
  return conversationsStore.selected
})


const messages = computed(() => {
  return messageStore.items
})


onMounted(async () => {
  await conversationsStore.findeItem(conversationId.value)
  // scrollToBottom()
})

watch(
  () => conversationId.value,
  async () => {
    console.log('cnversaiton id change')
    await conversationsStore.findeItem(conversationId.value)
  }
)

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
    senderId: currentUser.value && currentUser.value.id || "", 
    senderImageUrl: currentUser.value && currentUser.value.profileImageUrl || ""
  }

  try {
    sending.value = true
    await messageStore.addItems([newMessage])
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
    <MessageList ref="messagesList" v-if="conversation" :messages="messages" />
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
