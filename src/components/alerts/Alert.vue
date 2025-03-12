<template>
  <div
    class="rounded p-4 mb-4"
    :class="{
      'text-red-600 bg-red-100 relative border-red-300': type == 'error',
      'text-green-600 bg-green-100 relative border-green-300':
        type == 'success',
      'text-yellow-600 bg-yellow-100 relative border-yellow-300':
        type == 'warning',
      'text-blue-600 bg-blue-100 relative border-blue-300': type == 'info'
    }"
  >
    <button v-if="showDismiss" class="close" @click="handlelOnClose"></button>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { booleanProp } from '@/mixins'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'FrAlert',
  props: {
    type: {
      type: String,
      default: () => 'success'
    },
    showDismiss: booleanProp(false),
    modelValue: booleanProp(false)
  },
  emits: ['update:modelValue', 'onClose'],
  setup(props, { emit }) {
    const open = ref(props.modelValue)
    // if model value updated emit
    const handlelOnClose = () => {
      emit('onClose', true)
    }
    watch(
      () => props.modelValue,
      (from: boolean, to: boolean) => {
        // // console.log('cambio', from, to)
        open.value = props.modelValue
      }
    )

    return {
      open,
      handlelOnClose
    }
  }
})
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  @apply rounded-full w-6 h-6;
  right: 0;
  top: 0;

  &:before,
  &:after {
    @apply bg-gray-900 w-1/2;
    height: 2px;
    position: absolute;
    display: block;
    top: 50%;

    left: 50%;
    content: '';
    border-radius: 5px;
    transform-origin: center center;
  }
  &:before {
    @apply transform rotate-45 -translate-x-2/4 -translate-y-2/4;
  }
  &:after {
    @apply transform -rotate-45 -translate-x-2/4 -translate-y-2/4;
  }
}
</style>
