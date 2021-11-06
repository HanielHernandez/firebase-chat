<template>
  <div>
    <div class="p-4">
      <text-field placeholder="Buscar" name="search"> </text-field>
    </div>

    <div>
      <transition name="list-content" mode="out-in">
        <div v-if="!loading && conversations.length > 0">
          <transition-group name="conversations" tag="div" appear>
            <ConversationItem
              v-for="conv in conversations"
              :key="`conv-${conv.id}`"
              :conversation="conv"
            />
          </transition-group>
        </div>
        <p
          v-else-if="!loading && conversations.length == 0"
          class="small text-gray-500 text-center px-4 py-2"
        >
          {{ 'No hay conversaciónes que listar' }}
        </p>
        <div v-else-if="loading">
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
      </transition>
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
import { orderBy, where } from 'firebase/firestore'
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
          where('senderPhoneNumber', '==', currentUser.value.phoneNumber),
          orderBy('lastMessage.date', 'desc')
        ])
        unsubscribe = await store.dispatch(LISTEN_CONVERSATION_ITEMS_ACTION, [
          where('senderPhoneNumber', '==', currentUser.value.phoneNumber),
          orderBy('lastMessage.date', 'desc')
        ])
      } catch (e) {
        alert(e)
        console.error(e)
      }
    }

    watch(
      () => currentUser.value,
      (old: User, nuevo: User) => {
        // // console.log('usuario cambio', old, nuevo)
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
.conversations {
  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
  &-leave-active {
    width: 100%;
    transition: all 0.3 ease;
    position: absolute;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  &-move {
    transition: all 0.3 ease;
  }
}

.list-content {
  &-enter-from,
  &-leave-to {
    opacity: 0;
    //transform: translateY(-20px);
  }
  &-enter-to,
  &-leave-from {
    opacity: 1;
    //transform: translateY(0);
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
}
</style>
