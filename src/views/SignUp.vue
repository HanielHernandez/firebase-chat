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
          @submit="register"
        >
          <TextField
            name="name"
            rules="required"
            type="text"
            :title="$t('auth.name')"
            :placeholder="$t('signup.name_placeholder')"
            class="mb-3"
          />
          <TextField
            name="email"
            rules="required|email"
            type="email"
            :title="$t('auth.email')"
            :placeholder="$t('signup.email_placeholder')"
            class="mb-3"
          />
          <TextField
            name="password"
            rules="required"
            type="password"
            :title="$t('auth.password')"
            :placeholder="$t('signup.password_placeholder')"
            class="mb-3"
          />
          <TextField
            name="confirm_password"
            rules="required"
            type="password"
            :title="$t('auth.confirm_password')"
            :placeholder="$t('signup.confirm_password_placeholder')"
            class="mb-3"
          />
          <fr-button
            :disabled="loading || !meta.valid"
            type="submit"
            block
            :loading="loading"
            color="blue-600 w-full"
            class="text-white"
            >{{ $t('signup.button_text') }}</fr-button
          >

          <div class="border-t my-3"></div>

          <p class="text-sm font-medium text-center text-gray-600">
            {{ $t('signup.already_registered_text') }}
            <router-link
              to="sign-in"
              class="text-blue-600 opacity-75 hover:opacity-100"
            >
              {{ $t('signup.click_here_text') }}
            </router-link>
          </p>
        </vee-form>
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/Layouts/CenteredLayout.vue'
import { useForm, useField } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import Auth from '@/plugins/firebase/auth'
import { RegisterRequest } from '@/models/auth'
import { Form as VeeForm } from 'vee-validate'
export default {
  components: { CenteredLayout, VeeForm },
  setup(): unknown {
    const { t } = useI18n()
    const loading = ref(false)
    const initialValues = ref({
      name: ''
    })

    // fields instance

    const register = async (values: RegisterRequest): Promise<void> => {
      loading.value = true
      try {
        const response = await Auth.register(values as RegisterRequest)
        console.log(response)
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
      register
    }
  }
}
</script>

<style lang="scss" scoped></style>
