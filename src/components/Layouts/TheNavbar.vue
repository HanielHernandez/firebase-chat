<template>
  <div class="fixed top-0 flex left-0 w-screen justify-between">
    <div></div>
    <div class="flex justify-items-end items-center">
      <span @click="logout">Logout</span>
      <fr-dropdown class="ml-4" options-width="250px" align="right">
        <template #default="{ handleClick }">
          <div
            v-if="currentUser"
            class="
              flex
              justify-end
              items-center
              flex-nowrap
              px-4
              py-2
              hover:bg-gray-900 hover:bg-opacity-20
            "
            @click="handleClick"
          >
            <img
              :src="currentUser.photoURL"
              width="40"
              height="40"
              alt=""
              class="rounded-full mr-3"
            />
            <div class="">
              <p class="text-sm font-bold leading-none text-gray-900">
                {{ currentUser.displayName }}
              </p>
            </div>
          </div>
        </template>

        <template #options>
          <ul>
            <li>
              <a
                href="#"
                class="py-2 px-4 block hover:bg-black hover:bg-opacity-20"
                @click="logout"
              >
                {{ $t('navbar.log_out_text') }}
              </a>
            </li>
          </ul>
        </template>
      </fr-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import auth from '@/plugins/firebase/auth'
import { useRouter } from 'vue-router'
import { useUser } from '@/mixins'
export default {
  setup(): unknown {
    const router = useRouter()
    const { currentUser } = useUser()
    const logout = async (): Promise<void> => {
      try {
        await auth.signOut()
        router.push({ name: 'SignIn' })
      } catch (error) {
        console.error(error)
      }
    }
    return {
      currentUser,
      logout
    }
  }
}
</script>

<style lang="scss" scoped></style>
