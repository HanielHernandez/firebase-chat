<template>
  <div>
    <TheNavbar />
    <slot></slot>
  </div>
</template>

<script>
import TheNavbar from '@/components/layouts/TheNavbar.vue'
export default {
  components: { TheNavbar }
}
</script>

<style lang="scss" scoped></style>
