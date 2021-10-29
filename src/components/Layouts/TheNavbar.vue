<template>
  <div class="fixed top-0 flex left-0 w-screen p-4 justify-between">
    <div></div>
    <div class="flex justify-items-end">
      <span @click="logout">Logout</span>
    </div>
  </div>
</template>

<script lang="ts">
import auth from '@/plugins/firebase/auth'
import { useRouter } from 'vue-router'
export default {
  setup(props) {
    const router = useRouter()
    const logout = async (): Promise<void> => {
      try {
        await auth.signOut()
        router.push({ name: 'SignIn' })
      } catch (error) {
        console.error(error)
      }
    }
    return {
      logout
    }
  }
}
</script>

<style lang="scss" scoped></style>
