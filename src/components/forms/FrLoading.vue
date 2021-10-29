<template>
  <div
    class="w-6 h-6 border-4 border-blue-400 rounded-full animate-spin"
    style="border-left-color: #fefefe"
    v-bind="$attrs"
  ></div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: () => 'border-blue-600'
    }
  }
}
</script>

<style lang="scss" scoped></style>
