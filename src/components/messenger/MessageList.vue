<script setup lang="ts">
import { onMounted, type PropType, ref, watch, onUnmounted, computed } from 'vue'
import { type Message } from '@/models/message'
import gsap from 'gsap'

// import { VueEternalLoading } from '@ts-pro/vue-eternal-loading'

import MessageBubble from './MessageBubble.vue'
import dayjs from 'dayjs'
import { useConversationsStore } from '@/store/conversations.store'
import { useMessagesStore } from '@/store/messages.store'
import type { Unsubscribe } from 'firebase/firestore'

const props = defineProps({
  messages: {
    type: Array as PropType<Array<Message>>,
    default: () => []
  }
})

const messagesList = ref<Element | null>(null)
const isInitial = ref(true)
const animatedMessages = ref(0)
const unsubscribe = ref<Unsubscribe| null>(null)

const conversationStore = useConversationsStore()
const messagesStore = useMessagesStore()


const currentConv = computed(()=>(conversationStore.selected))


watch(
  () => currentConv.value,
  () => {
    reset()
  }
)

function reset() {
  conversationStore.resetItems()
  isInitial.value = true
}

onMounted(() => {
  if (messagesList.value) {
    messagesList.value.scrollTo(0, 0)

      loadMessages()
  }
})

const scrollToBotom = () => {
  if (messagesList.value) {
    messagesList.value.scrollTo(0, messagesList.value.scrollHeight)

  }
}

const loadMessages = async ()=>{
  if (currentConv.value) {
    messagesStore.setNodeId(currentConv.value.node)
    unsubscribe.value = await messagesStore.loadMesages()
    scrollToBotom()
  }
}


onUnmounted(() => {
  unsubscribe.value && unsubscribe.value()
})
/*
const scrollReached = async ({
  loaded,
  noMore
}: {
  loaded: () => void
  noMore: () => void
}) => {
  if (conversationStore.endReach === false && currentConv.value) {
  console.log()
    await conversationStore.fetchItems(currentConv.value.node)
    loaded()
  } else {
    noMore()
  }
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
*/
const beforeEnter = (el: HTMLElement ): void => {
  el.style.opacity = '0'
  el.style.transform = 'rotateX(-45deg) scale(0.3)'
}
const enter = (el: any, done: () => void) => {
  const totalElements = getListOfChilds()
  gsap.to(el, {
    opacity: 1,
    transformOrigin: 'right',
    duration: 0.15,
    transform: 'rotateX(0deg) scale(1)',
    delay: (totalElements - el.dataset.index) * 0.15,
    ease: 'elastic.inOut(1, 0.3)',
    position: -el.dataset.index,
    onComplete: done
  })
  animatedMessages.value++
}

const getListOfChilds = () => {
  if (messagesList.value) {
    return messagesList.value.childElementCount - animatedMessages.value
  }
  return 0
}
const leave = (el: any, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    duration: 0.15,
    transform: 'rotateX(-45deg) scale(0.3)',
    ease: 'elastic.inOut(1, 0.3)',
    position: 1,
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
    class="h-full flex relative flex-col-reverse  px-4 overflow-y-auto overflow-x-hidden flex-1"
    style="max-height: calc(100vh - 9.625rem)"
  >
    <!-- <VueEternalLoading
      v-if="currentConv"
      v-model:is-initial="isInitial"
      position="top"
      margin="200px"
      :load="scrollReached"
      :container="messagesList"
    >
      <template #loading>
        <div class="text-center">
          <fr-loading></fr-loading>
        </div>
      </template>
      <template #no-more>
        <div class="opacity-0">There is no more content.</div>
      </template>
    </VueEternalLoading> -->

    <transition-group
      name="messages"
      :css="false"
      mode="in-out"
      appear
      @before-Enter="($el)=>beforeEnter($el as HTMLElement) "
      @enter="enter"
      @leave="leave"
    >
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        class="message-row"
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
          v-else-if="index > 0 && sameDayAsBefore(index) == false"
          class="text-center py-2 text-gray-500"
        >
          <div class="w-full text-xs">
            {{ $date(message.date) }}
          </div>

        </div>
        <MessageBubble v-if="message.senderId != 'SYSTEM'" :message="message" />
      </div>
    </transition-group>
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
