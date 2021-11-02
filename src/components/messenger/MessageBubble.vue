<template>
  <div>
    {{ message.text }}
  </div>
</template>

<script lang="ts">
import { Message } from '@/models/message'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    message: {
      type: Object as PropType<Message>,
      default: () => null
    }
  },
  setup(props) {
    console.log(props.message)
  }
})
</script>

<style scoped></style>
