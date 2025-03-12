import { computed, type ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { type User as FirebaseUser } from 'firebase/auth'
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
