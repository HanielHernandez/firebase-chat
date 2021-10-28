<template>
  <div>
    <div class="p-4">
      <text-field placeholder="Buscar"> </text-field>
    </div>
    <div>
      <ConversationItem
        v-for="conv in conversations"
        :key="conv.id"
        :conversation="conv"
      />
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import axios from 'axios'
import ConversationItem from '@/components/messenger/ConversationItem.vue'
export default {
  components: {
    ConversationItem
  },
  setup(props) {
    const conversations = ref([])

    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          'https://604961d0fb5dcc0017969e01.mockapi.io/api/conversations'
        )
        conversations.value = response.data
      } catch (e) {
        console.error(e)
      }
    }
    onMounted(() => {
      fetchConversations()
    })

    return {
      conversations
    }
  }
}
</script>

<style lang="scss" scoped></style>
