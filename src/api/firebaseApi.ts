import { db } from '@/plugins/firebase'
import {
  QueryConstraint,
  query,
  getDocs,
  collection,
  CollectionReference,
  DocumentData,
  addDoc,
  WithFieldValue,
  DocumentReference,
  setDoc,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
  where,
  Query,
  getDoc,
  doc
} from '@firebase/firestore'

export class FirebaseApiService<T> {
  ref: any
  docsRef: string
  constructor(docsRef: string) {
    this.docsRef = docsRef
    this.ref = collection(db, docsRef)
  }

  async index(...queryConstraints: QueryConstraint[]): Promise<T[]> {
    const q = query<T>(this.getRef(), ...queryConstraints)
    const querySnapshot = await getDocs<T>(q)
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      } as T
    })
  }

  getRef(): any {
    return this.ref
  }

  store(item: T): Promise<T> {
    return addDoc(this.getRef(), item as WithFieldValue<T>).then((conv) => {
      return {
        id: conv.id,
        ...item
      }
    })
  }
  getFilterQuery(...filters: QueryConstraint[]): Query<T> {
    return query<T>(this.getRef(), ...filters)
  }
  onChanges(
    filters: QueryConstraint[],
    callback: (messages: T[]) => void
  ): Unsubscribe {
    const q = this.getFilterQuery(...filters)
    return onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<T>) => {
        console.log(querySnapshot)
        callback(
          querySnapshot.docs.map<T>((doc) => {
            return { id: doc.id, ...doc.data() }
          })
        )
      },
      (error) => {
        console.error(error)
      }
    )
  }

  async find(id: string): Promise<T | null> {
    console.log(this.docsRef)
    const docItemRef = doc(db, this.docsRef, id)
    const item = await getDoc(docItemRef)
    if (item.exists()) {
      console.log(item.data)
      return { id: item.id, ...item.data() } as unknown as T
    } else {
      return null
    }
  }
}
