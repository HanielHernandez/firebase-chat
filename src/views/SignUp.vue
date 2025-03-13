<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 w-full md:w-md xl:w-lg px-4">
      <h3 class="text-3xl font-bold text-gray-900 text-center mb-6 t">
        {{ $t('signup.title') }}
      </h3>
      <fr-alert v-if="message.message" show-dismiss :type="message.type" @onClose="message.message = null">
        {{ message.message }}
      </fr-alert>
      <div class="w-full md:w-lg flex flex-col rounded border border-neutral-300 p-4">
        <vee-form v-slot="{ meta }" :initial-values="initialValues" @submit="(values)=>register(values as RegisterRequest)">
          <TextField name="name" rules="required" type="text" :title="$t('auth.name')"
            :placeholder="$t('signup.name_placeholder')" class="mb-4" />
          <TextField name="email" rules="required|email" type="email" :title="$t('auth.email')"
            :placeholder="$t('signup.email_placeholder')" class="mb-4" />
          <TextField name="phoneNumber" rules="required" type="text" :title="$t('auth.phone_number')"
            :placeholder="$t('signup.phonumber_placeholder')" class="mb-4" />
          <TextField name="password" rules="required" type="password" :title="$t('auth.password')"
            :placeholder="$t('signup.password_placeholder')" class="mb-4" />
          <TextField name="confirmPassword" rules="required" type="password" :title="$t('auth.confirm_password')"
            :placeholder="$t('signup.confirm_password_placeholder')" class="mb-4" />
          <fr-button  :disabled="loading || !meta.valid" type="submit" block :loading="loading" color="primary">{{
            $t('signup.button_text') }}</fr-button>

          <div class="border-t  border-neutral-300 my-4"></div>

          <p class="text-sm font-medium text-center text-gray-600">
            {{ $t('signup.already_registered_text') }}
            <router-link to="sign-in" class="text-blue-600 opacity-75 hover:opacity-100">
              {{ $t('signup.click_here_text') }}
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
import Auth from '@/plugins/firebase/auth'
import { type RegisterRequest } from '@/models/auth'
import { Form as VeeForm } from 'vee-validate'
import { useAlerts } from '@/mixins'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { CenteredLayout, VeeForm },
  setup: () => {
    const { t } = useI18n()
    const loading = ref(false)
    const initialValues = ref({
      name: ''
    })
    const { message } = useAlerts('succcess')

    // fields instance

    const register = async (values: RegisterRequest): Promise<void> => {
      //// // console.log(values)

      loading.value = true
      try {
        await Auth.register(values as RegisterRequest)
        // // console.log(response)
        message.value.type = 'success'
        message.value.message = t('signup.success_message')
        loading.value = false
      } catch (e) {
        console.error(e)
        message.value.type = 'error'
        message.value.message = t('signup.error_message')
        loading.value = false
        // alert(e)
      }
    }

    return {
      initialValues,
      loading,
      t,
      register,
      message
    }
  }
})
</script>
<style lang="scss" scoped></style>
