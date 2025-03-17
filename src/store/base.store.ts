import { FirebaseApiService } from '@/api/firebaseApi'
import { type ItemWithId } from '@/models/message'
import { QueryConstraint, QuerySnapshot } from '@firebase/firestore'
import { type Unsubscribe } from '@firebase/util'
import { ref, type Ref } from 'vue'
export type onChagesCallback = (items: any[]) => void

export type onChangesFunction = (id: string, callback: onChagesCallback) => Unsubscribe

export type onChangesActions = {
    onCreated: () => void
    onUpdate: () => void
    onRemoved: () => void
}

export interface PaginatedStoreOptions<T> {
    state?: () => Partial<T>
    getters?: Record<string, (state: T) => any>
    actions?: Record<string, Function>
}

// Utility function that returns store arguments
export const createPaginatedStore = <T extends ItemWithId>(service: FirebaseApiService<T>) => {
    const items = ref([]) as Ref<T[]>
    const page = ref<number>(1)
    const endReach = ref<boolean>(false)
    const selected = ref<T | null>(null)
    const loading = ref<boolean>(false)
    const subscription = ref<Unsubscribe | null>(null)

    // const getItemById = computed( (state: PaginatedStoreState<T>) => (id: string) =>
    //   state.items.find((x) => x.id === id))
    function getItemIndex(id: string) {
        return items.value.findIndex((x) => x.id === id)
    }

    async function listenChanges(payload?: QueryConstraint[]): Promise<void> {
        if (subscription.value) subscription.value()
        subscription.value = service.onChanges(payload, (snapshot: QuerySnapshot) => {
            snapshot.docChanges().forEach((change) => {
                const item = { id: change.doc.id, ...change.doc.data() } as T

                if (change.type === 'added') {
                    if (!items.value.some((x) => x.id === item.id)) {
                        createItem(item)
                        console.log('ITEM ADDED', item)
                    }
                } else if (change.type === 'modified') {
                    const index = items.value.findIndex((x) => x.id === item.id)
                    updateItem({ item, index })
                    console.log('ITEM UPDATED', item)
                } else if (change.type === 'removed') {
                    if (item.id) {
                        const index = getItemIndex(item.id as string)
                        removeItem(index)
                    }
                    console.log('ITEM REMOVED', item)
                }
            })
        })
    }

    async function fetchItems(payload?: QueryConstraint[]): Promise<void> {
        endReach.value = false
        loading.value = true
        const items = await service.index(payload)
        loading.value = false
        if (page.value === 1) {
            setItems(items)
        } else {
            addItems(items)
        }
        if (items.length === 0) {
            endReach.value = true
        }
    }

    async function loadMore(): Promise<void> {
        if (!endReach.value) {
            page.value++
        }
    }

    async function findItem(id: string): Promise<T | null> {
        const item = await service.find(id)
        setSelected(item)
        return item
    }

    async function storeItem(payload: T): Promise<T> {
        return await service.store(payload)
    }

    async function deleteItem(id: string): Promise<void> {
        return await service.delete(id)
    }

    function setLoading(payload: boolean) {
        loading.value = payload
    }

    function setItems(payload: T[]) {
        items.value = payload
    }

    function addItems(payload: T[]) {
        items.value = [...items.value, ...payload]
    }

    function setSelected(payload: T | null) {
        selected.value = payload
    }

    function setEndReached(payload: boolean) {
        endReach.value = payload
    }

    function updateItem({ item, index }: { item: T; index: number }) {
        if (index >= 0) {
            items.value.splice(index, 1, item)
        }
    }

    function createItem(newItem: T) {
        items.value = [newItem, ...items.value]
    }

    function removeItem(index: number) {
        if (index >= 0) {
            items.value.splice(index, 1)
        }
    }

    function resetItems() {
        items.value = []
        endReach.value = false
        page.value = 1
    }

    return {
        items,
        page,
        endReach,
        selected,
        loading,
        subscription,
        listenChanges,
        fetchItems,
        loadMore,
        findItem,
        storeItem,
        setLoading,
        setItems,
        addItems,
        setSelected,
        setEndReached,
        updateItem,
        createItem,
        removeItem,
        resetItems,
        getItemIndex,
        deleteItem
    }
}
