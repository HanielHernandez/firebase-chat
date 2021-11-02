<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Message } from '@/models/message'
import { useUser } from '@/mixins'
import MessageBubble from './MessageBubble.vue'
const props = defineProps({
  messages: {
    type: Array as PropType<Array<Message>>,
    default: () => []
  }
})
const { currentUser } = useUser()
</script>
<template>
  <div>
    <div v-for="message in messages" :key="message.id" class="w-full">
      <div
        v-if="message.senderId == 'SYSTEM'"
        class="text-center py-2 text-gray-500"
      >
        <div class="w-full text-xs">
          {{ $date(message.date) }}
        </div>
        <p class="text-sm">{{ $t(message.text) }}</p>
      </div>
      <MessageBubble v-else :message="message" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
