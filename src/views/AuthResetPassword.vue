<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 md:w-1/3 xl:w-1/4 px-4">
      <h3 class="text-3xl font-bold text-gray-900 text-center mb-6 t">
        {{ $t('signup.title') }}
      </h3>

      <div class="w-full w-lg flex flex-col rounded border p-4">
        <vee-form
          v-slot="{ meta }"
          :initial-values="initialValues"
          @submit="(values) => handleSubmit(values)"
        >
          <TextField
            name="email"
            rules="required|email"
            type="password"
            :title="$t('auth.email')"
            :placeholder="$t('signup.email_placeholder')"
            class="mb-3"
          />

          <fr-button
            :disabled="loading || !meta.valid"
            type="submit"
            block
            :loading="loading"
            color="primary w-full"
            class="text-white"
            >{{ $t('signup.button_text') }}</fr-button
          >

          <div class="border-t my-3"></div>

          <p class="text-sm font-medium text-center text-gray-600">
            {{ t('signup.already_registered_text') }}
            <router-link
              to="sign-in"
              class="text-blue-600 opacity-75 hover:opacity-100"
            >
              {{ t('signup.click_here_text') }}
            </router-link>
          </p>
        </vee-form>
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/layouts/CenteredLayout.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { type RegisterRequest } from '@/models/auth'
import { Form as VeeForm, type GenericObject } from 'vee-validate'
export default {
  components: { CenteredLayout, VeeForm },
  setup() {
    const { t } = useI18n()
    const loading = ref(false)
    const initialValues = ref({
      email: ''
    })

    // fields instance

    const handleSubmit = async (values: GenericObject): Promise<void> => {
      loading.value = true
      try {
      
        ///const response = await Auth.register(values as RegisterRequest)
        console.log(values)
        alert('usuario guardado')
        loading.value = false
      } catch (e) {
        console.error(e)
        loading.value = false
        alert(e)
      }
    }

    return {
      initialValues,
      loading,
      handleSubmit,
      t
    }
  }
}
</script>

<style lang="scss" scoped></style>
