<template>
  <div
    class="
      hover:bg-white
      transition-colors
      duration-300
      ease-in-out
      py-2
      px-4
      flex
      items-center
      justify-start
    "
  >
    <img
      :src="conv.avatar"
      alt=""
      width="40"
      class="mr-4 rounded-full"
      height="40"
    />
    <div class="flex flex-col flex-1 overflow-hidden">
      <div class="flex flex-nowrap justify-between">
        <p class="font-bold">
          {{ `${conv.recipient_first_name} ${conv.recipient_last_name}` }}
        </p>
        <span class="text-blue-600 text-xs font-medium">
          {{ formatDate(conv.date) }}
        </span>
      </div>

      <span class="text-sm h-5 truncate flex-grow">{{
        conv.last_message
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
export default defineComponent({
  props: {
    conversation: {
      type: Object,
      default: () => null
    }
  },
  setup(props) {
    const conv = ref(props.conversation)
    const formatDate = (date: number) => {
      return dayjs(new Date(date * 1000)).format('MM/DD/YY hh:mm a')
    }
    return {
      conv,
      formatDate
    }
  }
})
</script>

<style scoped></style>
