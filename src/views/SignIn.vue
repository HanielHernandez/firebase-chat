<template>
    <centered-layout>
        <div class="flex flex-col md:mx-0 w-full h-screen justify-center md:w-lg px-4 relative">
            <div class="text-center w-120 top-12 fixed">
                <img src="@/assets/logo.svg" class="inline-block" alt="" width="96" height="96" />
            </div>

            <fr-alert v-if="message.text" show-dismiss type="error" @on-close="message.text = null">
                {{ message.text }}
            </fr-alert>

            <at-card-container class="w-ful flex flex-col rounded-lg">
                <at-text variant="h2" class="text-center mb-6">
                    {{ $t('signin.title') }}
                </at-text>

                <at-text class="mb-6">
                    {{ $t('signin.subtitle') }}
                </at-text>
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
                        placeholder="Your email"
                        class="mb-6"
                    />
                    <TextField
                        type="password"
                        rules="required"
                        name="password"
                        :title="$t('auth.password')"
                        placeholder="Your Password"
                    />
                    <div class="text-right mt-2 mb-6">
                        <router-link :to="{ name: 'ForgotPassword' }">
                            <at-text variant="link">{{ $t('signin.forgot_password_text') }}</at-text>
                        </router-link>
                        <!-- font-medium text-blue-600 opacity-75 hover:opacity-100 mb-6 -->
                    </div>
                    <fr-button
                        :disabled="loading || !meta.valid"
                        type="submit"
                        block
                        :loading="loading"
                        color="primary"
                    >
                        {{ $t('signin.button_text') }}
                    </fr-button>

                    <div class="border-t my-6 border-neutral-200"></div>

                    <at-text class="text-center">
                        {{ $t('signin.no_account_text') }}

                        <router-link to="sign-up">
                            <at-text variant="link">
                                {{ $t('signin.click_here_text') }}
                            </at-text>
                        </router-link>
                    </at-text>
                </vee-form>
            </at-card-container>
        </div>
    </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/layouts/CenteredLayout.vue'
import { defineComponent } from 'vue'
import { Form as VeeForm } from 'vee-validate'
import { ref } from 'vue'
import { type LoginRequest } from '@/models/auth'
import auth from '@/plugins/firebase/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { EMAIL_NOT_VERIFIED } from '@/config/variables'
import useRootStore from '@/store'
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
            type: 'success',
            text: null
        })
        const showSuccessMessage = ref(true)
        const store = useRootStore()
        const setCurrentUser = () => store.fetchCurrentUser()
        const errorMessage = ref()
        const router = useRouter()
        const loading = ref(false)
        const handleSubmit = async (values: LoginRequest): Promise<void> => {
            loading.value = true
            try {
                await auth.singin(values)
                setCurrentUser()
                loading.value = false
                router.push({ name: 'Messenger' })
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    // // console.log(e.code, e.message)
                    message.value.type = 'error'
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
