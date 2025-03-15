<template>
    <div
        class="fixed top-0 flex left-0 min-h-18 w-screen md:pl-100 justify-between z-10 border-b bg-white border-neutral-300"
    >
        <div class="py-2 flex flex-row items-center justify-start">
            <router-link
                to="/messenger"
                class="text-neutral-600 p-2 rounded-full text-center h-10 w-10 hover:bg-neutral-200 md:hidden"
            >
                <span class="material-icons">arrow_back</span>
            </router-link>
            <div v-if="recipient" class="flex flex-row flex-nowrap items-center">
                <img
                    :src="
                        recipient.profileImageUrl
                            ? recipient.profileImageUrl
                            : `https://ui-avatars.com/api/?name=${recipient.name}`
                    "
                    alt=""
                    class="rounded-full w-10 h-10 ml-2 mr-4"
                />
                <div class="flex flex-col gap-1">
                    <at-text variant="h4" class="text-lg leading-6 md:pl-0 text-neutral-900 font-bold">
                        {{ recipient.name }}
                    </at-text>
                    <at-text v-if="lastMessage" class="text-sm font-base leading-5 text-neutral-500">
                        {{ formatDate(lastMessage.date) }}
                    </at-text>
                </div>
            </div>
        </div>

        <div class="flex justify-items-end items-center">
            <!-- <fr-dropdown class="ml-4" options-width="250px" align="right">
                <template #default="{ handleClick }">
                    <div
                        v-if="currentUser"
                        class="flex p-2 rounded-full justify-end items-center transition-colors duration-300 easin-out flex-nowrap hover:bg-gray-900/20"
                        @click="handleClick"
                    >
                        <img
                            :src="
                                currentUser.profileImageUrl
                                    ? currentUser.profileImageUrl
                                    : `https://ui-avatars.com/api/?name=${currentUser.name}`
                            "
                            width="40"
                            height="40"
                            alt=""
                            class="rounded-full md:mr-3"
                        />
                        <div class="hidden md:block">
                            <p class="font-bold leading-none text-gray-900">
                                {{ currentUser.name }}
                            </p>
                            <small class="text-gray-600">{{ currentUser.code }}</small>
                        </div>
                    </div>
                </template>

                <template #options>
                    <fr-list hoverable bordered>
                        <fr-list-item>
                            <template #avatar>
                                <i class="material-icons">person</i>
                            </template>
                            <a href="#/messenger" class="text-gray-600" @click="logout">
                                {{ $t('navbar.my_profile_text') }}
                            </a>
                        </fr-list-item>

                        <fr-list-item>
                            <template #avatar>
                                <i class="material-icons">logout</i>
                            </template>
                            <a href="#" class="text-gray-600" @click="logout">
                                {{ $t('navbar.log_out_text') }}
                            </a>
                        </fr-list-item>
                    </fr-list>
                </template>
            </fr-dropdown> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatFromToday } from '@/plugins/date'
import { useConversationsStore } from '@/store/conversations.store'
import { computed } from 'vue'

const conversationStore = useConversationsStore()

const recipient = computed(() => {
    return conversationStore.selected && conversationStore.selected.recipient
})
const lastMessage = computed(() => {
    return conversationStore.selected?.lastMessage
})

const formatDate = formatFromToday
</script>

<style lang="scss" scoped></style>
