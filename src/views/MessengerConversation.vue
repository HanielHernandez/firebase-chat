<script setup lang="ts">
import MessageList from '@/components/messenger/MessageList.vue'
import { useUser } from '@/mixins'
import { type Message, MessageType } from '@/models/message'
import { useConversationsStore } from '@/store/conversations.store'
import { useMessagesStore } from '@/store/messages.store'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const sending = ref(false)
const route = useRoute()
const { currentUser } = useUser()
const messageStore = useMessagesStore()
const conversationsStore = useConversationsStore()

const conversationId = computed(() => {
    return route.params.conversationId as string
})

const conversation = computed(() => {
    return conversationsStore.selected
})

const messages = computed(() => {
    return messageStore.messages
})

onMounted(async () => {
    await conversationsStore.findItem(conversationId.value)
})

watch(
    () => conversationId,
    async (newval, oldval) => {
        if (newval !== oldval) {
            await conversationsStore.findItem(conversationId.value)
        }
    }
)

onBeforeUnmount(() => {
    messageStore.setMessages([])
    conversationsStore.setSelected(null)
})

const scrollToBottom = () => {
    const messageList = document.getElementById('messagesList')
    if (messageList) {
        messageList.scrollTo(0, messageList.scrollHeight)
    }
}

const sendMessage = async (values: { text: string }, { resetForm }: { resetForm: () => void }) => {
    const newMessage: Message = {
        text: values.text,
        type: MessageType.SMS,
        date: new Date().getTime(),
        status: 'sended',
        senderId: (currentUser.value && currentUser.value.id) || '',
        senderImageUrl: (currentUser.value && currentUser.value.profileImageUrl) || ''
    }

    try {
        sending.value = true
        await messageStore.send(newMessage)
        scrollToBottom()
        resetForm()
        sending.value = false
    } catch (e) {
        console.error(e)
        sending.value = false
    }
}
</script>

<template>
    <div class="h-full container-xl mx-auto container-lg relative pb-20">
        <MessageList v-if="conversation" ref="messagesList" :messages="messages" />
        <div class="w-full p-4 bg-white bottom-0 left-0 absolute border-t-1 border-neutral-100">
            <vee-form class="w-full flex items-center justify-center" @submit="sendMessage">
                <text-field id="text" class="mr-4" rules="" name="text"></text-field>

                <fr-button :loading="sending" flat rounded type="submit">
                    <i class="material-icons">send</i>
                </fr-button>
            </vee-form>
        </div>
    </div>
</template>
<style scoped></style>
