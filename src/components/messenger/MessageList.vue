<script setup lang="ts">
import { defineProps, onMounted, PropType, ref, defineEmits } from 'vue'
import { Message } from '@/models/message'
import { useStoreModule, useUser } from '@/mixins'
import gsap from 'gsap'
import Bounce from 'gsap'
import Linear from 'gsap'

import MessageBubble from './MessageBubble.vue'
import dayjs from 'dayjs'
const emit = defineEmits(['loadMore'])
const messagesList = ref<Element | null>(null)
const props = defineProps({
  messages: {
    type: Array as PropType<Array<Message>>,
    default: () => []
  }
})

const { selected: currentConv } = useStoreModule('conversations')

const { currentUser } = useUser()
const { loading, fetch } = useStoreModule('messages')
onMounted(() => {
  // // console.log('message list added', messagesList)
  if (messagesList.value) {
    messagesList.value.scrollTo(0, 0)
  }
})
const scrollReached = async (onEndLoading: () => void) => {
  // // console.log('ya pasó el loaidng')
  if (currentConv.value) {
    await fetch(currentConv.value.node)
    onEndLoading()
  } else {
    onEndLoading()
  }
}
const beforeEnter = (el: HTMLElement): void => {
  // // console.log('INDEX IS', el.dataset.index)
  el.style.opacity = '0'
  el.style.transform = 'rotateX(-45deg) scale(0.3)'
}
const enter = (el: any, done: () => void) => {
  gsap.to(el, {
    opacity: 1,
    transformOrigin: 'right',
    duration: 0.15,
    transform: 'rotateX(0deg) scale(1)',
    delay: el.dataset.index * 0.15,
    ease: 'elastic.inOut(1, 0.3)',

    onComplete: done
  })
}
const leave = (el: any, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    duration: 0.15,
    transform: 'rotateX(-45deg) scale(0.3)',
    ease: 'elastic.inOut(1, 0.3)',

    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
// function use to decide wheater or not show date of message on top
const sameDayAsBefore = (i: number): boolean => {
  if (i == 0) {
    return false
  } else {
    const messagesDateFormate = dayjs(props.messages[i].date).format('MM/DD/YY')
    const prevDateFormate = dayjs(props.messages[i - 1].date).format('MM/DD/YY')

    return messagesDateFormate === prevDateFormate
  }
}
</script>
<template>
  <div
    id="messagesList"
    ref="messagesList"
    class="
      h-full
      flex flex-col
      relative
      px-4
      overflow-y-auto overflow-x-hidden
      flex-1
    "
    style="max-height: calc(100vh - 9.625rem)"
  >
    <FrInfiniteScroll v-if="currentConv" @loadMore="scrollReached">
      <template #loading>
        <div>
          <FrMessagePlaceholder
            v-for="i in 7"
            :key="`${i}-loader`"
            :sender="!(i % 2) == 0"
          />
        </div>
      </template>
    </FrInfiniteScroll>
    <!-- 
    <transition-group
      name="messages"
      :css="false"
      appear
      tag="div"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    > -->
    <div
      v-for="(message, index) in messages"
      :key="message.id"
      :data-index="index"
    >
      <div
        v-if="message.senderId == 'SYSTEM'"
        class="text-center py-2 text-gray-500"
      >
        <div class="w-full text-xs">
          {{ $date(message.date) }}
        </div>
        <p class="text-sm">{{ $t(message.text) }}</p>
      </div>

      <div
        v-if="sameDayAsBefore(index) == false"
        class="text-center py-2 text-gray-500"
      >
        <div class="w-full text-xs">
          {{ $date(message.date) }}
        </div>
      </div>
      <MessageBubble v-else :message="message" />
    </div>
    <!-- </transition-group> -->
  </div>
</template>

<style lang="scss" scoped>
.messages {
  // &-enter-from,
  // &-leave-to {
  //   opacity: 1;
  //   transform: translateX(0) scale(1);
  // }
  // &-enter-active,
  // &-leave-active {
  //   transition: all 0.5s ease;
  // }
  // &-leave-active {
  //   transition: all 0.5s ease;
  //   position: absolute;
  // }

  // &-enter-from,
  // &-leave-to {
  //   opacity: 0;
  //   transform: translateX(100%) scale(0.3);
  // }
  &-move {
    transition: all 0.3 ease;
  }
}
</style>
