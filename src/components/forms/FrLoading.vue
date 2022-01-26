<template>
  <div
    class="inline-block rounded-full animate-spin spinner"
    :class="classes"
    v-bind="$attrs"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { computed } from 'vue'
export default defineComponent({
  name: 'FrLoading',
  props: {
    color: {
      type: String,
      default: () => 'primary'
    },
    thickness: {
      type: [String, Number],
      default: () => 4
    },
    size: {
      type: [String, Number],
      default: () => 6
    }
  },
  setup(props) {
    const getColorClass = computed((): string => {
      switch (props.color) {
        case 'primary':
          return 'border-blue-400'
        case 'secondary':
          return 'border-gray-400'
        case 'danger':
          return 'border-red-400'
        default:
          return 'border-gray-400'
      }
    })
    const getBorderClas = computed(() => {
      switch (props.thickness) {
        case 'primary':
          return 'border-1'
        case 'secondary':
          return 'border-2'
        case 'danger':
          return 'border-3'
        default:
          return 'border-4'
      }
    })
    const classes = computed(() => {
      const colorClass = getColorClass.value
      const sizeClass = `h-${props.size} w-${props.size}`
      const borderClass = getBorderClas.value
      return [colorClass, sizeClass, borderClass]
    })
    return {
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.spinner {
  border-left-color: #fff;
}
</style>
