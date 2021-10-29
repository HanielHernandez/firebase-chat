import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { User as FirebaseUser } from 'firebase/auth'

interface UserMixin {
  currentUser: ComputedRef<FirebaseUser>
}
export default (): UserMixin => {
  const store = useStore()
  const currentUser = computed<FirebaseUser>(() => store.state.currentUser)

  return {
    currentUser
  }
}
