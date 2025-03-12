import { type MessageNode } from '@/models/MessagesNode'
import { db } from '@/plugins/firebase'
import { addDoc, collection } from '@firebase/firestore'
import { DocumentReference } from 'firebase/firestore'
import { FirebaseApiService } from './firebaseApi'

export class NodesApi extends FirebaseApiService<MessageNode> {
  constructor() {
    super('nodes')
  }
  store(node: MessageNode): Promise<MessageNode> {
    return addDoc(this.getRef(), {}).then(
      async (doc: DocumentReference<unknown>) => {
        // adds first message
        await addDoc(collection(db, `${doc.path}/messages`), node.messages[0])
        return {
          id: doc.id,
          ...node
        }
      }
    )
  }
}
export default new NodesApi()
