<template>
  <router-view />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.currentUser)
    const fetchCurrentUser = () => store.dispatch('fetchCurrentUser')

    onMounted(() => {
      if (currentUser.value == null) {
        fetchCurrentUser()
      }
    })

    return {
      fetchCurrentUser,
      currentUser
    }
  }
})
</script>

<style lang="scss"></style>
