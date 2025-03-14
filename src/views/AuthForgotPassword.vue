<template>
    <centered-layout>
        <div class="flex flex-col md:mx-0 md:w-1/3 xl:w-1/4 px-4">
            <h3 class="text-3xl font-bold text-gray-900 text-center mb-6 t">
                {{ $t('forgot_password.title') }}
            </h3>

            <fr-alert v-if="message.text" show-dismiss type="error" @on-close="message.text = null">
                {{ message.text }}
            </fr-alert>

            <div class="w-full w-lg flex flex-col rounded border p-4">
                <p class="text-gray-600 text-sm mb-3">
                    {{ $t('forgot_password.subtitle') }}
                </p>
                <vee-form
                    v-slot="{ meta }"
                    :initial-values="initialValues"
                    @submit="(values)=>handleSubmit(values as LoginRequest)"
                >
                    <TextField
                        type="email"
                        name="email"
                        rules="required|email"
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
                        >{{ $t('forgot_password.button_text') }}</fr-button
                    >

                    <div class="border-t my-3"></div>

                    <p class="text-sm font-medium text-center text-gray-600">
                        {{ $t('signup.already_registered_text') }}
                        <router-link to="sign-up" class="text-blue-600 opacity-75 hover:opacity-100">
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
import { defineComponent } from 'vue'
import { Form as VeeForm } from 'vee-validate'
import { ref } from 'vue'
import auth from '@/plugins/firebase/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { LoginRequest } from '@/models/auth'
import { FirebaseError } from 'firebase/app'

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
            type: 'succcess',
            text: ''
        })
        const router = useRouter()
        const loading = ref(false)

        const handleSubmit = async (values: LoginRequest): Promise<void> => {
            loading.value = true
            try {
                await auth.singin(values)
                // // console.log(response)
                router.push({ name: 'Messenger' })
                loading.value = false
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    message.value.type = 'error'
                    if (e.code == 'auth/user-not-found') {
                        message.value.text = t('auth.user_not_found_text')
                    } else {
                        message.value.text = `Error ${e.code}: ${e.message}`
                    }

                    loading.value = false
                }
            }
        }

        return {
            loading,
            message,
            initialValues,
            handleSubmit
        }
    }
})
</script>

<style scoped></style>
