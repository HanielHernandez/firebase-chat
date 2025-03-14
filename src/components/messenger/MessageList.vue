<script setup lang="ts">
import { onMounted, type PropType, ref, watch, onUnmounted, computed, useTemplateRef } from 'vue'
import { type Message } from '@/models/message'
import MessageBubble from './MessageBubble.vue'
import dayjs from 'dayjs'
import { useConversationsStore } from '@/store/conversations.store'
import { useMessagesStore } from '@/store/messages.store'
import type { Unsubscribe } from 'firebase/firestore'
import { useInfiniteScroll, useScroll } from '@vueuse/core'
import { formateDate } from '@/plugins/date'

const props = defineProps({
    messages: {
        type: Array as PropType<Array<Message>>,
        default: () => []
    }
})

const messagesList = useTemplateRef<HTMLElement>('messagesList')
const unsubscribe = ref<Unsubscribe | null>(null)
const conversationStore = useConversationsStore()
const messagesStore = useMessagesStore()
const currentConv = computed(() => conversationStore.selected)
const loading = ref(false)
const { arrivedState } = useScroll(messagesList)

const formatDate = formateDate

const arrivedAtBottom = computed(() => {
    return arrivedState.bottom
})
watch(
    () => currentConv.value,
    () => {
        reset()
    }
)
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

const loadMessages = async () => {
    if (currentConv.value) {
        messagesStore.setNodeId(currentConv.value.node)
        unsubscribe.value = await messagesStore.loadMesages()
        scrollToBotom()
    }
}

const loadMore = async () => {
    loading.value = true
    await messagesStore.loadMore()
    loading.value = false
}

const { reset } = useInfiniteScroll(
    messagesList, // Change this if needed (e.g., a specific div)
    () => {
        if (loading.value === true) {
            return
        }
        loadMore()
        console.log('loadingmore')
    },
    {
        throttle: 500,
        direction: 'top',
        canLoadMore: () => {
            return messagesStore.endReached === false
        }
    }
)

onUnmounted(() => {
    if (unsubscribe.value) unsubscribe.value()
    reset()
})
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
        class="h-full flex relative flex-col-reverse px-4 overflow-y-auto overflow-x-hidden flex-1"
        style="max-height: calc(100vh - 9.625rem)"
    >
        <div v-if="loading" class="text-center w-ull">
            <fr-loading></fr-loading>
        </div>

        <button
            v-if="arrivedAtBottom === false"
            class="border border-neutral-200 text-neutral-600 bg-white w-10 h-10 rounded-full p-2 shadow-sm fixed bottom right-4 bottom-24"
            @click="scrollToBotom"
        >
            <span class="material-icons">keyboard_arrow_down </span>
        </button>

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

        <!-- <transition-group
            name="messages"
            :css="false"
            mode="in-out"
            appear
            @before-enter="($el) => beforeEnter($el as HTMLElement)"
            @enter="enter"
            @leave="leave"
        > -->
        <div v-for="(message, index) in messages" :key="message.id" class="message-row" :data-index="index">
            <div v-if="message.senderId == 'SYSTEM'" class="text-center py-2 text-gray-500">
                <div class="w-full text-xs">
                    {{ formatDate(message.date) }}
                </div>
                <p class="text-sm">{{ $t(message.text) }}</p>
            </div>

            <div v-else-if="index > 0 && sameDayAsBefore(index) == false" class="text-center py-2 text-gray-500">
                <div class="w-full text-xs">
                    {{ formatDate(message.date) }}
                </div>
            </div>
            <MessageBubble v-if="message.senderId != 'SYSTEM'" :message="message" />
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
