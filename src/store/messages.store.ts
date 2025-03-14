import { getMessages, loadMoreMessages, sendMessage } from '@/api/messagesApi'
import { type Message } from '@/models/message'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'



export const useMessagesStore = defineStore("messages", () => {

  const messages = ref<Message[]>([]);
  const nodeId = ref<string>('');

  const lastMessage = computed((): Message => {
    return messages.value[messages.value.length - 1];
  })

  function loadMesages() {
    return getMessages(nodeId.value, (newMessages) => {
      messages.value = newMessages;
    });
  }

  async function loadMore() {
    const mesages = await loadMoreMessages(nodeId.value, lastMessage.value.date);
    messages.value = [...messages.value, ...mesages];
  }

  async function send(message: Message) {
    return await sendMessage(nodeId.value, message);
  }

  function setMessages(payload: Message[]) {
    messages.value = payload;
  }

  function setNodeId(id: string) {
    nodeId.value = id;
  }


  return {
    loadMesages,
    send,
    setMessages,
    messages,
    setNodeId,
    loadMore,
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
  };
});