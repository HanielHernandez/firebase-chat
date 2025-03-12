import { FirebaseApiService } from '@/api/firebaseApi'
import { type ItemWithId, type Message } from '@/models/message'
import {
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@firebase/firestore'
import { async, type Unsubscribe } from '@firebase/util'
import {
  type ActionContext,
  createNamespacedHelpers,
  createStore,
  Store
} from 'vuex'
import { type CommitFunction, type PaginatedStoreState, type RootState } from '.'
import {
  FETCH_ITEMS_ACTIONS,
  FIND_ITEM_ACTION,
  LISTEN_CHANGES_ACTION,
  LOAD_MORE_ACTION,
  STORE_ITEM_ACTION
} from './actions'
import { GET_ITEM_BY_ID_GETTER, GET_ITEM_INDEX_GETTER } from './getters'
import {
  ADD_ITEMS_MUTATION,
  CREATE_ITEM,
  REMOVE_ITEM,
  RESET_ITEMS,
  SET_END_REACHED,
  SET_ITEMS_MUTATION,
  SET_LOADING_MUTATION,
  SET_PAGE_MUTATION,
  SET_SELECTED_MUTATION,
  UPDATE_ITEM
} from './mutations'

export type onChagesCallback = (items: any[]) => void
export type onChangesFunction = (
  id: string,
  callback: onChagesCallback
) => Unsubscribe
export type onChangesActions = {
  onCreated: () => void
  onUpdate: () => void
  onRemoved: () => void
}

export const createPaginatedStore = <T extends ItemWithId>(
  service: FirebaseApiService<any>
) => {
  return {
    state: (): PaginatedStoreState<T> => ({
      items: [] as T[],
      page: 1,
      endReach: false,
      selected: null as T | null,
      loading: false,
      subscription: null as Unsubscribe | null,
    }),

    getters: {
      getItemById: (state: PaginatedStoreState<T>) => (id: number) => {
        return state.items.find((x) => x.id === id);
      },
      getItemIndex: (state: PaginatedStoreState<T>) => (id: number) => {
        return state.items.findIndex((x) => x.id === id);
      },
    },
    actions: {
      async listenChanges(payload?: QueryConstraint[]): Promise<Unsubscribe> {
        return service.onChanges(payload, (snapshot: QuerySnapshot) => {
          snapshot.docChanges().forEach((change) => {
            const item = { id: change.doc.id, ...change.doc.data() };

            if (change.type === "added") {
              if (!this.items.some((x) => x.id === item.id)) {
                this.createItem(item);
                console.log("ITEM ADDED", item);
              }
            } else if (change.type === "modified") {
              const index = this.items.findIndex((x) => x.id === item.id);
              this.updateItem({ item, index });
              console.log("ITEM UPDATED", item);
            } else if (change.type === "removed") {
              const index = this.getItemIndex(item.id);
              this.removeItem(index);
              console.log("ITEM REMOVED", item);
            }
          });
        });
      },
      async fetchItems(payload?: QueryConstraint[]): Promise<void> {
        this.endReach = false;
        this.loading = true;
        const items = await service.index(payload);
        this.loading = false;
        if (this.page === 1) {
          this.setItems(items);
        } else {
          this.addItems(items);
        }
        if (items.length === 0) {
          this.endReach = true;
        }
      },

      async loadMore(): Promise<void> {
        if (!this.endReach) {
          this.page++;
        }
      },

      async findItem(id: string): Promise<T> {
        const item = await service.find(id);
        this.setSelected(item);
        return item;
      },

      async storeItem(payload: T): Promise<T> {
        return await service.store(payload);
      },
      setLoading(payload: boolean) {
        this.loading = payload;
      },
      setItems(payload: T[]) {
        this.items = payload;
      },
      addItems(payload: T[]) {
        this.items = [...this.items, ...payload];
      },
      setSelected(payload: T) {
        this.selected = payload;
      },
      setEndReached(payload: boolean) {
        this.endReach = payload;
      },
      updateItem({ item, index }: { item: T; index: number }) {
        this.items[index] = item;
      },
      createItem(newItem: T) {
        this.items = [newItem, ...this.items];
      },
      removeItem(index: number) {
        this.items.splice(index, 1);
      },
      resetItems() {
        this.items = [];
        this.endReach = false;
        this.page = 1;
      },
    },
  };
};
export default createPaginatedStore;