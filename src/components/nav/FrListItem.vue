<template>
  <li
    class="
      flex
      justify-between
      items-center
      align-center
      w-full
      fr-list-item
      py-3
      px-4
      cursor-pointer
    "
  >
    <div
      class="flex justify-center items-center"
      :class="[hasAvatar ? 'mr-4' : '']"
    >
      <slot name="avatar"></slot>
    </div>
    <div class="flex flex-col flex-1 overflow-hidden">
      <slot></slot>
    </div>
    <div>
      <slot name="end"></slot>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue'
import { booleanProp } from '@/mixins'
export default {
  name: 'FrListItem',
  props: {
    hoverable: booleanProp(false)
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      return [props.hoverable ? 'hover:bg-gray-900 hover:bg-opacity-30' : '']
    })
    const hasAvatar = computed(() => !!slots.avatar)
    return { classes, hasAvatar }
  }
}
</script>

<style lang="scss" scoped></style>
