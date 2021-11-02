<script setup lang="ts">
import MessageBubble from '@/components/Messenger/MessageBubble.vue'
import { useStoreModule, useUser } from '@/mixins'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { currentUser } = useUser()
const conversationId = computed(() => {
  return route.params.conversationId as string
})

let unsunscribe = () => {
  console.log('unsibscribg')
}

const { selected: conversation, find: findConversation } =
  useStoreModule('conversations')

const {
  items: messages,
  loading,
  fetch: fetchMessages
} = useStoreModule('messages')
//const getConversation = () => {}

onMounted(async () => {
  await findConversation(conversationId.value)
})

watch(
  () => conversation.value,
  async (newval, oldval) => {
    console.log('Conversación cargada', newval)
    await fetchMessages({ node: newval.node, queries: [] })
  }
)
onUnmounted(() => {
  unsunscribe()
})
</script>

<template>
  <div class="px-4 h-full container-xl mx-auto container-lg">
    <div class="h-full flex flex-col-reverse relative pb-24">
      <div class="w-full p-4 absolute bottom-0 right-0 bg-white">
        <text-field id="text" rules="" name="text"> </text-field>
      </div>
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />

      <template v-if="loading">
        <FrMessagePlaceholder
          v-for="i in 7"
          :key="`${i}-loader`"
          :sender="!(i % 2) == 0"
        />
      </template>
    </div>
  </div>
</template>
<style scoped></style>
