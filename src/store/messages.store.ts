import { getMessages, loadMoreMessages, sendMessage } from '@/api/messagesApi'
import { type Message } from '@/models/message'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMessagesStore = defineStore('messages', () => {
    const messages = ref<Message[]>([])
    const nodeId = ref<string>('')
    const endReached = ref<boolean>(false)

    const lastMessage = computed((): Message | null => {
        return messages.value[messages.value.length - 1]
    })

    function loadMesages() {
        return getMessages(nodeId.value, (newMessages) => {
            messages.value = newMessages
        })
    }

    async function loadMore() {
        if (!lastMessage.value) {
            return
        }

        const mesages = await loadMoreMessages(nodeId.value, lastMessage.value.date)
        if (mesages.length === 0) {
            endReached.value = true
            return
        }
        messages.value = [...messages.value, ...mesages]
    }

    async function send(message: Message) {
        return await sendMessage(nodeId.value, message)
    }

    function setMessages(payload: Message[]) {
        messages.value = payload
    }

    function setNodeId(id: string) {
        nodeId.value = id
    }

    return {
        loadMesages,
        send,
        setMessages,
        messages,
        setNodeId,
        loadMore,
        lastMessage,
        endReached,
        nodeId
        /*...baseStore,
    fetchItems,
    unsubscribe,
    listenForChanges,
    addItems,
    setSubscription,
    createItem,
    lastMessageDate,
    firstItem,
    firstMessageDate,*/
    }
})
