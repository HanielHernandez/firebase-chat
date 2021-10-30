<template>
  <div class="fr-card bg-white" :class="classes">
    <div v-if="hasSlotPopulated('title')" class="pt-4 px-4 pb-2">
      <slot name="title"></slot>
    </div>
    <div class="fr-card-body">
      <slot></slot>
    </div>
    <div class="fr-card-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { booleanProp } from '@/mixins'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'FrCard',
  props: {
    alert: booleanProp(false),
    square: booleanProp(false),
    bordered: booleanProp(false),
    flat: booleanProp(false),
    width: {
      type: String,
      default: () => 'auto'
    }
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      return [
        props.bordered ? 'bodered border-gray-300' : '',
        !props.flat ? 'shadow-md' : '',
        props.square ? '' : 'rounded'
      ]
    })
    const hasSlotPopulated = (slotsName: string): boolean => {
      return !!slots[slotsName]
    }
    return { classes, hasSlotPopulated }
  }
})
</script>

<style scoped lang="scss">
.fr-card {
  width: 100%;
  &-title {
    @apply text-xl font-bold;
  }
  &-body {
    @apply px-4 py-2;
    &:first-child {
      @apply pt-4;
    }
    &:last-child {
      @apply pb-4;
    }
  }
  &-actions {
    @apply pt-2 px-4 pb-4;
  }
}
</style>
