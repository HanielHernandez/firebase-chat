<template>
  <component
    v-bind="$attrs"
    :is="as"
    class="px-4 py-2 font-bold rounded-md border-gray-300 focus:border-blue-700"
    :class="[block ? 'block' : 'inline-block', color ? colorClass : 'border']"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'FrButton',
  props: {
    as: {
      type: String,
      default: () => 'button'
    },
    block: {
      type: Boolean,
      default: () => false
    },
    color: {
      type: String,
      default: () => null
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
