<template>
  <vee-form
    v-slot="{ meta }"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <fr-card>
      <template #title>
        <fr-card-title title="Id del Destinatario" class="text-center">
          {{ $t('sidebar.new_conversation_modal.title') }}
        </fr-card-title>
      </template>
      <template #default>
        <p class="text-gray-600 mb-4">
          {{ $t('sidebar.new_conversation_modal.message') }}
        </p>

        <text-field
          id="phoneNumber"
          :title="$t('conversation_form.recipient_phone_number')"
          placeholder="xxxxxxxx"
          name="recipientId"
          type="text"
          rules="required"
        >
        </text-field>
      </template>
      <template #actions>
        <div class="text-center flex flex-nowrap px-4">
          <fr-button
            class="mr-3"
            block
            :loading="loading"
            :disabled="loading || !meta.valid"
            type="submit"
            color="blue-600 text-white"
          >
            {{ $t('sidebar.new_conversation_modal.confirmation_button_text') }}
          </fr-button>
          <fr-button block color="red-600 text-white" @click="onCancel">
            {{ $t('sidebar.new_conversation_modal.cancel_button_text') }}
          </fr-button>
        </div>
      </template>
    </fr-card>
  </vee-form>
</template>

<script>
import { STORE_CONVERSATION_ACTION } from '@/store/actions'
import { defineComponent } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'ConversationForm',
  emits: ['cancel', 'created'],
  setup(props, { emit }) {
    const initialValues = ref({
      recipientId: null
    })
    const loading = ref(false)
    const store = useStore()
    const storeConversation = (recipientId) =>
      store.dispatch(STORE_CONVERSATION_ACTION, recipientId)
    const onCancel = () => {
      emit('cancel', true)
    }
    const onSubmit = async (values) => {
      console.log('values', values)
      loading.value = true
      try {
        // create new conversation
        const conv = await storeConversation(values.recipientId)
        loading.value = false
        emit('created', conv)
      } catch (e) {
        loading.value = false
        alert(e)
      }
    }
    return {
      onCancel,
      loading,
      initialValues,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped></style>
