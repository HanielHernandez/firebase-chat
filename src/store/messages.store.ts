import messagesApi from '@/api/messagesApi'
import { type Message } from '@/models/message'
import { endBefore, limitToLast, startAt } from '@firebase/firestore'
import { type Unsubscribe } from '@firebase/util'
import { orderBy } from 'firebase/firestore'
import { createPaginatedStore } from './base.store'
import { defineStore } from 'pinia'
import { computed } from 'vue'



export const useMessagesStore = defineStore("messages", ()=>{
    const baseStore = createPaginatedStore<Message>(messagesApi)


   const lastMessageDate = computed<number>( (): number => {
      return baseStore.items.value[0].date;
    })

    const firstItem = computed<Message>( () => {
      const index = baseStore.items.value.length - 1;
      return baseStore.items.value[index];
    })

    const firstMessageDate = computed( () => {
      return firstItem.value.date     || 0;
    })


    function addItems(payload: Message[]) {
      baseStore.items.value = [...payload, ...baseStore.items.value];
    }

    function unsubscribe() {
      if (!!baseStore.subscription.value) {
        baseStore.subscription.value();
        baseStore.subscription.value = null;
      }
    }

    function setSubscription(payload: Unsubscribe) {
      baseStore.subscription.value = payload;
    }

   function createItem(newItem: Message) {
      baseStore.items.value = [... baseStore.items.value, newItem];
    }

    async function fetchItems(node: string): Promise<Message[] | null> {
      if (!baseStore.loading.value) {
         baseStore.loading.value = true;

        // Unsubscribe if there’s an active subscription
        if (!!baseStore.subscription.value) {
          baseStore.subscription.value();
        }

        // Set the API node
        messagesApi.setId(node);

        // Get last message date
        const lastConvMessageDate =
          baseStore.items.value.length > 0 ? lastMessageDate.value : new Date().getTime();
        console.log(lastConvMessageDate);

        const queries = [
          orderBy("date", "asc"),
          endBefore(lastConvMessageDate),
          limitToLast(10),
        ];

        // Fetch messages
        console.log("messages about to be reach");
        const items = await messagesApi.index(queries);
        addItems(items);

  
        // Listen for changes
        const subs = await listenForChanges ([
          orderBy("date", "asc"),
          startAt(firstMessageDate.value),
        ]);

        setSubscription(subs);

        // Check if there are no new messages
        if (items.length === 0) {
          baseStore.endReach.value = true;
        }

        baseStore.loading.value = false;
        return items;
      }
      return null;
    }

    async function listenForChanges(queries: any[]): Promise<Unsubscribe> {

      return messagesApi.onChanges(queries, (snapshot) => {

        snapshot.docChanges().forEach((change) => {
          const item = { id: change.doc.id , ...change.doc.data() } as Message;
          console.log(change.type, item);
          if (
            change.type === "added" &&
            baseStore.items.value.find((x) => x.id === item.id) === undefined
          ) {
            createItem(item);
          } else if (change.type === "modified") {
            const index = baseStore.items.value.findIndex((x) => x.id === item.id);
            if (index !== -1) baseStore.items.value[index] = item;
          } else if (change.type === "removed") {
            baseStore.items.value =baseStore.items.value.filter((x) => x.id !== item.id);
          }
        });
      });
    }

    return {
      ...baseStore,
      fetchItems,
      unsubscribe,
      listenForChanges,
      addItems,
      setSubscription,
      createItem,
      lastMessageDate,
      firstItem,
      firstMessageDate,
    }
  });