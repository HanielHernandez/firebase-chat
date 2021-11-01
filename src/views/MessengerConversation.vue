<template>
  <div class="md:px-16 py-5 p-4">Convesación de mensajes</div>
</template>

<script setup lang="ts">
import { useStoreModule } from '@/mixins'
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const conversationId = computed(() => {
  return route.params.conversationId
})

const { selected: conversation, find: findConversation } =
  useStoreModule('conversations')

//const getConversation = () => {}

onMounted(() => {
  console.log(conversationId.value)
  findConversation(conversationId)
})
</script>

<style scoped></style>
