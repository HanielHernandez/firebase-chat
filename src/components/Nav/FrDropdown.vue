<template>
  <div class="position relative dorpwodn-container">
    <div class="cursor-pointer">
      <slot :handleClick="handleClick" name="default"></slot>
    </div>

    <div
      class="
        bg-white
        position
        absolute
        border
        rounded
        z-40
        shadow-md
        overflow-hidden
        transitions-all
        duration-150
        ease-in-out
      "
      :class="[align == 'left' ? 'left-0' : 'right-0']"
      :style="{
        top: '100%',
        width: optionsWidth,
        opacity: isOpen ? 1 : 0,
        height: isOpen ? `${contentHeight}px` : 0
      }"
    >
      <div ref="optionsContainer">
        <slot name="options"></slot>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="w-screen h-screen z-30 fixed top-0 right-0 opacity-0"
      @click="handleClick"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'FrDropdown',
  props: {
    optionsWidth: {
      type: [String, Number],
      default: () => '150px'
    },
    align: {
      type: String,
      default: () => 'left'
    }
  },
  setup(props) {
    const isOpen = ref(false)
    const optionsContainer = ref<any>(null)

    const contentHeight = computed(() =>
      optionsContainer.value ? optionsContainer.value.clientHeight : 0
    )

    const handleClick = () => {
      isOpen.value = !isOpen.value
    }
    onMounted(() => {
      console.log(props.align)
    })
    return {
      isOpen,
      optionsContainer,
      contentHeight,
      handleClick
    }
  }
})
</script>

<style scoped></style>
