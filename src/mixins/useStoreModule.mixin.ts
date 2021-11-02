import { Unsubscribe } from '@firebase/util'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default (moduleName: string) => {
  const store = useStore()

  const fetch = (payload: unknown): Promise<Unsubscribe> => {
    return store.dispatch(`${moduleName}/fetchItems`, payload)
  }

  const loading = computed(() => {
    return store.state[moduleName].loading
  })

  const find = (id: string) => {
    return store.dispatch(`${moduleName}/find`, id)
  }
  const items = computed(() => {
    return store.state[moduleName].items
  })

  const selected = computed(() => {
    return store.state.conversations.selected
  })

  return {
    items,
    fetch,
    loading,
    find,
    selected
  }
}
