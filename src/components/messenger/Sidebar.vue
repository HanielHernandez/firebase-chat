<template>
  <div
    class="
      border-r border-right border-gray-300
      h-screen
      bg-gray-100
      fixed
      left-0
      top-0
      w-1 w-96
    "
  >
    <div class="flex justify-between items-center px-4 pt-4">
      <h4 class="font-bold text-2xl">
        {{ $t('sidebar.conversations_title_text') }}
      </h4>
      <fr-dropdown v-model="openOptions" options-width="260px">
        <template #default="{ handleClick }">
          <fr-button icon rounded flat class="text-sm" @click="handleClick">
            <i class="material-icons">more_vert</i>
          </fr-button>
        </template>
        <template #options>
          <fr-list hoverable>
            <fr-list-item class="text-gray-600" @click="createConv">
              <template #avatar>
                <i class="material-icons"> add </i>
              </template>
              <p class="text-gray-600 font-medium">
                {{ $t('sidebar.new_conversation_text') }}
              </p>
            </fr-list-item>
            <fr-list-item class="text-gray-600">
              <template #avatar>
                <i class="material-icons"> add_comment </i>
              </template>
              <p class="font-medium">
                {{ $t('sidebar.join_conversation_text') }}
              </p>
            </fr-list-item>
          </fr-list>
        </template>
      </fr-dropdown>
    </div>
    <ConversationsList />
    <fr-modal v-slot="{ closeModal }" v-model="showNewConvModal" size="sm">
      <fr-card>
        <template #title>
          <fr-card-title class="text-center">
            {{ $t('sidebar.new_conversation_modal.title') }}
          </fr-card-title>
        </template>
        <template #default>
          <div class="text-center">
            <FrLoading v-if="loading" size="16" thickness="8" />
            <p class="text-gray-600">
              {{ $t('sidebar.new_conversation_modal.message') }}
            </p>
          </div>
        </template>
        <template #actions>
          <div class="text-center">
            <fr-button class="mr-3" color="blue-600 text-white">
              {{
                $t('sidebar.new_conversation_modal.confirmation_button_text')
              }}
            </fr-button>
            <fr-button color="red-600 text-white" @click="closeModal">
              {{ $t('sidebar.new_conversation_modal.cancel_button_text') }}
            </fr-button>
          </div>
        </template>
      </fr-card>
    </fr-modal>
  </div>
</template>

<script>
import ConversationsList from '@/components/Messenger/ConversationsList.vue'
import { ref } from 'vue'
export default {
  components: {
    ConversationsList
  },
  setup(props) {
    const showNewConvModal = ref(false)
    const createConv = () => {
      openOptions.value = false
      showNewConvModal.value = true
      console.log('creating new conv')
    }
    const openOptions = ref(false)
    return {
      openOptions,
      showNewConvModal,
      createConv
    }
  }
}
</script>

<style lang="scss" scoped></style>
