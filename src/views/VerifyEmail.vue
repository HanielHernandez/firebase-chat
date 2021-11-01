<template>
  <centered-layout>
    <div class="w-full md:w-1/3 xl:w-1/4">
      <div v-if="!processing" class="text-center">
        <fr-alert :type="notification.type"
          >{{ notification.message }}
        </fr-alert>
        <fr-button
          link
          :to="{ name: 'SignIn' }"
          :color="notification.type == 'error' ? 'red-600' : 'green-600'"
        >
          {{ $t('signup.click_here_text') }}</fr-button
        >
      </div>
      <div v-else class="text-center">
        <FrLoading size="20" tickness="8" />
        <p class="animate-pulse text-gray-600 text-xl font-medium">
          Processando...
        </p>
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts">
import CenteredLayout from '@/components/Layouts/CenteredLayout.vue'
import { useAlerts } from '@/mixins'
import auth from '@/plugins/firebase/auth'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { CenteredLayout },
  setup() {
    const { t } = useI18n()
    const { message: notification } = useAlerts('success')
    const route = useRoute()
    const processing = ref(true)
    const { mode, oobCode: actionCode, lang, continueUrl } = route.query

    onMounted(async () => {
      try {
        await auth.verifyEmail(actionCode as string)
        processing.value = false
        notification.value.type = 'success'
        notification.value.message = t('verify_email.success_message')
      } catch (e) {
        console.error(e)
        processing.value = false
        notification.value.type = 'error'
        notification.value.message = t('verify_email.error_message')
      }
    })

    return {
      processing,
      mode,
      notification,
      actionCode,
      lang,
      continueUrl
    }
  }
})
</script>

<style scoped></style>
