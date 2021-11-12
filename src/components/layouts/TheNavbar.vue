<template>
  <div class="fixed top-0 flex left-0 w-screen p-2 justify-between z-10">
    <div></div>
    <div class="flex justify-items-end items-center">
      <fr-dropdown class="ml-4" options-width="250px" align="right">
        <template #default="{ handleClick }">
          <div
            v-if="currentUser"
            class="
              flex
              p-2
              rounded-full
              justify-end
              items-center
              rounded
              transition-colors
              duration-300
              easin-out
              flex-nowrap
              hover:bg-gray-900 hover:bg-opacity-20
            "
            @click="handleClick"
          >
            <img
              :src="
                currentUser.profile_image_url
                  ? currentUser.profile_image_url
                  : `https://ui-avatars.com/api/?name=${currentUser.name}`
              "
              width="40"
              height="40"
              alt=""
              class="rounded-full mr-3"
            />
            <div class="">
              <p class="font-bold leading-none text-gray-900">
                {{ currentUser.name }}
              </p>
              <small class="text-gray-600">{{ currentUser.code }}</small>
            </div>
          </div>
        </template>

        <template #options>
          <fr-list hoverable bordered>
            <fr-list-item>
              <template #avatar>
                <i class="material-icons">person</i>
              </template>
              <a href="#" class="text-gray-600" @click="logout">
                {{ $t('navbar.my_profile_text') }}
              </a>
            </fr-list-item>
            <fr-list-item>
              <template #avatar>
                <i class="material-icons">settings</i>
              </template>
              <a href="#" class="text-gray-600" @click="logout">
                {{ $t('navbar.settings_text') }}
              </a>
            </fr-list-item>
            <fr-list-item>
              <template #avatar>
                <i class="material-icons">logout</i>
              </template>
              <a href="#" class="text-gray-600" @click="logout">
                {{ $t('navbar.log_out_text') }}
              </a>
            </fr-list-item>
          </fr-list>
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
