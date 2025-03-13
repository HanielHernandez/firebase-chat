import messagesApi from '@/api/messagesApi'
import { type Message } from '@/models/message'
import { endBefore, limitToLast, startAt } from '@firebase/firestore'
import { type Unsubscribe } from '@firebase/util'
import { orderBy } from 'firebase/firestore'
import { type ActionContext } from 'vuex'
import { type PaginatedStoreState, type RootState } from '.'
import { FETCH_ITEMS_ACTIONS, LISTEN_CHANGES_ACTION } from './actions'
import { createPaginatedStore } from './base.store'
import {
  SET_LOADING_MUTATION,
  CREATE_ITEM,
  ADD_ITEMS_MUTATION,
  SET_END_REACHED,
  UNSUBSCRIBE_MUTATION,
  SET_SUBSCRIPTION
} from './mutations'
import { defineStore } from 'pinia'

const messagesStore = createPaginatedStore<Message>(messagesApi)

export const useMessagesStore = defineStore ("messages", {
  ...messagesStore,
  getters: {
    lastMessageDate: (state: PaginatedStoreState<Message>): number => {
      return state.items[0].date;
    },
    firstItem: (state: PaginatedStoreState<Message>): Message => {
      return state.items[state.items.length - 1];
    },
    firstMessageDate: (state: PaginatedStoreState<Message>) => {
      return state.items ? state.items[state.items.length - 1].date : 0;
    },
  },

  actions: {
    addItems(payload: Message[]) {
      this.items = [...payload, ...this.items];
    },

    unsubscribe() {
      if (this.subscription) {
        this.subscription();
        this.subscription = null;
      }
    },

    setSubscription(payload: Unsubscribe) {
      this.subscription = payload;
    },

    createItem(newItem: Message) {
      this.items = [...this.items, newItem];
    },

    async fetchItems(node: string): Promise<Message[] | null> {
      if (!this.loading) {
        this.loading = true;

        // Unsubscribe if there’s an active subscription
        if (this.subscription) {
          this.unsubscribe();
        }

        // Set the API node
        messagesApi.setId(node);

        // Get last message date
        const lastMessageDate =
          this.items.length > 0 ? this.lastMessageDate : new Date().getTime();
        console.log(lastMessageDate);

        const queries = [
          orderBy("date", "asc"),
          endBefore(lastMessageDate),
          limitToLast(10),
        ];

        // Fetch messages
        console.log("messages about to be reach")
        const items = await messagesApi.index(queries);
        this.addItems(items);

        // Get first message date to start listening for changes
        const firstMessageDate = this.firstMessageDate;
        console.log(firstMessageDate);

        // Listen for changes
        const subs = await this.listenForChanges([
          orderBy("date", "asc"),
          startAt(firstMessageDate),
        ]);
        this.setSubscription(subs);

        // Check if there are no new messages
        if (items.length === 0) {
          this.endReach = true;
        }

        this.loading = false;
        return items;
      }
      return null;
    },

    async listenForChanges(queries: any[]): Promise<Unsubscribe> {
      return messagesApi.onChanges(queries, (snapshot) => {
        console.log(snapshot)
        snapshot.forEach((change) => {
         
          //const item = { id: change.id, ...change..data() };

          /*if (
            change.type === "added" &&
            !this.items.find((x) => x.id === item.id)
          ) {
            this.createItem(item);
            console.log("ITEM ADDED", item);
          } else if (change.type === "modified") {
            const index = this.items.findIndex((x) => x.id === item.id);
            if (index !== -1) this.items[index] = item;
            console.log("ITEM UPDATED", item);
          } else if (change.type === "removed") {
            this.items = this.items.filter((x) => x.id !== item.id);
            console.log("ITEM REMOVED", item);
          }*/
        });
      });
    },
  },


});