<template>
  <div :id="id" ref="container" class="h-96">
    <transition name="loading" mode="in-out" tag="div">
      <slot v-if="hasReachLoading" name="loading"></slot>
    </transition>
    <slot name="endReached"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'FrInfiniteScroll',
  props: {
    id: {
      type: String,
      default: () => 'infiniteScroll'
    },
    treeshHold: {
      type: Number,
      default: () => 0.2
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const hasReachLoading = ref(false)
    const observer = ref<IntersectionObserver | null>()
    const hasReachEnd = ref(false)
    const onLoadingEnded = () => {
      hasReachLoading.value = false
    }
    const onEnd = () => {
      hasReachEnd.value = true
    }
    onMounted(() => {
      // // console.log(container.value)
      if (container.value != null) {
        observer.value = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting && hasReachEnd.value == false) {
            hasReachLoading.value = true
            emit('loadMore', { onLoadingEnded, onEnd })
          }
        }, props.options)

        observer.value.observe(container.value)
      }
    })
    onUnmounted(() => {
      if (observer.value) {
        observer.value.disconnect
      }
    })

    return {
      hasReachLoading,
      container,
      observer
    }
  }
})
</script>

<style scoped lang="scss">
.loading {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-in-out;
  }

  &-enter-to,
  &-leave-for {
    opacity: 1;
  }
}
</style>
