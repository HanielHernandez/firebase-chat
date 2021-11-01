import { User } from '@/models/auth'
import { Conversation } from '@/models/conversation'
import { auth, db } from '@/plugins/firebase'
import users from '@/plugins/firebase/users'
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryConstraint,
  QuerySnapshot,
  Unsubscribe,
  where
} from '@firebase/firestore'
import { doc } from 'firebase/firestore'
import { FirebaseApiService } from './firebaseApi'

export class Conversations extends FirebaseApiService<Conversation> {
  ref: any
  constructor() {
    super('conversations')
    this.ref = collection(db, 'conversations')
  }

  // store(conversation: Conversation): Promise<Conversation> {
  //   return addDoc(this.ref, conversation).then((conv) => {
  //     return {
  //       id: conv.id,
  //       ...conversation
  //     }
  //   })
  // }
  // async index(...queryConstraints: QueryConstraint[]): Promise<Conversation[]> {
  //   const q = query<Conversation>(this.ref, ...queryConstraints)
  //   const querySnapshot = await getDocs<Conversation>(q)
  //   return querySnapshot.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       ...doc.data()
  //     } as Conversation
  //   })
  // }

  // async find(id: string): Promise<Conversation | null> {
  //   console.log('t')
  //   const convRef = await getDoc(doc(db, this.docsRef, id))
  //   if (convRef.exists()) {
  //     console.log('Existe', convRef.data())
  //     return { id: convRef.id, ...convRef.data() } as Conversation
  //   } else {
  //     console.log('notExiste')

  //     return null
  //   }
  // }
}

export default new Conversations()
