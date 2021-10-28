<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 md:w-1/3 px-4">
      <h3 class="text-2xl font-black mb-4 t">Wellcome To firechat</h3>
      <div class="w-full w-lg flex flex-col rounded-md border p-4">
        <TextField
          type="email"
          title="Email"
          placeholder="Your email"
          class="mb-3"
        />
        <TextField
          type="password"
          title="Password"
          placeholder="Your Password"
        />
        <div
          class="text-right text-sm mt-2 text-gray-500 hover:text-blue-600 mb-4"
        >
          <a href="">Forgot password?</a>
        </div>
        <fr-button color="blue-600" class="text-white">Log In</fr-button>
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/Layouts/CenteredLayout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CenteredLayout },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
