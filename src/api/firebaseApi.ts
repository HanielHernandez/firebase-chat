import { db } from '@/plugins/firebase'
import {
  QueryConstraint,
  query,
  getDocs,
  collection,
  addDoc,
  type WithFieldValue,
  onSnapshot,
  QuerySnapshot,
  type Unsubscribe,
  Query,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
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
    const q = filters ? query(ref, ...filters) : query(ref)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data() as T
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
    return query(this.getRef(), ...filters)
  }
  onChanges(
    filters: QueryConstraint[] | null = null,
    callback: (sanpshots: QuerySnapshot<T>) => void
  ): Unsubscribe {
    const q = filters ? this.getFilterQuery(filters) : query(this.getRef())
    return onSnapshot(
      q,
      (querySnapshot) => {
        callback(querySnapshot as QuerySnapshot<T>);
      },
      (error: Error) => {
        console.error(error);
      }
    );
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

  async update(id: string, data: T): Promise<T> {
    const docItemRef = doc(db, this.docsRef, id)
    await updateDoc(docItemRef, data as { [x: string]: any });
    return data
  }

  async delete(id:string): Promise<void> {
    const docItemRef = doc(db, this.docsRef, id)
    return deleteDoc(docItemRef)
  }
}
