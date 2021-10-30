<template>
  <component
    v-bind="$attrs"
    :is="as"
    :disabled="disabled"
    :type="type"
    class="font-bold rounded focus:border-blue-700"
    :class="classes"
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
      default: () => 'gray-600 text-gray-900'
    },
    type: {
      type: String,
      default: () => 'button'
    },
    flat: {
      type: Boolean,
      default: () => false
    },
    bordered: {
      type: Boolean,
      default: () => false
    },
    rounded: {
      type: Boolean,
      default: () => false
    },
    icon: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const classes = computed(() => {
      const borderClass = `border border-${props.color} text-${props.color}`
      const flatClass = 'bg-gray-600 bg-opacity-0 hover:bg-opacity-30'
      const paddingClass = props.rounded ? 'px-2 py-2' : 'px-4 py-2'
      const colorClass = `bg-${props.color}`

      return [
        props.block ? 'block w-full' : 'inline-block',
        props.flat ? flatClass : '',
        colorClass,
        paddingClass,
        props.disabled ? 'opacity-75' : '',
        props.rounded ? 'rounded-full px-2 py-2' : '',
        props.bordered ? borderClass : ''
      ]
    })
    return { classes }
  }
})
</script>

<style scoped></style>
