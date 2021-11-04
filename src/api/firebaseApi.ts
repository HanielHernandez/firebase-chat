import { db } from '@/plugins/firebase'
import {
  QueryConstraint,
  query,
  getDocs,
  collection,
  addDoc,
  WithFieldValue,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
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

  async index(filters?: QueryConstraint[]): Promise<T[]> {
    const ref = this.getRef()
    // // console.log(ref.path)
    const q = filters ? query<T>(ref, ...filters) : query<T>(ref)
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
  getFilterQuery(filters: QueryConstraint[]): Query<T> {
    return query<T>(this.getRef(), ...filters)
  }
  onChanges(
    filters: QueryConstraint[] | null = null,
    callback: (sanpshots: QuerySnapshot<T>) => void
  ): Unsubscribe {
    const q = filters ? this.getFilterQuery(filters) : query<T>(this.getRef())
    return onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<T>) => {
        callback(querySnapshot)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  async find(id: string): Promise<T | null> {
    const docItemRef = doc(db, this.docsRef, id)
    const item = await getDoc(docItemRef)
    if (item.exists()) {
      return { id: item.id, ...item.data() } as unknown as T
    } else {
      return null
    }
  }
}
