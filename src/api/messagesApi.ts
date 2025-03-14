import { type Message } from '@/models/message'
import { db } from '@/plugins/firebase'
import {
    addDoc,
    collection,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    type Unsubscribe
} from '@firebase/firestore'
import { FirebaseApiService } from './firebaseApi'

export class MessagesApi extends FirebaseApiService<Message> {
    nodeId: string | null
    constructor() {
        super('messages')
        this.ref = collection(db, this.docsRef)
        this.nodeId = null
    }

    setId(id: string): void {
        console.log(id)
        this.ref = collection(db, 'nodes', id, 'messages')
    }
}

export default new MessagesApi()

export function getMessages(nodeId: string, callback: (messages: Message[]) => void): Unsubscribe {
    const messagesRef = collection(db, 'nodes', nodeId, 'messages')
    const messagesQuery = query(messagesRef, orderBy('date', 'desc'), limit(10))
    return onSnapshot(messagesQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
        callback(messages)
    })
}

export async function loadMoreMessages(nodeId: string, lastMessageDate: number) {
    const messagesRef = collection(db, 'nodes', nodeId, 'messages')
    const messagesQuery = query(messagesRef, orderBy('date', 'desc'), startAfter(lastMessageDate), limit(10))

    const snapshot = await getDocs(messagesQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
}

export function sendMessage(nodeId: string, message: Message) {
    const messagesRef = collection(db, 'nodes', nodeId, 'messages')
    return addDoc(messagesRef, message)
}
