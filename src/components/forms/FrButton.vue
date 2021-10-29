<template>
  <component
    v-bind="$attrs"
    :is="as"
    :disabled="disabled"
    :type="type"
    class="px-4 py-2 font-bold rounded border-gray-300 focus:border-blue-700"
    :class="[
      block ? 'block' : 'inline-block',
      color ? colorClass : 'border',
      disabled ? 'opacity-75' : ''
    ]"
  >
    <div class="flex justify-center items-center">
      <slot v-if="!loading"></slot>
      <FrLoading v-else />
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import FrLoading from './FrLoading.vue'
export default defineComponent({
  name: 'FrButton',
  components: { FrLoading },
  props: {
    disabled: {
      type: Boolean,
      default: () => false
    },
    as: {
      type: String,
      default: () => 'button'
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    block: {
      type: Boolean,
      default: () => false
    },
    color: {
      type: String,
      default: () => null
    },
    type: {
      type: String,
      default: () => 'button'
    }
  },
  setup(props) {
    const classes = computed(() => {
      return {
        block: props.block
      }
    })
    const colorClass = computed(() => `bg-${props.color}`)
    return { classes, colorClass }
  }
})
</script>

<style scoped></style>
