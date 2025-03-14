<template>
    <div :id="`message-${message.id}`" class="message w-full flex py-4" :class="{ 'justify-end': sender }">
        <div
            class="message-inner group flex flex-nowrap items-center relat"
            :class="{
                'flex-row-reverse': sender,
                'justify-center': message.senderId == 'SYSTEM'
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
                class="p-4 rounded-md shadow-sm text-gray-900 max-w-full break-words w-full md:max-w-lg xl:max-w-xl"
                :class="{
                    'bg-blue-200': sender,
                    'bg-yellow-100': message.senderId != 'SYSTEM' && !sender
                }"
            >
                {{ message.text }}
                <br />
                <p class="text-gray-500 text-xs" :class="{ 'text-right': sender }">
                    {{ formateDateTime(message.date) }}
                </p>
            </div>

            <fr-button
                flat
                rounded
                class="text-neutral-600 text-sm bg-transparent hover:bg-neutral-300 group-hover:opacity-100 opacity-0"
                :class="{ 'mr-2': sender, 'ml-2': !sender }"
            >
                <i class="material-icons">more_vert</i>
            </fr-button>
            <div
                :class="{ 'mr-2': sender, 'ml-2': !sender }"
                class="message-date-tooltip hidden md:blokc absolute top-0 md:relative md:top-auto bg-black/30 text-xs px-4 py-2 text-white rounded-full"
            >
                {{ formatDate(message.date) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useUser } from '@/mixins'
import { type Message } from '@/models/message'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { computed, defineComponent, type PropType } from 'vue'

dayjs.extend(LocalizedFormat)

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
            return currentUser.value ? currentUser.value.id == props.message.senderId : false
        })

        const formateDateTime = (date: number): string => {
            return dayjs(date).format('hh:mm a')
        }

        const formatDate = (date: number): string => {
            return dayjs(date).format('DD MMMM YYYY hh:mm a')
        }
        return {
            sender,
            formatDate,
            formateDateTime,
            currentUser
        }
    }
})
</script>

<style scoped lang="scss">
.message {
    &-inner {
        transition: all 0.3s cubic-bezier(0.42, 0, 0.52, 2.04);

        .message {
            &-date-tooltip {
                opacity: 0;
            }
        }

        &:hover {
            .message {
                &-date-tooltip {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
