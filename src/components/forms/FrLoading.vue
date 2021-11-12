<template>
  <div
    class="inline-block border-blue-400 rounded-full animate-spin"
    :class="[`h-${size} w-${size}`, `border-${thickness}`]"
    style="border-left-color: #fefefe"
    v-bind="$attrs"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'FrLoading',
  props: {
    color: {
      type: String,
      default: () => 'border-blue-600'
    },
    thickness: {
      type: [String, Number],
      default: () => 4
    },
    size: {
      type: [String, Number],
      default: () => 6
    }
  }
})
</script>

<style lang="scss" scoped></style>
