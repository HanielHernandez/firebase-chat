<template>
  <ul class="fr-list flex flex-col flex-nowrap" :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { booleanProp } from '@/mixins'
export default {
  name: 'FrList',
  props: {
    hoverable: booleanProp(false),
    boredered: booleanProp(false)
  },
  setup(props) {
    const classes = computed(() => {
      return [
        props.hoverable
          ? 'hoverable trasition-colors easin-in-out duration-300'
          : '',
        props.boredered ? 'bordered' : ''
      ]
    })
    return { classes }
  }
}
</script>

<style lang="scss">
.fr-list {
  &.rounded {
    .fr-list {
      &-item {
        &:first-child {
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }
        &:last-child {
          border-bottom-left-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
      }
    }
  }
  &.hoverable {
    .fr-list {
      &-item {
        &:hover {
          //background-color: $hoverable-color;
        }
      }
    }
  }

  &.boredered {
    .fr-list {
      &-item {
        &:not(:last-child) {
          @apply border-b border-gray-300;
        }
      }
    }
  }
}
</style>
