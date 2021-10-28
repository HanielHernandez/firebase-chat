<template>
  <vee-field
    v-slot="{ errorMessage, value, field }"
    :name="name"
    :rules="rules"
  >
    <div
      class="w-full text-field"
      :class="{ 'text-red-400': error }"
      v-bind="$attrs"
    >
      <label
        v-if="title != null"
        class="block font-medium text-sm mb-1"
        for=""
        >{{ title }}</label
      >
      <input
        :model-value="value"
        v-bind="field"
        class="p-3 w-full border outline-none text-gray-900 rounded-md"
        :class="[
          !!errorMessage
            ? 'border-red-400 focus:border-red-600'
            : 'focus:border-blue-400 border-gray-300'
        ]"
        :placeholder="placeholder"
        :type="type"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <p
        v-if="!!errorMessage && hasErrorSlotPopulate == false"
        class="text-sm text-red-600 mt-1"
      >
        {{ errorMessage }}
      </p>
      <slot name="error" :errorMessage="errorMessage"></slot>
    </div>
  </vee-field>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Field as VeeField } from 'vee-validate'
export default defineComponent({
  name: 'TextField',
  components: {
    VeeField
  },
  props: {
    name: {
      type: String,
      default: () => null
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
    },
    modelValue: {
      type: String,
      default: () => null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots }) {
    //const value = ref(props.modelValue)
    const hasErrorSlotPopulate = computed(() => {
      return !!slots.error
    })
    return { hasErrorSlotPopulate }
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
