<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 md:w-1/3 xl:w-1/4 px-4">
      <h3 class="text-3xl font-bold text-gray-900 text-center mb-6 t">
        {{ $t('signin.title') }}
      </h3>
      <div
        v-if="errorMessage"
        class="text-red-600 bg-red-100 relative border-red-300 rounded p-4 mb-4"
      >
        {{ errorMessage }}
        <button
          type="button"
          class="
            rounded-full
            w-6
            h-6
            p-1
            shadow-xl
            text-xs
            bg-red-400
            absolute
            text-gray-900
            bold
            -top-3
            -right-3
          "
          @click="errorMessage = ''"
        >
          x
        </button>
      </div>

      <div class="w-full w-lg flex flex-col rounded border p-4">
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

export default defineComponent({
  components: { CenteredLayout, VeeForm },
  setup() {
    const initialValues = ref({
      name: '',
      email: ''
    })
    const { t } = useI18n()
    const store = useStore()
    const setCurrentUser = () => store.dispatch('fetchCurrentUser')
    const errorMessage = ref()
    const router = useRouter()
    const loading = ref(false)
    const handleSubmit = async (values: LoginRequest): Promise<void> => {
      loading.value = true
      try {
        const response = await auth.singin(values)
        console.log(response)
        setCurrentUser()
        router.push({ name: 'Messenger' })
        loading.value = false
      } catch (e: any) {
        console.log(e.code, e.message)

        if (e.code && e.message) {
          if (e.code == 'auth/user-not-found') {
            errorMessage.value = t('auth.user_not_found_text')
          } else {
            errorMessage.value = `Error ${e.code}: ${e.message}`
          }
        }

        console.error(e)

        loading.value = false
      }
    }

    return { loading, initialValues, handleSubmit, errorMessage }
  }
})
</script>

<style scoped></style>
