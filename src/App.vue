<template>
    <div :class="[darkMode ? 'dark' : '']">
        <router-view />
        <div id="modals"></div>
        <MlProfile />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import useRootStore from './store'

export default defineComponent({
    setup() {
        const store = useRootStore()

        const currentUser = computed(() => store.currentUser)

        const darkMode = computed(() => localStorage.getItem('darkmode') == 'true')
        onMounted(() => {
            if (currentUser.value == null) {
                store.fetchCurrentUser()
            }
        })

        return {
            darkMode,
            currentUser
        }
    }
})
</script>

<style lang="scss"></style>
