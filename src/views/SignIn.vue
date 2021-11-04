<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 md:w-1/3 xl:w-1/4 px-4">
      <div class="text-center">
        <img
          src="@/assets/logo.svg"
          class="mx-auto mb-4"
          alt=""
          width="150"
          height="150"
        />
      </div>

      <fr-alert
        v-if="message.text"
        show-dismiss
        type="error"
        @onClose="message.text = null"
      >
        {{ message.text }}
      </fr-alert>

      <div class="w-full w-lg flex flex-col rounded border p-4">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-4 t">
          {{ $t('signin.title') }}
        </h3>
        <vee-form
          v-slot="{ meta }"
          :initial-values="initialValues"
          @submit="handleSubmit"
        >
          <TextField
            type="email"
            name="email"
            rules="required|email"
            :title="$t('auth.email')"
            placeholder="Your email"
            class="mb-3"
          />
          <TextField
            type="password"
            rules="required"
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
            <router-link :to="{ name: 'ForgotPassword' }">
              {{ $t('signin.forgot_password_text') }}
            </router-link>
          </div>
          <fr-button
            :disabled="loading || !meta.valid"
            type="submit"
            block
            :loading="loading"
            color="blue-600"
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
import { LoginRequest } from '@/models/auth'
import auth from '@/plugins/firebase/auth'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { EMAIL_NOT_VERIFIED } from '@/config/variables'

export default defineComponent({
  components: { CenteredLayout, VeeForm },
  setup() {
    const initialValues = ref({
      name: '',
      email: ''
    })
    const { t } = useI18n()
    const message = ref<{
      type: string
      text: string | null
    }>({
      type: 'success',
      text: null
    })
    const showSuccessMessage = ref(true)
    const store = useStore()
    const setCurrentUser = () => store.dispatch('fetchCurrentUser')
    const errorMessage = ref()
    const router = useRouter()
    const loading = ref(false)
    const handleSubmit = async (values: LoginRequest): Promise<void> => {
      loading.value = true
      try {
        const response = await auth.singin(values)
        // // console.log(response)
        setCurrentUser()
        router.push({ name: 'Messenger' })
        loading.value = false
      } catch (e: any) {
        // // console.log(e.code, e.message)
        message.value.type = 'error'
        if (e.code && e.message) {
          if (e.code == 'auth/user-not-found') {
            message.value.text = t('auth.user_not_found_text')
          } else {
            message.value.text = `Error ${e.code}: ${e.message}`
          }
        } else {
          if (e == EMAIL_NOT_VERIFIED) {
            message.value.text = t('signin.email_not_verified_text')
          }
        }

        console.error(e)

        loading.value = false
      }
    }

    return {
      showSuccessMessage,
      loading,
      initialValues,
      handleSubmit,
      message,
      errorMessage
    }
  }
})
</script>

<style scoped></style>
