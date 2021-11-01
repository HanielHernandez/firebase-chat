import { computed } from 'vue'
import { useStore } from 'vuex'

export default (moduleName: string) => {
  const store = useStore()

  const fetch = (...args: unknown[]) => {
    return store.dispatch(`${moduleName}/fetchItems`, args)
  }

  const find = (...args: unknown[]) => {
    return store.dispatch(`${moduleName}/find`, args)
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
    find,
    selected
  }
}
