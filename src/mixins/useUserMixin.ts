import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { User as FirebaseUser } from 'firebase/auth'
import { User } from '@/models/auth'

interface UserMixin {
  currentUser: ComputedRef<User>
}
export default (): UserMixin => {
  const store = useStore()
  const currentUser = computed<User>(() => store.state.currentUser)

  return {
    currentUser
  }
}
