<template>
  <div class="modal fixed top-0 left-0" :class="[size]">
    <transition name="modal-background">
      <div
        v-if="isModalOpen"
        ref="modalContainer"
        class="modal-background w-screen h-screen bg-black bg-opacity-20 z-40"
        @click="closeModal"
      ></div>
    </transition>
    <transition name="modal-content">
      <div v-if="isModalOpen" class="modal-content">
        <slot :closeModal="closeModal"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { booleanProp } from '@/mixins'
import { defineComponent, ref, watch } from 'vue'
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
    const modalContainer = ref<any>(null)
    const isModalOpen = ref(props.modelValue)

    const transitionEnter = (el: any, done: () => void): void => {
      // // console.log('entra', el)
      done()
    }
    const transitionLeave = (el: any, done: () => void): void => {
      // // console.log('entra', el)
      done()
    }
    const closeModal = () => {
      isModalOpen.value = !isModalOpen.value
      emit('update:modelValue', isModalOpen.value)
    }

    watch(
      () => props.modelValue,
      (first: boolean, second: boolean) => {
        // // console.log('cambio modelo', first, second)
        isModalOpen.value = props.modelValue
      }
    )

    return {
      modalContainer,
      isModalOpen,
      closeModal,
      transitionEnter,
      transitionLeave
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
    width: 100%;
    //max-width: 600px;

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
  @each $prefix, $size in $modal-sizes {
    &.#{$prefix} {
      .modal {
        &-content {
          max-width: $size;
        }
      }
    }
  }
}
</style>
