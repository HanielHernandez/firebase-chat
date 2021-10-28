<template>
  <div
    class="
      border-r border-right border-gray-300
      h-screen
      bg-gray-100
      fixed
      left-0
      top-0
      w-1 w-96
    "
  >
    <ConversationsList />
  </div>
</template>

<script>
import ConversationsList from '@/components/messenger/ConversationsList.vue'
export default {
  components: {
    ConversationsList
  }
}
</script>

<style lang="scss" scoped></style>
