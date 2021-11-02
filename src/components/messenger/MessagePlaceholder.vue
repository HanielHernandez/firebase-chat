<template>
  <div class="w-100 flex py-4" :class="{ 'justify-end': sender }">
    <div
      class="flex w-4/6 md:w-2/5 items-center justify-start jst"
      :class="{ 'flex-row-reverse': sender }"
    >
      <fr-skeleton
        circle
        width="2.5rem"
        class="flex-shrink-0"
        :class="[sender ? 'ml-2' : 'mr-2']"
      >
      </fr-skeleton>
      <fr-skeleton class="w-1/3" height="100px"> </fr-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { booleanProp } from '@/mixins'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FrMessagePlaceholder',
  props: {
    sender: booleanProp(false)
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
