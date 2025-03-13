import { computed, type ComputedRef } from 'vue'
import { type User } from '@/models/auth'
import useRootStore from '@/store'

interface UserMixin {
  currentUser: ComputedRef<User| null>
}
export default (): UserMixin => {
  const store = useRootStore()
  const currentUser = computed<User|null>(() => store.currentUser)

  return {
    currentUser
  }
}
