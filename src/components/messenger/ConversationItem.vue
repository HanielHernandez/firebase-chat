<template>
    <router-link
        :to="{
            name: 'Messenger Conversation',
            params: { conversationId: conversation.id }
        }"
        class="hover:bg-white transition-all bg-gray-100 duration-300 ease-in-out py-2 px-4 flex items-center relative justify-start"
    >
        <img :src="conversation.conversationImageUrl" alt="" width="40" class="mr-4 rounded-full" height="40" />
        <div class="flex flex-col flex-1 overflow-hidden">
            <div class="flex flex-nowrap justify-between items-center">
                <at-text class="font-bold text-neutral-800 leading-6">
                    {{ `${conversation.title}` }}
                </at-text>
                <span class="text-blue-600 text-xs font-bold">{{ formatDate(conversation.lastMessage.date) }}</span>
            </div>
            <div class="flex flex-nowrap justify-between items-center">
                <at-text class="text-sm text-gray-600 h-5 leading-5 truncate flex-grow">
                    {{ conversationSubitle }}
                </at-text>
                <span
                    v-if="showMessageCounter"
                    class="bg-green-700 rounded-full text-center text-gray-200 text-xs h-4 w-4"
                    style="font-size: 10px"
                >
                    {{ conversation.unreadedMessages }}
                </span>
                <button
                    class="icon absolute right-4 top-4 w-8 h-8 text-center cursor-pointer bg-neutral-900/50 text-neutral-200 text-xs rounded-full bg-color opacity-0 hover:opacity-100"
                >
                    <span class="material-icons" @click="deleteConversation">delete</span>
                </button>
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
import useRootStore from '@/store'

export default defineComponent({
    props: {
        conversation: {
            type: Object as PropType<Conversation>,
            required: true
        }
    },
    emits: ['onDeleteConversation'],
    setup(props, { emit }) {
        const { t } = useI18n()

        const userStore = useRootStore()

        const currentUser = computed(() => userStore.currentUser)

        const conversationSubitle = computed(() => {
            return SYSTEM_MESSAGES.includes(props.conversation.lastMessage.text)
                ? t(props.conversation.lastMessage.text)
                : props.conversation.lastMessage.text
        })
        const formatDate = (date: number) => {
            return dayjs(date).format('MM/DD/YY hh:mm a')
        }

        const deleteConversation = () => {
            emit('onDeleteConversation', props.conversation.id)
        }

        const lastMessageSentByUser = computed(() => {
            return currentUser.value ? props.conversation.lastMessage.senderId === currentUser.value.id : false
        })

        const showMessageCounter = computed(() => {
            return lastMessageSentByUser.value === false && props.conversation.unreadedMessages > 0
        })

        return {
            showMessageCounter,
            conversationSubitle,
            lastMessageSentByUser,
            currentUser,
            deleteConversation,
            formatDate
        }
    }
})
</script>

<style scoped></style>
