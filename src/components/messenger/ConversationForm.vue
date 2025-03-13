<template>
  <vee-form
    v-slot="{ meta }"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <fr-card class="">
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
        <div class="text-center flex flex-nowrap gap-4 items-center">
          <fr-button
            class="w-full "
            block
            :loading="loading"
            :disabled="loading || !meta.valid"
            type="submit"
            color="primary"
          >
            {{ $t('sidebar.new_conversation_modal.confirmation_button_text') }}
          </fr-button>
          <fr-button block color="danger" @click="onCancel">
            {{ $t('sidebar.new_conversation_modal.cancel_button_text') }}
          </fr-button>
        </div>
      </template>
    </fr-card>
  </vee-form>
</template>

<script>
import { STORE_CONVERSATION_ACTION } from '@/store/actions'
import { useConversationsStore } from '@/store/conversations.store'
import { defineComponent } from '@vue/runtime-core'
import { ref } from 'vue'
export default defineComponent({
  name: 'ConversationForm',
  emits: ['cancel', 'created'],
  setup(props, { emit }) {
    // store
    const store = useConversationsStore()

    // state
    const initialValues = ref({
      recipientId: null
    })
    const loading = ref(false)
console.log(store)

    // methods
    const startConversation = async (recipientId) =>
      store.startConversation(recipientId)

    const onCancel = () => {
      emit('cancel', true)
    }

    const onSubmit = async (values) => {
      loading.value = true
      try {
        const conv = await startConversation(values.recipientId)
        loading.value = false
        emit('created', conv)
      } catch (e) {
        loading.value = false
        console.error(e)
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
