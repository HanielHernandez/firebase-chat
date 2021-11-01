import { Message } from '@/models/message'
import { MessageNode } from '@/models/MessagesNode'
import { db } from '@/plugins/firebase'
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe
} from '@firebase/firestore'
import { FirebaseApiService } from './firebaseApi'

export class NodesApi extends FirebaseApiService<MessageNode> {
  constructor() {
    super('nodes')
  }
}

export default new NodesApi()
