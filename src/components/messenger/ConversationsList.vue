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
import ConversationItem from '@/components/messenger/ConversationItem.vue'
import { type User } from '@/models/auth'
import { orderBy, where } from 'firebase/firestore'
import { useConversationsStore } from '@/store/conversations.store'
import useRootStore from '@/store'
export default defineComponent({
  components: {
    ConversationItem
  },
  setup() {
    const userStore = useRootStore () 
    const store = useConversationsStore()


    let unsubscribe = (): void | boolean => {
      return false
    }
    const conversations = computed(() => {
      return store.items
    })
    const loading = computed(() => {
      return store.loading
    })


    const currentUser = computed(() => userStore.currentUser)

    const fetchConversations = async () => {
      if(typeof currentUser.value == null) {
        return
      }

      try {
        if(!!currentUser.value) {
          await store.fetchItems( [
            where('senderPhoneNumber', '==', currentUser.value.phoneNumber),
            orderBy('lastMessage.date', 'desc')
          ])
          unsubscribe = await store.listenChanges( [
            where('senderPhoneNumber', '==', currentUser.value.phoneNumber),
            orderBy('lastMessage.date', 'desc')
          ])
        }
      } catch (e) {
        alert(e)
        console.error(e)
      }
    }

    watch(
      ()=>currentUser.value as User,
      (old: User, nuevo: User) => {
        if(old!== nuevo) {
          fetchConversations()
        }
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
