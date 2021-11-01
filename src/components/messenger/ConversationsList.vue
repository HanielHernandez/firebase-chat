<template>
  <div>
    <div class="p-4">
      <text-field placeholder="Buscar" name="search"> </text-field>
    </div>
    <div v-if="conversations != null">
      <router-link
        v-for="(conv, index) in conversations"
        :key="`conv-${index}`"
        :to="{
          name: 'Messenger Conversation',
          params: { conversationId: conv.id }
        }"
      >
        <ConversationItem :conversation="conv" />
      </router-link>
    </div>
    <div class="text-center">
      <fr-loading v-if="loading == true"></fr-loading>
      <p
        v-if="(conversations == null || conversations.length == 0) && !loading"
        class="small text-gray-500"
      >
        No hay conversaciónes que listar
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from '@vue/runtime-core'
import { watch, computed } from 'vue'
import ConversationItem from '@/components/Messenger/ConversationItem.vue'
import { useUser } from '@/mixins'
import { useStore } from 'vuex'
import { User } from '@/models/auth'
import { FETCH_CONVERSATION_ITEMS_ACTION } from '@/store/actions'
import { where } from 'firebase/firestore'
export default defineComponent({
  components: {
    ConversationItem
  },
  setup() {
    const { currentUser } = useUser()
    const store = useStore()
    let unsubscribe = (): void | boolean => {
      return false
    }
    const conversations = computed(() => {
      return store.state.conversations.items
    })
    const loading = computed(() => {
      return store.state.conversations.loading
    })

    const fetchConversations = async () => {
      try {
        unsubscribe = await store.dispatch(FETCH_CONVERSATION_ITEMS_ACTION, [
          where('senderId', '==', currentUser.value.code)
        ])
      } catch (e) {
        alert(e)
        console.error(e)
      }
    }

    watch(
      () => currentUser.value,
      (old: User, nuevo: User) => {
        console.log('usuario cambio', old, nuevo)
        fetchConversations()
      }
    )
    onMounted(() => {
      //fetchConversations()
    })

    onUnmounted(() => {
      unsubscribe()
    })

    return {
      loading,
      currentUser,
      conversations
    }
  }
})
</script>

<style lang="scss" scoped></style>
