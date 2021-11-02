<template>
  <div class="w-100 flex py-4" :class="{ 'justify-end': sender }">
    <div
      class="flex w-4/6 md:w-2/5 items-center jst"
      :class="{
        'flex-row-reverse': sender,
        'justify-end': sender,
        'justify-center': message.sender == 'SYSTEM'
      }"
    >
      <img src="" alt="" />
      <div
        class="p-4 rounded-md shadow-md"
        :class="{
          'w-1/3 ': message.senderId != 'SYSTEM',
          'bg-blue-200': sender,
          'bg-yellow-100': message.sender != 'SYSTEM' && !sender
        }"
      >
        {{ message.text }}
      </div>

      <fr-skeleton
        v-if="message.sender == 'SYSTEM'"
        class="w-1/3"
        height="100px"
      >
      </fr-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { useUser } from '@/mixins'
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
    const { currentUser } = useUser()
    const sender = () => {
      return currentUser.value.code == props.message.senderId
    }
    {
      currentUser
    }
  }
})
</script>

<style scoped></style>
