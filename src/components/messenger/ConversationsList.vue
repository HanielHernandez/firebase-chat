<template>
  <div>
    <div class="p-4">
      <text-field placeholder="Buscar" name="search"> </text-field>
    </div>

    <div>
      <transition-group name="conversations" tag="div" appear>
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
      </transition-group>
    </div>
    <div class="text-center">
      <div v-if="loading">
        <div
          v-for="t in 5"
          :key="`skeleton-${t}`"
          class="px-4 py-2 flex justify-start"
        >
          <fr-skeleton
            circle
            width="40px"
            class="mr-4 flex-shrink-0"
          ></fr-skeleton>
          <div class="flex w-full flex-col">
            <fr-skeleton height="1.25rem" class="mb-1"></fr-skeleton>
            <fr-skeleton height="1.25rem"></fr-skeleton>
          </div>
        </div>
      </div>
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
import {
  FETCH_CONVERSATION_ITEMS_ACTION,
  LISTEN_CONVERSATION_ITEMS_ACTION
} from '@/store/actions'
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
        await store.dispatch(FETCH_CONVERSATION_ITEMS_ACTION, [
          where('senderId', '==', currentUser.value.code)
        ])
        unsubscribe = await store.dispatch(LISTEN_CONVERSATION_ITEMS_ACTION)
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

<style lang="scss" scoped>
.conversations-enter-to,
.conversations-leave-from {
  opacity: 1;
  transform: none;
}
.conversations-enter-active,
.conversations-leave-active {
  transition: all 1s ease;
}
.conversations-leave-active {
  position: absolute;
  transition: all 1s ease;
}
.conversations-enter-from,
.conversations-leave-to {
  opacity: 0;
  transition: all 1s ease;
  transform: translateX(-30px);
}
.conversations-move {
  transition: all 1s ease;
}

//.conversations-item {
//   display: inline-block;
//   margin-right: 10px;
// }
//.conversations-enter-active,
//.conversations-leave-active {
//   transition: all 1s ease;
// }
//.conversations-enter-from,
//.conversations-leave-to {
//   opacity: 0;
//   transform: translateY(30px);
// }
</style>
