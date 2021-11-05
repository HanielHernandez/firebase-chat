import { LISTEN_CHANGES_ACTION } from '@/store/actions'
import { RESET_ITEMS } from '@/store/mutations'
import { Unsubscribe } from '@firebase/util'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default (moduleName: string) => {
  const storeModule = useStore()

  // computed

  const loading = computed(() => {
    return storeModule.state[moduleName].loading
  })
  const items = computed(() => {
    return storeModule.state[moduleName].items
  })

  const selected = computed(() => {
    return storeModule.state[moduleName].selected
  })
  const endReachded = computed<boolean>(() => {
    return storeModule.state[moduleName].endReach
  })

  // methods
  const find = (id: string) => {
    return storeModule.dispatch(`${moduleName}/find`, id)
  }

  const fetch = (payload: unknown): Promise<Unsubscribe> => {
    return storeModule.dispatch(`${moduleName}/fetchItems`, payload)
  }

  const listenChanges = (payload: unknown): Promise<Unsubscribe> => {
    return storeModule.dispatch(
      `${moduleName}/${LISTEN_CHANGES_ACTION}`,
      payload
    )
  }
  const reset = () => {
    return storeModule.commit(`${moduleName}/${RESET_ITEMS}`)
  }

  const store = (payload: unknown) => {
    return storeModule.dispatch(`${moduleName}/store`, payload)
  }
  return {
    listenChanges,
    items,
    fetch,
    loading,
    reset,
    find,
    store,
    endReachded,
    selected
  }
}
