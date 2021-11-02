<template>
  <div></div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Message } from '@/models/message'
import { useUser } from '@/mixins'
import MessageBuble from './MessageBubble.vue'
const props = defineProps({
  messages: {
    type: Array as PropType<Array<Message>>,
    default: () => []
  }
})
const { currentUser } = useUser()
</script>

<style lang="scss" scoped></style>
