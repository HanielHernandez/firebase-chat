import { Message } from '@/models/message'
import { db } from '@/plugins/firebase'
import { collection } from '@firebase/firestore'
import { FirebaseApiService } from './firebaseApi'

export class MessagesApi extends FirebaseApiService<Message> {
  nodeId: string | null
  constructor() {
    super('messages')
    this.ref = collection(db, this.docsRef)
    this.nodeId = null
  }

  setId(id: string): void {
    // // console.log(id)
    this.ref = collection(db, 'nodes', id, 'messages')
  }
}

export default new MessagesApi()
