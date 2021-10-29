<template>
  <div :class="[darkMode ? 'dark' : '']">
    <router-view />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const currentUser = computed(() => store.state.currentUser)
    const fetchCurrentUser = () => store.dispatch('fetchCurrentUser')
    const darkMode = computed(() => localStorage.getItem('darkmode') == 'true')
    onMounted(() => {
      if (currentUser.value == null) {
        fetchCurrentUser()
      }
    })

    return {
      fetchCurrentUser,
      darkMode,
      currentUser
    }
  }
})
</script>

<style lang="scss"></style>
