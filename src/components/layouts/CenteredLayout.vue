<template>
  <div class="container-xl mx-auto w-full">
    <div class="flex h-screen justify-center w-full items-center ">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
