<template>
    <div
        class="border-r overflow-hiden border-right border-gray-300 h-screen bg-gray-100 fixed left-0 top-0 z-20 md:w-96"
        :class="isConversationOpen ? 'w-0 translate-full md:translate-none ' : 'w-screen'"
    >
        <div class="flex justify-between items-center px-4 pt-4">
            <h4 class="font-bold text-2xl">
                {{ $t('sidebar.conversations_title_text') }}
            </h4>
            <fr-dropdown v-model="openOptions" options-width="260px">
                <template #default="{ handleClick }">
                    <fr-button icon rounded flat class="text-sm bg-neutral-400 text-neutral-100" @click="handleClick">
                        <i class="material-icons">more_vert</i>
                    </fr-button>
                </template>
                <template #options>
                    <fr-list hoverable>
                        <fr-list-item class="text-gray-600" @click="createConv">
                            <template #avatar>
                                <i class="material-icons"> add </i>
                            </template>
                            <p class="text-gray-600 font-medium">
                                {{ $t('sidebar.new_conversation_text') }}
                            </p>
                        </fr-list-item>
                        <fr-list-item class="text-gray-600">
                            <template #avatar>
                                <i class="material-icons"> add_comment </i>
                            </template>
                            <p class="font-medium">
                                {{ $t('sidebar.join_conversation_text') }}
                            </p>
                        </fr-list-item>
                    </fr-list>
                </template>
            </fr-dropdown>
        </div>
        <ConversationsList />
        <fr-modal v-slot="{ closeModal }" v-model="showNewConvModal">
            <ConversationForm @cancel="closeModal" @created="handleCreated" />
        </fr-modal>
    </div>
</template>

<script lang="ts" setup>
import ConversationsList from '@/components/messenger/ConversationsList.vue'
import ConversationForm from '@/components/messenger/ConversationForm.vue'

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const showNewConvModal = ref(false)
const router = useRouter()
const route = useRoute()
const createConv = () => {
    openOptions.value = false
    showNewConvModal.value = true
    // // console.log('creating new conv')
}
const handleCreated = (conv) => {
    showNewConvModal.value = false
    router.push({
        name: 'Messenger Conversation',
        params: { conversationId: conv.id }
    })
}

const isConversationOpen = computed(() => {
    return route.name === 'Messenger Conversation'
})
const openOptions = ref(false)
</script>

<style lang="scss" scoped></style>
