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
  </div>
</template>

<script>
import ConversationsList from '@/components/messenger/ConversationsList.vue'
import { ref } from 'vue'
export default {
  components: {
    ConversationsList
  },
  setup(props) {
    const createConv = () => {
      openOptions.value = false
      console.log('creating new conv')
    }
    const openOptions = ref(false)
    return {
      openOptions,
      createConv
    }
  }
}
</script>

<style lang="scss" scoped></style>
