<template>
  <div class="md:px-16 py-5 p-4">Convesación de mensajes</div>
</template>

<script setup lang="ts">
import { useStoreModule, useUser } from '@/mixins'
import { computed, defineComponent, onMounted, onUnmounted, watch } from 'vue'
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

const { items: messages, fetch: fetchMessages } = useStoreModule('messages')
//const getConversation = () => {}

onMounted(async () => {
  await findConversation(conversationId.value)
})

watch(
  () => conversation.value,
  async (newval, oldval) => {
    console.log(newval)
    unsunscribe = await fetchMessages({ node: newval.node, queries: [] })
  }
)
onUnmounted(() => {
  unsunscribe()
})
</script>

<style scoped></style>
