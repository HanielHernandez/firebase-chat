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
    <FrInfiniteScroll
      v-if="currentConv"
      :options="{ threshold: 0.2 }"
      @loadMore="scrollReached"
    >
      <template #loading>
        <div class="text-center">
          <fr-loading></fr-loading>
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

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  PropType,
  ref,
  defineEmits,
  computed
} from 'vue'
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
const scrollPosition = ref(0)
const { currentUser } = useUser()
const { loading, fetch } = useStoreModule('messages')
onMounted(() => {
  if (messagesList.value) {
    messagesList.value.scrollTo(0, 0)
  }
})
const lastMessage = ref<Element>()
const scrollToBotom = () => {
  if (messagesList.value) {
    console.log(
      'scroll hegiht',
      messagesList.value.scrollHeight,
      scrollPosition.value
    )
    if (lastMessage.value) {
      lastMessage.value.scrollIntoView()
    } else {
      messagesList.value.scrollTo(0, messagesList.value.scrollHeight)
    }
  }
}
const scrollReached = async ({
  onLoadingEnded,
  onEnd
}: {
  onLoadingEnded: () => void
  onEnd: () => void
}) => {
  console.log('alcanzo scroll ', currentConv.value)
  console.log(messagesList.value?.scrollTop)
  if (messagesList.value) {
    scrollPosition.value = messagesList.value.scrollHeight
    storePosition()
  }
  const items = await fetch(currentConv.value.node)
  if (items == null || items.length == 0) {
    onEnd()
  }
  scrollToBotom()

  onLoadingEnded()
}

const offset = () => {
  return messagesList.value?.scrollTop
}

const storePosition = () => {
  if (messagesList.value) {
    const lastChild = [...messagesList.value.querySelectorAll('.message')]
    lastMessage.value = lastChild[0]
    console.log('Last chidl', lastChild[0])
  }
}

const beforeEnter = (el: HTMLElement): void => {
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
