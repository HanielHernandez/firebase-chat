<template>
  <router-link
    :to="{
      name: 'Messenger Conversation',
      params: { conversationId: conversation.id }
    }"
    class="
      hover:bg-white
      transition-all
      bg-gray-100
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
      :src="conversation.conversationImageUrl"
      alt=""
      width="40"
      class="mr-4 rounded-full"
      height="40"
    />
    <div class="flex flex-col flex-1 overflow-hidden">
      <div class="flex flex-nowrap justify-between items-center">
        <p class="font-bold">
          {{ `${conversation.title}` }}
        </p>
        <span class="text-blue-600 text-xs font-medium"
          >{{ formatDate(conversation.lastMessage.date) }}
        </span>
      </div>
      <div class="flex flex-nowrap justify-between items-center">
        <span class="text-sm text-gray-600 h-5 truncate flex-grow">{{
          conversationSubitle
        }}</span>
        <span
          v-if="
            conversation.unreadedMessages && conversation.unreadedMessages > 0
          "
          class="
            bg-yellow-400
            rounded-full
            text-center text-gray-200 text-xs
            h-4
            w-4
          "
          style="font-size: 10px"
        >
          {{ conversation.unreadedMessages }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { type Conversation } from '@/models/conversation'
import { SYSTEM_MESSAGES } from '@/config/variables'
export default defineComponent({
  props: {
    conversation: {
      type: Object as PropType<Conversation>,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const conversationSubitle = computed(() => {
      return SYSTEM_MESSAGES.includes(props.conversation.lastMessage.text)
        ? t(props.conversation.lastMessage.text)
        : props.conversation.lastMessage.text
    })
    const formatDate = (date: number) => {
      return dayjs(date).format('MM/DD/YY hh:mm a')
    }
    return {
      conversationSubitle,
      //conversation,
      formatDate
    }
  }
})
</script>

<style scoped></style>
