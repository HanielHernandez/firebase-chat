<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 md:w-1/3 xl:w-1/4 px-4">
      <h3 class="text-3xl font-bold text-gray-900 text-center mb-6 t">
        {{ $t('signin.title') }}
      </h3>

      <div class="w-full w-lg flex flex-col rounded-md border p-4">
        <vee-form
          v-slot="{ meta }"
          :initial-values="initialValues"
          @submit="handleSubmit"
        >
          <TextField
            type="email"
            name="email"
            :title="$t('auth.email')"
            placeholder="Your email"
            class="mb-3"
          />
          <TextField
            type="password"
            name="password"
            :title="$t('auth.password')"
            placeholder="Your Password"
          />
          <div
            class="
              text-right text-sm
              mt-2
              text-gray-500
              hover:text-blue-600
              mb-4
            "
          >
            <a href="">{{ $t('signin.forgot_password_text') }}?</a>
          </div>
          <fr-button
            :disabled="loading || !meta.valid"
            type="submit"
            block
            :loading="loading"
            color="blue-600 w-full"
            class="text-white"
            >{{ $t('signin.button_text') }}</fr-button
          >

          <div class="border-t my-3"></div>

          <p class="text-sm font-medium text-center text-gray-600">
            {{ $t('signin.no_account_text') }}
            <router-link
              to="sign-up"
              class="text-blue-600 opacity-75 hover:opacity-100"
            >
              {{ $t('signin.click_here_text') }}
            </router-link>
          </p>
        </vee-form>
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/Layouts/CenteredLayout.vue'
import { defineComponent } from 'vue'
import { Form as VeeForm } from 'vee-validate'
import { ref } from 'vue'
export default defineComponent({
  components: { CenteredLayout, VeeForm },
  setup() {
    const intialValues = ref({
      name: '',
      email: ''
    })
    const loading = ref(false)

    return { loading, intialValues }
  }
})
</script>

<style scoped></style>
