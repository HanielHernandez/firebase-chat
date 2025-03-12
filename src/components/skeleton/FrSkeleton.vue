<template>
  <div
    v-bind="$attrs"
    :style="{ width, height: circle ? width : height }"
    class="fr-skeleton"
    :class="{ circle: circle }"
  ></div>
</template>

<script lang="ts">
export default {
  name: 'FrSkeleton',
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  width: {
    type: [String, Number],
    default: () => '100%'
  },
  height: {
    type: [String, Number],
    default: () => '1.25rem'
  },
  circle: {
    type: Boolean,
    default: () => false
  }
})
</script>

<style lang="scss" scoped>
.fr-skeleton {
  overflow: hidden;
  display: inline-block;
  position: relative;
  &.circle {
    @apply rounded-full;
  }
  &:not(.circle) {
    @apply rounded;
  }
  background-color: rgba(0, 0, 0, 0.1);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      45deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.1) 20%,
      rgba(#fff, 0.3) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
