<template>
  <div class="w-full flex py-4" :class="{ 'justify-end': sender }">
    <div
      class="message-inner flex w-4/6 md:w-2/5 items-center"
      :class="{
        'flex-row-reverse': sender,
        'justify-center': message.sender == 'SYSTEM'
      }"
    >
      <img
        :src="message.senderImageUrl"
        alt=""
        width="40"
        height="40"
        class="rounded-full"
        :class="{ 'ml-2': sender, 'mr-2': !sender }"
      />

      <div
        class="p-4 rounded-md shadow-sm text-gray-900 max-w-full break-words"
        :class="{
          'bg-blue-200': sender,
          'bg-yellow-100': message.sender != 'SYSTEM' && !sender
        }"
      >
        {{ message.text }}
        <br />
        <p class="text-gray-500 text-xs" :class="{ 'text-right': sender }">
          {{ formatDate(message.date) }}
        </p>
      </div>

      <fr-button flat rounded :class="{ 'mr-2': sender, 'ml-2': !sender }">
        <i class="material-icons">more_vert</i>
      </fr-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useUser } from '@/mixins'
import { Message } from '@/models/message'
import dayjs from 'dayjs'
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    message: {
      type: Object as PropType<Message>,
      default: () => null
    }
  },
  setup(props) {
    const { currentUser } = useUser()

    const sender = computed(() => {
      return currentUser.value.id == props.message.senderId
    })

    const formatDate = (date: number): string => {
      return dayjs(date).format('MM/DD/YY hh:mm a')
    }
    return {
      sender,
      formatDate,
      currentUser
    }
  }
})
</script>

<style scoped>
.message-inner {
  transition: all 0.3s cubic-bezier(0.42, 0, 0.52, 2.04);
}
</style>
