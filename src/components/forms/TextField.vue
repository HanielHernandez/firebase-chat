<template>
  <div
    class="w-full text-field"
    :class="{ 'text-red-400': error }"
    v-bind="$attrs"
  >
    <label v-if="title != null" class="block font-medium text-sm mb-1" for="">{{
      title
    }}</label>
    <input
      class="
        p-3
        w-full
        border
        outline-none
        text-gray-900
        focus:border-blue-400
        border-gray-300
        rounded-md
      "
      :placeholder="placeholder"
      :type="type"
    />
    <slot name="error"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextField',
  props: {
    error: {
      type: Boolean,
      default: () => false
    },
    type: {
      type: String,
      default: () => 'text'
    },
    title: {
      type: String,
      default: () => null
    },
    placeholder: {
      type: String,
      default: () => null
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.text-field {
  &:not(:nth-last-child()) {
    margin-bottom: 1rem;
  }
}
</style>
