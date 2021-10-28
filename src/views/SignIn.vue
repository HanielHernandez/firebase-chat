<template>
  <centered-layout>
    <div class="flex flex-col md:mx-0 md:w-1/3 px-4">
      <h3 class="text-2xl font-black text-center mb-4 t">
        Register a new firechat account
      </h3>
      <div class="w-full w-lg flex flex-col rounded-md border p-4">
        <form @submit="register">
          <TextField
            v-model="name"
            type="text"
            :error="nameError != null"
            :error-message="nameError"
            :title="$t('signin.name')"
            placeholder="An User name"
            class="mb-3"
          />

          <TextField
            v-model="email"
            type="email"
            :error="!!emailError"
            :error-message="emailError"
            :title="$t('signin.email')"
            placeholder="Your email"
            class="mb-3"
          />

          <TextField
            v-model="password"
            type="password"
            :title="$t('signin.password')"
            class="mb-3"
            :error="!!passwordError"
            :error-message="passwordError"
            placeholder="Your Password"
          />

          <TextField
            v-model="passwordConfirmation"
            type="password"
            title="Password Confirmation"
            :error="!!passwordConfirmationError"
            :error-message="passwordConfirmationError"
            placeholder="Confirm your password"
            class="mb-4"
          />

          <fr-button
            :disabled="form.isSubmitting"
            type="submit"
            block
            color="blue-600 w-full"
            class="text-white mb-2"
            >Sign In</fr-button
          >

          <p class="text-sm text-center text-gray-600">
            Already have an account?
            <router-link
              to="log-in"
              class="text-blue-600 opacity-50 hover:opacity-100"
            >
              click here</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/Layouts/CenteredLayout.vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

export default {
  components: { CenteredLayout },
  setup(): unknown {
    const { t } = useI18n()
    // form validation schema
    const form = useForm({
      validationSchema: yup.object({
        name: yup.string().required().label(t('signin.name')),
        password: yup.string().required().label('Password'),
        confirm_password: yup
          .string()
          .required()
          .label('Password confirmation'),
        email: yup.string().required().email().label(t('signin.email'))
      })
    })
    // fields instance
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: password, errorMessage: passwordError } =
      useField('password')
    const { value: confirmPassword, errorMessage: confirmPasswordError } =
      useField('confirm_password')

    // register actions
    const register = form.handleSubmit((): void => {
      console.log('Registra usuario')
    })
    return {
      register,
      form,
      email,
      emailError,
      name,
      nameError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError
    }
  }
}
</script>

<style lang="scss" scoped></style>
