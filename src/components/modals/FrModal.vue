<template>
    <div v-if="isModalOpen" class="modal p-4 fixed top-0 left-0 w-screen h-screen" :class="[size]">
        <transition name="modal-background ">
            <div
                v-if="isModalOpen"
                ref="modalContainer"
                class="modal-background absolute top-0 left-0 w-full h-full bg-black/20 z-40"
                @click="closeModal"
            />
        </transition>
        <transition name="modal-content ">
            <div v-if="isModalOpen" class="modal-content z-50 p-4 w-full md:w-2xl">
                <slot :close-modal="closeModal"></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { booleanProp } from '@/mixins'
import { defineComponent, ref, useTemplateRef, watch } from 'vue'
export default defineComponent({
    name: 'FrModal',
    props: {
        modelValue: booleanProp(false),
        size: {
            type: String,
            default: () => 'default'
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const modalContainer = useTemplateRef<HTMLElement>('modalContainer')
        const isModalOpen = ref(props.modelValue)

        // const transitionEnter = (el: any, done: () => void): void => {
        //   // // console.log('entra', el)
        //   done()
        // }
        // const transitionLeave = (el: any, done: () => void): void => {
        //   // // console.log('entra', el)
        //   done()
        // }

        const closeModal = () => {
            isModalOpen.value = !isModalOpen.value
            emit('update:modelValue', isModalOpen.value)
        }

        watch(
            () => props.modelValue,
            () => {
                // // console.log('cambio modelo', first, second)
                isModalOpen.value = props.modelValue
            }
        )

        return {
            modalContainer,
            isModalOpen,
            closeModal
            // transitionEnter,
            // transitionLeave
        }
    }
})
</script>

<style scoped lang="scss">
.modal {
    &-background {
        &-enter-to {
            opacity: 1;
        }
        &-enter-active,
        &-leave-active {
            transition: opacity 0.3s ease-in-out;
        }
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
    &-content {
        position: fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &-enter-to {
            transform: translate(-50%, -50%) scale(1);
        }
        &-enter-active,
        &-leave-active {
            transition: transform 0.3s ease-in-out;
        }
        &-enter-from,
        &-leave-to {
            transform: translate(-50%, -50%) scale(0);
        }
    }
}
</style>
