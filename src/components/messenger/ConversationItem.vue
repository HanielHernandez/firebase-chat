<template>
  <div
    class="
      hover:bg-white
      transition-all
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
      :src="conversation.recipient.profile_image_url"
      alt=""
      width="40"
      class="mr-4 rounded-full"
      height="40"
    />
    <div class="flex flex-col flex-1 overflow-hidden">
      <div class="flex flex-nowrap justify-between items-center">
        <p class="font-bold">
          {{ `${conversation.recipient.name}` }}
        </p>
        <span class="text-blue-600 text-xs font-medium"
          >{{ formatDate(conversation.lastMessage.date) }}
        </span>
      </div>

      <span class="text-sm text-gray-600 h-5 truncate flex-grow">{{
        $t(conversation.lastMessage.text)
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
export default defineComponent({
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formatDate = (date: number) => {
      return dayjs(date).format('MM/DD/YY hh:mm a')
    }
    return {
      //conversation,
      formatDate
    }
  }
})
</script>

<style scoped></style>
